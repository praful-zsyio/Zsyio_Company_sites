import os
import django
import json
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.utils.mongo import get_mongo_db

def run():
    json_path = os.path.join(os.path.dirname(__file__), 'zsyio_suite_product.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        product_data = json.load(f)

    product_data['created_at'] = datetime.datetime.utcnow()
    product_data['updated_at'] = datetime.datetime.utcnow()

    db = get_mongo_db()
    if db is None:
        print("MongoDB connection failed!")
        return

    res = db['products'].update_one(
        {'slug': 'zsyio-suite'},
        {'$set': product_data},
        upsert=True
    )
    print("Upsert result:", res.upserted_id or "Updated existing document")

    all_products = list(db['products'].find({}, {'name': 1, 'title': 1, 'slug': 1, 'status': 1}))
    print("\nCurrent Products in MongoDB:")
    for p in all_products:
        print(f" - {p.get('name', p.get('title'))} (slug: {p.get('slug')}) | Status: {p.get('status')}")

if __name__ == '__main__':
    run()
