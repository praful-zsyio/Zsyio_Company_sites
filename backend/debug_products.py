import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.utils.mongo import get_mongo_db
db = get_mongo_db()

if db is None:
    print("ERROR: MongoDB not connected")
else:
    coll = db['products']
    count = coll.count_documents({})
    print(f"Products in MongoDB: {count}")
    for p in coll.find():
        pid = str(p['_id'])
        name = p.get('name', 'N/A')
        status = p.get('status', 'N/A')
        print(f"  - {name} [{status}] id={pid}")

# Test URL routing
from django.urls import resolve
try:
    match = resolve('/api/products/')
    print(f"\nURL /api/products/ -> {match.func}")
except Exception as e:
    print(f"\nURL resolve error: {e}")

# Try importing the view directly
try:
    from apps.products.views import ProductViewSet
    print(f"ProductViewSet imported OK: {ProductViewSet}")
except Exception as e:
    print(f"ProductViewSet import error: {e}")
