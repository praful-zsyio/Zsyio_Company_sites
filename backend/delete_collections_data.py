import os
import sys
from dotenv import load_dotenv
import pymongo
from pymongo import MongoClient

# Load environment variables from .env
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

def get_mongo_client():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        if len(sys.argv) > 1 and not sys.argv[1].startswith('-'):
            mongo_uri = sys.argv[1]
        else:
            print("[X] MONGO_URI not found in .env file.")
            sys.exit(1)

    try:
        print("Connecting to MongoDB...")
        client = MongoClient(
            mongo_uri,
            serverSelectionTimeoutMS=10000,
            tlsAllowInvalidCertificates=True
        )
        client.admin.command('ping')
        print("[OK] MongoDB Connected Successfully!")
        return client
    except Exception as e:
        print(f"[X] MongoDB Connection Failed: {e}")
        sys.exit(1)

def reset_collections():
    client = get_mongo_client()
    db_name = os.getenv("MONGO_DB_NAME", "zsyio_db")
    db = client[db_name]

    # Target collections to remove
    target_collections = ['services', 'technologies', 'projects', 'products']

    print(f"\n--- Checking database: '{db_name}' ---")
    counts = {}
    for col in target_collections:
        count = db[col].count_documents({})
        counts[col] = count
        print(f"  * {col}: {count} documents")

    force = '--yes' in sys.argv or '-y' in sys.argv or '--force' in sys.argv
    if not force:
        confirm = input("\nAre you sure you want to delete all data from services, technologies, projects, and products? Type 'yes': ").strip().lower()
        if confirm != 'yes':
            print("Aborted. No data deleted.")
            return

    print("\nDeleting collections data...")
    for col in target_collections:
        res = db[col].delete_many({})
        print(f"  [OK] Deleted {res.deleted_count} documents from '{col}'")

    print("\n[OK] Database reset complete! All data from services, technologies, projects, and products has been removed.")

if __name__ == '__main__':
    reset_collections()
