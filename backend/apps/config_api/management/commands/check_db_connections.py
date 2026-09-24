from django.core.management.base import BaseCommand
from config.mongodb import test_sqlite_connection, test_mongodb_connection


class Command(BaseCommand):
    help = 'Check and verify connectivity for both SQLite and MongoDB databases.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Testing SQLite database connection..."))
        sqlite_ok, sqlite_msg, sqlite_details = test_sqlite_connection()
        if sqlite_ok:
            self.stdout.write(self.style.SUCCESS(f" [OK] {sqlite_msg}"))
            self.stdout.write(f"      File: {sqlite_details.get('database_file')}")
        else:
            self.stdout.write(self.style.ERROR(f" [FAIL] {sqlite_msg}"))

        self.stdout.write(self.style.NOTICE("\nTesting MongoDB Atlas connection..."))
        mongo_ok, mongo_msg, mongo_details = test_mongodb_connection()
        if mongo_ok:
            self.stdout.write(self.style.SUCCESS(f" [OK] {mongo_msg}"))
            self.stdout.write(f"      Database: {mongo_details.get('database')}")
            self.stdout.write(f"      Collections Count: {mongo_details.get('collections_count')}")
            self.stdout.write(f"      Collections: {', '.join(mongo_details.get('collections', []))}")
        else:
            self.stdout.write(self.style.ERROR(f" [FAIL] {mongo_msg}"))

        if sqlite_ok and mongo_ok:
            self.stdout.write(self.style.SUCCESS("\n[SUCCESS] Both SQLite and MongoDB are connected and healthy!"))
        else:
            self.stdout.write(self.style.WARNING("\n[WARNING] One or more database connections encountered issues."))
