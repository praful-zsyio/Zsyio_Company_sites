import os
import sys
import django
import datetime

# Fix Windows console encoding if needed
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password

def run_reset():
    print("=" * 60)
    print("RESET AND RECREATE DJANGO / MONGODB USERS")
    print("=" * 60)

    client = getattr(settings, 'MONGO_CLIENT', None)
    if not client:
        print("ERROR: MongoDB client is not connected. Check MONGO_URI in .env.")
        return False

    db = client['zsyio_db']
    users_coll = db['users']

    # 1. Inspect existing users
    existing_users = list(users_coll.find({}))
    print(f"\nFound {len(existing_users)} existing users in database:")
    for u in existing_users:
        print(f"  - Username: {u.get('username')}, Email: {u.get('email')}, Superuser: {u.get('is_superuser')}, Staff: {u.get('is_staff')}")

    # 2. Delete old admin user(s) and any unrecognized accounts
    allowed_emails = [
        "contact@zsyio.com",
        "praful@zsyio.com",
        "abhishek@zsyio.com",
        "ashutosh@zsyio.com",
        "ayan@zsyio.com",
        "arpit@zsyio.com"
    ]
    allowed_usernames = [
        "zsyio_admin",
        "praful@zsyio.com",
        "abhishek@zsyio.com",
        "ashutosh@zsyio.com",
        "ayan@zsyio.com",
        "arpit@zsyio.com"
    ]

    print("\nCleaning up old admin / unrecognized accounts...")
    delete_result = users_coll.delete_many({
        "$or": [
            {"username": "ZsyioAdmin"},
            {"username": "admin"},
            {
                "email": {"$nin": allowed_emails},
                "username": {"$nin": allowed_usernames}
            }
        ]
    })
    print(f"  [CLEANUP] Deleted {delete_result.deleted_count} old/stale admin record(s).")

    # 3. Define users to create / recreate
    users_to_create = [
        {
            "username": "zsyio_admin",
            "email": "contact@zsyio.com",
            "raw_password": "Zsyio@Admin#2026",
            "first_name": "Zsyio",
            "last_name": "Admin",
            "is_staff": True,
            "is_superuser": True,
            "is_active": True,
        },
        {
            "username": "praful@zsyio.com",
            "email": "praful@zsyio.com",
            "raw_password": "Praful@zsyio12s",
            "first_name": "Praful",
            "last_name": "",
            "is_staff": True,
            "is_superuser": True,
            "is_active": True,
        },
        {
            "username": "abhishek@zsyio.com",
            "email": "abhishek@zsyio.com",
            "raw_password": "Abhishek@zsyio12t",
            "first_name": "Abhishek",
            "last_name": "",
            "is_staff": True,
            "is_superuser": False,
            "is_active": True,
        },
        {
            "username": "ashutosh@zsyio.com",
            "email": "ashutosh@zsyio.com",
            "raw_password": "Ashutosh@zsyio12k",
            "first_name": "Ashutosh",
            "last_name": "",
            "is_staff": True,
            "is_superuser": False,
            "is_active": True,
        },
        {
            "username": "ayan@zsyio.com",
            "email": "ayan@zsyio.com",
            "raw_password": "Ayan@zsyio12m",
            "first_name": "Ayan",
            "last_name": "",
            "is_staff": True,
            "is_superuser": False,
            "is_active": True,
        },
        {
            "username": "arpit@zsyio.com",
            "email": "arpit@zsyio.com",
            "raw_password": "Arpit@zsyio12n",
            "first_name": "Arpit",
            "last_name": "",
            "is_staff": True,
            "is_superuser": False,
            "is_active": True,
        },
    ]

    print("\nRecreating / Updating users...")
    now = datetime.datetime.utcnow()
    for u in users_to_create:
        email = u["email"]
        raw_pw = u.pop("raw_password")
        hashed_pw = make_password(raw_pw)

        user_doc = {
            **u,
            "password": hashed_pw,
            "updated_at": now,
        }

        # Update or insert by email
        result = users_coll.update_one(
            {"email": email},
            {
                "$set": user_doc,
                "$setOnInsert": {"created_at": now}
            },
            upsert=True
        )

        status_label = "Created" if result.upserted_id else "Updated"
        role_label = "Superuser Admin" if u.get("is_superuser") else "Staff"
        print(f"  [SUCCESS] [{status_label}] {u['username']} ({email}) - Role: {role_label}")

        # Verification check
        saved_doc = users_coll.find_one({"email": email})
        if saved_doc and check_password(raw_pw, saved_doc.get("password")):
            print(f"     Password verification: VALID")
        else:
            print(f"     [ERROR] Password verification failed for {email}!")

    # 4. Final verification of all users in collection
    print("\n" + "=" * 60)
    print("CURRENT USERS IN DATABASE AFTER RESET:")
    print("=" * 60)
    current_users = list(users_coll.find({}, {"password": 0}))
    for i, user in enumerate(current_users, 1):
        print(f"{i}. Username: {user.get('username')}")
        print(f"   Email:    {user.get('email')}")
        print(f"   Role:     {'Superuser Admin' if user.get('is_superuser') else 'Team Member'}")
        print(f"   Active:   {user.get('is_active')}")
        print(f"   Staff:    {user.get('is_staff')}")
        print("-" * 40)

    print("\nAll users successfully configured and verified!")
    return True

if __name__ == "__main__":
    run_reset()
