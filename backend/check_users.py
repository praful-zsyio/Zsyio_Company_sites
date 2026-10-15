import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings

print("Checking users in MongoDB database...")
client = getattr(settings, 'MONGO_CLIENT', None)
if client:
    db = client['zsyio_db']
    users = list(db['users'].find({}, {'password': 0}))
    print(f"Total users found: {len(users)}\n")
    for i, u in enumerate(users, 1):
        print(f"{i}. Username:   {u.get('username')}")
        print(f"   Email:      {u.get('email')}")
        print(f"   Role:       {'Superuser Admin' if u.get('is_superuser') else 'Team Member'}")
        print(f"   Active:     {u.get('is_active')}")
        print(f"   Staff:      {u.get('is_staff')}")
        print("-" * 45)
else:
    print("Error: MongoDB client not available.")
