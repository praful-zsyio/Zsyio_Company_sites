#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Run collectstatic using backend/manage.py if in root, or manage.py if in backend
if [ -f "backend/manage.py" ]; then
    python backend/manage.py collectstatic --no-input
else
    python manage.py collectstatic --no-input
fi
