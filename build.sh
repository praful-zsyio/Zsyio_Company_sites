#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Collect static files from backend
if [ -d "backend" ]; then
    python backend/manage.py collectstatic --no-input || true
else
    python manage.py collectstatic --no-input || true
fi
