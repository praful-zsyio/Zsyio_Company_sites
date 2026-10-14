import os
import sys

# Root directory of the repository
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')

# Automatically change directory to backend so config/ is discovered natively
if os.path.exists(BACKEND_DIR):
    chdir = BACKEND_DIR
    pythonpath = BACKEND_DIR
    if BACKEND_DIR not in sys.path:
        sys.path.insert(0, BACKEND_DIR)
    os.chdir(BACKEND_DIR)
