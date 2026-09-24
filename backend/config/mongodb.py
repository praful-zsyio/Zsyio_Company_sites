import os
import logging
from urllib.parse import urlparse
from django.conf import settings
from django.db import connection
import pymongo
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

logger = logging.getLogger(__name__)

_mongo_client = None
_mongo_db = None


def get_mongo_uri():
    """Retrieve MongoDB connection URI from environment or Django settings."""
    if settings.configured:
        val = getattr(settings, 'MONGO_URI', None)
        if val:
            return val
    return os.getenv('MONGO_URI')


def get_mongo_db_name():
    """Retrieve default MongoDB database name."""
    if settings.configured:
        db_name = getattr(settings, 'MONGO_DB_NAME', None)
        if db_name:
            return db_name
    db_name = os.getenv('MONGO_DB_NAME')
    if not db_name:
        uri = get_mongo_uri()
        if uri:
            try:
                parsed = urlparse(uri)
                path = parsed.path.strip('/')
                if path:
                    db_name = path.split('?')[0]
            except Exception:
                pass
    return db_name or 'zsyio_db'


def get_mongo_client(timeout_ms=5000):
    """
    Get or create a singleton MongoDB client connection.
    """
    global _mongo_client
    if _mongo_client is None:
        uri = get_mongo_uri()
        if not uri:
            logger.warning("MONGO_URI is not set. MongoDB client cannot be initialized.")
            return None
        try:
            _mongo_client = pymongo.MongoClient(
                uri,
                serverSelectionTimeoutMS=timeout_ms,
                connectTimeoutMS=timeout_ms,
            )
        except Exception as e:
            logger.error(f"Failed to initialize MongoClient: {e}")
            return None
    return _mongo_client


def get_mongo_db(db_name=None):
    """
    Get MongoDB database instance.
    """
    global _mongo_db
    target_db = db_name or get_mongo_db_name()
    client = get_mongo_client()
    if client is None:
        return None
    return client[target_db]


def test_mongodb_connection():
    """
    Test connectivity to MongoDB.
    Returns (status: bool, message: str, details: dict).
    """
    uri = get_mongo_uri()
    if not uri:
        return False, "MONGO_URI is not configured in .env or settings.", {}

    try:
        client = get_mongo_client(timeout_ms=5000)
        if client is None:
            return False, "Could not initialize MongoDB client.", {}

        # Ping the server
        client.admin.command('ping')
        db_name = get_mongo_db_name()
        db = client[db_name]
        collections = db.list_collection_names()

        return True, "MongoDB connected successfully", {
            "database": db_name,
            "collections_count": len(collections),
            "collections": collections,
        }
    except (ConnectionFailure, ServerSelectionTimeoutError) as e:
        return False, f"MongoDB connection timeout/failure: {str(e)}", {}
    except Exception as e:
        return False, f"MongoDB error: {str(e)}", {}


def test_sqlite_connection():
    """
    Test connectivity to SQLite default database.
    Returns (status: bool, message: str, details: dict).
    """
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            result = cursor.fetchone()

        db_path = settings.DATABASES.get('default', {}).get('NAME', 'unknown')
        return True, "SQLite connected successfully", {
            "engine": settings.DATABASES.get('default', {}).get('ENGINE'),
            "database_file": str(db_path),
        }
    except Exception as e:
        return False, f"SQLite connection error: {str(e)}", {}


def get_all_databases_status():
    """
    Check and report connection status for both SQLite and MongoDB.
    """
    sqlite_ok, sqlite_msg, sqlite_details = test_sqlite_connection()
    mongo_ok, mongo_msg, mongo_details = test_mongodb_connection()

    return {
        "status": "ok" if (sqlite_ok and mongo_ok) else "degraded",
        "databases": {
            "sqlite": {
                "connected": sqlite_ok,
                "message": sqlite_msg,
                "details": sqlite_details,
            },
            "mongodb": {
                "connected": mongo_ok,
                "message": mongo_msg,
                "details": mongo_details,
            }
        }
    }
