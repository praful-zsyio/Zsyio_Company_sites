import os
import sys
import json
from dotenv import load_dotenv
import pymongo
from pymongo import MongoClient

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

def seed():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        print("[X] MONGO_URI not found in .env")
        return

    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=8000, tlsAllowInvalidCertificates=True)
    db = client[os.getenv("MONGO_DB_NAME", "zsyio_db")]

    base_dir = os.path.dirname(__file__)
    tech_file = os.path.join(base_dir, 'technologyies.txt')
    serv_file = os.path.join(base_dir, 'services.txt')

    if os.path.exists(tech_file):
        with open(tech_file, 'r', encoding='utf-8') as f:
            techs = json.load(f)
        db['technologies'].delete_many({})
        res = db['technologies'].insert_many(techs)
        print(f"[OK] Seeded {len(res.inserted_ids)} technologies into MongoDB.")

    if os.path.exists(serv_file):
        with open(serv_file, 'r', encoding='utf-8') as f:
            servs = json.load(f)
        db['services'].delete_many({})
        res = db['services'].insert_many(servs)
        print(f"[OK] Seeded {len(res.inserted_ids)} services into MongoDB.")

if __name__ == '__main__':
    seed()
