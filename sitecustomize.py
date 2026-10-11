import os
import sys
from pathlib import Path

# Load .env early so all environment variables are present before any imports
try:
    from dotenv import load_dotenv
    load_dotenv()
    backend_env = Path(__file__).resolve().parent / "backend" / ".env"
    if backend_env.exists():
        load_dotenv(backend_env)
except Exception as e:
    pass

# Automatically add backend directory to sys.path so 'config' and 'apps' can be imported anywhere
backend_dir = str(Path(__file__).resolve().parent / "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
