"""
Root WSGI forwarder for Render deployments running from root repository directory.
"""
import os
import sys
from pathlib import Path

# Add backend directory to sys.path
BASE_DIR = Path(__file__).resolve().parent
backend_dir = str(BASE_DIR / 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

if os.environ.get('RENDER'):
    try:
        from keep_alive import start_ping
        start_ping()
    except Exception as e:
        print(f"Keep-alive ping failed to start: {e}")
