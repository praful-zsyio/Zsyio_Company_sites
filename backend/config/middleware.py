class AppendSlashForAPIMiddleware:
    """
    Middleware that ensures API requests without a trailing slash (e.g. POST /api/projects)
    are routed directly to the endpoint with a trailing slash (e.g. /api/projects/)
    without an HTTP redirect, preserving POST/PUT/PATCH data and preventing Django's
    APPEND_SLASH RuntimeError.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path_info.startswith('/api') and not request.path_info.endswith('/'):
            last_segment = request.path_info.split('/')[-1]
            if '.' not in last_segment:
                request.path_info += '/'
                if hasattr(request, 'path'):
                    request.path = request.path_info
        return self.get_response(request)
