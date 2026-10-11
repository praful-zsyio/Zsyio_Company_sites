import sys
from pathlib import Path

# Add backend directory to sys.path so 'apps', 'keep_alive', etc. can be imported
_backend = str(Path(__file__).resolve().parent.parent / 'backend')
if _backend not in sys.path:
    sys.path.insert(0, _backend)

# Add backend/config to __path__ so submodules like config.wsgi and config.settings are found
_backend_config = str(Path(__file__).resolve().parent.parent / 'backend' / 'config')
if _backend_config not in __path__:
    __path__.append(_backend_config)
