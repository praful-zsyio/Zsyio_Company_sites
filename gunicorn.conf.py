import os
import sys
from pathlib import Path

# Add backend directory to sys.path so 'config.wsgi' and 'apps' are immediately found
backend_dir = str(Path(__file__).resolve().parent / 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Change directory to backend so all relative paths and settings resolve properly
chdir = backend_dir
wsgi_app = "config.wsgi:application"
