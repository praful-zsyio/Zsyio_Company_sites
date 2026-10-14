"""
Management command to reset admin username and password in MongoDB.

Usage:
  Interactive prompt:
    python manage.py reset_admin

  Direct arguments:
    python manage.py reset_admin --username new_admin --email admin@zsyio.com --password "NewPassword123!"
"""

import sys
import getpass
import datetime
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from django.conf import settings


class Command(BaseCommand):
    help = "Reset admin username, email, and password in MongoDB."

    def add_arguments(self, parser):
        parser.add_argument('--target', type=str, help='Existing username or email to update (optional).')
        parser.add_argument('--username', type=str, help='New username')
        parser.add_argument('--email', type=str, help='New email address')
        parser.add_argument('--password', type=str, help='New password')

    def handle(self, *args, **options):
        client = getattr(settings, 'MONGO_CLIENT', None)
        if not client:
            self.stderr.write(self.style.ERROR("MongoDB is not connected. Check MONGO_URI in .env."))
            return

        db = client['zsyio_db']
        users_col = db['users']

        # List existing users
        existing_users = list(users_col.find({'is_staff': True})) or list(users_col.find())

        self.stdout.write(self.style.NOTICE("\n--- Current Users in MongoDB ---"))
        if existing_users:
            for u in existing_users:
                self.stdout.write(f"  • Username: {u.get('username')} | Email: {u.get('email')} | Staff: {u.get('is_staff')}")
        else:
            self.stdout.write("  No existing users found in MongoDB.")

        # Determine target user
        target = options.get('target')
        new_username = options.get('username')
        new_email = options.get('email')
        new_password = options.get('password')

        # Interactive mode if arguments are missing
        if not new_username or not new_password:
            self.stdout.write(self.style.HTTP_INFO("\n--- Reset Admin Account ---"))
            
            default_target = existing_users[0].get('email') if existing_users else 'admin'
            target_input = input(f"Enter username or email to update (press Enter for '{default_target}'): ").strip()
            target = target_input or default_target

            username_input = input(f"Enter NEW username (press Enter to keep '{target}'): ").strip()
            new_username = username_input or target

            default_email = target if '@' in target else (existing_users[0].get('email', f"{new_username}@zsyio.com") if existing_users else f"{new_username}@zsyio.com")
            email_input = input(f"Enter NEW email (press Enter for '{default_email}'): ").strip()
            new_email = email_input or default_email

            while True:
                p1 = getpass.getpass("Enter NEW password: ").strip()
                if not p1:
                    self.stderr.write(self.style.ERROR("Password cannot be empty. Try again."))
                    continue
                p2 = getpass.getpass("Confirm NEW password: ").strip()
                if p1 != p2:
                    self.stderr.write(self.style.ERROR("Passwords do not match. Try again."))
                    continue
                new_password = p1
                break

        if not new_email:
            new_email = new_username if '@' in new_username else f"{new_username}@zsyio.com"

        # Search for existing user to update
        search_query = {}
        if target:
            search_query = {"$or": [{"email": target}, {"username": target}]}
        else:
            search_query = {"$or": [{"email": new_email}, {"username": new_username}]}

        existing_doc = users_col.find_one(search_query)

        now = datetime.datetime.now(datetime.timezone.utc)
        update_doc = {
            "username": new_username,
            "email": new_email,
            "password": make_password(new_password),
            "is_staff": True,
            "is_superuser": True,
            "is_active": True,
            "updated_at": now,
        }

        if existing_doc:
            users_col.update_one({"_id": existing_doc["_id"]}, {"$set": update_doc})
            self.stdout.write(self.style.SUCCESS(f"\n✅ Admin user updated successfully!"))
        else:
            update_doc["created_at"] = now
            users_col.insert_one(update_doc)
            self.stdout.write(self.style.SUCCESS(f"\n✅ New admin user created successfully!"))

        self.stdout.write(self.style.SUCCESS("---------------------------------------------"))
        self.stdout.write(self.style.SUCCESS(f"  Username : {new_username}"))
        self.stdout.write(self.style.SUCCESS(f"  Email    : {new_email}"))
        self.stdout.write(self.style.SUCCESS("  Password : [Updated]"))
        self.stdout.write(self.style.SUCCESS("---------------------------------------------\n"))
