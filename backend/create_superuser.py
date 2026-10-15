import os
import django
import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.conf import settings
from django.contrib.auth.hashers import make_password

username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "zsyio_admin")
email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "contact@zsyio.com")
password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "Zsyio@Admin#2026")

client = getattr(settings, "MONGO_CLIENT", None)
if client:
    db = client["zsyio_db"]
    users_coll = db["users"]
    now = datetime.datetime.now(datetime.timezone.utc)
    hashed_pw = make_password(password)

    result = users_coll.update_one(
        {"email": email},
        {
            "$set": {
                "username": username,
                "email": email,
                "password": hashed_pw,
                "first_name": "Zsyio",
                "last_name": "Admin",
                "is_staff": True,
                "is_superuser": True,
                "is_active": True,
                "updated_at": now,
            },
            "$setOnInsert": {"created_at": now},
        },
        upsert=True,
    )
    action = "Created" if result.upserted_id else "Updated"
    print(f"Superuser '{username}' ({email}) {action} in MongoDB successfully.")
else:
    print("MongoDB not connected.")
