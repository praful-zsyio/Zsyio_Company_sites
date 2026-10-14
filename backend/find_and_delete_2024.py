import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.utils.mongo import get_mongo_db

def run():
    db = get_mongo_db()
    if db is None:
        print("Could not connect to MongoDB.")
        return

    print("Checking all MongoDB collections in zsyio_db...")
    deleted_total = 0

    for coll_name in db.list_collection_names():
        coll = db[coll_name]

        # 1. Any document containing writeanblog
        query_wb = {
            '$or': [
                {'slug': 'writeanblog'},
                {'title': {'$regex': 'writeanblog', '$options': 'i'}},
                {'name': {'$regex': 'writeanblog', '$options': 'i'}},
                {'project.slug': 'writeanblog'},
                {'project.title': {'$regex': 'writeanblog', '$options': 'i'}}
            ]
        }
        wb_docs = list(coll.find(query_wb))
        if wb_docs:
            print(f"[{coll_name}] Found {len(wb_docs)} 'writeanblog' document(s):")
            for d in wb_docs:
                title = d.get('title') or d.get('name') or (d.get('project', {}).get('title') if isinstance(d.get('project'), dict) else None)
                print(f"  - Deleting ID: {d.get('_id')} | Title: {title}")
                res = coll.delete_one({'_id': d.get('_id')})
                deleted_total += res.deleted_count

        # 2. Check for writeanblog with 2024 specifically
        query_2024 = {
            '$and': [
                {
                    '$or': [
                        {'slug': 'writeanblog'},
                        {'title': {'$regex': 'writeanblog', '$options': 'i'}},
                        {'name': {'$regex': 'writeanblog', '$options': 'i'}},
                        {'project.slug': 'writeanblog'},
                    ]
                },
                {
                    '$or': [
                        {'year': '2024'},
                        {'year': 2024},
                        {'delivery_year': '2024'},
                        {'date': {'$regex': '2024'}},
                        {'timeline': {'$regex': '2024'}},
                        {'completion_date': {'$regex': '2024'}}
                    ]
                }
            ]
        }
        y24_docs = list(coll.find(query_2024))
        if y24_docs:
            print(f"[{coll_name}] Found {len(y24_docs)} 'writeanblog (2024)' document(s):")
            for d in y24_docs:
                print(f"  - Deleting ID: {d.get('_id')}")
                res = coll.delete_one({'_id': d.get('_id')})
                deleted_total += res.deleted_count

    print(f"\nDone! Total documents deleted: {deleted_total}")

    # Check products collection status
    print("\nRemaining in 'products':")
    for p in db['products'].find({}, {'name': 1, 'title': 1, 'slug': 1}):
        print(f" - {p.get('name', p.get('title'))} (slug: {p.get('slug')})")

    # Check projects collection status
    print("\nRemaining in 'projects':")
    for p in db['projects'].find({}, {'name': 1, 'title': 1, 'slug': 1}):
        print(f" - {p.get('name', p.get('title'))} (slug: {p.get('slug')})")

if __name__ == '__main__':
    run()
