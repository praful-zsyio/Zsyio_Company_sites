#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Register backend directory into python's site-packages via a .pth file
# This guarantees that 'import config' works from any working directory on Render
PYTHON_SITE=$(python -c "import site; print(site.getsitepackages()[0])" 2>/dev/null || true)
if [ -n "$PYTHON_SITE" ] && [ -d "$PYTHON_SITE" ]; then
    if [ -d "backend" ]; then
        echo "$(pwd)/backend" > "$PYTHON_SITE/backend.pth"
        echo "Registered backend in $PYTHON_SITE/backend.pth"
    fi
fi

# Run collectstatic using backend/manage.py if in root, or manage.py if in backend
if [ -f "backend/manage.py" ]; then
    python backend/manage.py collectstatic --no-input
else
    python manage.py collectstatic --no-input
fi
