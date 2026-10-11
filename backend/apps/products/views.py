import datetime
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from bson.objectid import ObjectId

from apps.utils.mongo import get_mongo_db, mongo_log
from apps.utils.cloudinary import upload_image, delete_image, get_public_id_from_url


def get_products_collection():
    db = get_mongo_db()
    return db['products'] if db is not None else None


def serialize_doc(doc):
    """Convert MongoDB ObjectId / datetime fields to JSON-safe types and normalize schema."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        out = {}
        for k, v in doc.items():
            if k == '_id':
                out['id'] = str(v)
            elif isinstance(v, ObjectId):
                out[k] = str(v)
            elif isinstance(v, datetime.datetime):
                out[k] = v.isoformat()
            elif isinstance(v, (list, dict)):
                out[k] = serialize_doc(v)
            else:
                out[k] = v

        # Normalize title/name aliases
        title = out.get('title') or out.get('name') or 'Untitled'
        out['title'] = title
        out['name'] = title

        # Normalize status (default 'Live' if live_url is configured)
        if not out.get('status'):
            out['status'] = 'Live' if out.get('live_url') else 'Live'

        # Normalize live_url aliases
        if 'live_url' in out and 'liveUrl' not in out:
            out['liveUrl'] = out['live_url']
        elif 'liveUrl' in out and 'live_url' not in out:
            out['live_url'] = out['liveUrl']

        # Normalize features / highlights
        features = out.get('features') or out.get('highlights') or []
        out['features'] = features
        out['highlights'] = features

        return out
    return doc


class ProductViewSet(viewsets.ViewSet):
    """
    MongoDB-backed product endpoints.
    GET  /api/products/              → list all (supports ?category=, ?status=, ?search=)
    GET  /api/products/count/        → count live and total products
    GET  /api/products/<id>/         → retrieve one
    POST /api/products/              → create
    PUT/PATCH /api/products/<id>/    → update
    DELETE /api/products/<id>/       → delete
    GET  /api/products/nav-links/    → category + item nav data
    """
    permission_classes = [permissions.AllowAny]

    # ── List ──────────────────────────────────────────────────────────────────
    def list(self, request):
        coll = get_products_collection()
        if coll is None:
            return Response([])

        query = {}
        category = request.query_params.get('category')
        if category and category.strip().lower() != 'all':
            query['category'] = {'$regex': f"^{category.strip()}$", '$options': 'i'}

        status_param = request.query_params.get('status')
        if status_param:
            query['status'] = {'$regex': f"^{status_param.strip()}$", '$options': 'i'}

        search = request.query_params.get('search')
        if search:
            query['$or'] = [
                {'title': {'$regex': search.strip(), '$options': 'i'}},
                {'name': {'$regex': search.strip(), '$options': 'i'}},
                {'description': {'$regex': search.strip(), '$options': 'i'}},
            ]

        docs = [serialize_doc(d) for d in coll.find(query).sort('created_at', -1)]
        return Response(docs)

    # ── Count Endpoint ────────────────────────────────────────────────────────
    @action(detail=False, methods=['get'], url_path='count')
    def count(self, request):
        """Returns total products count and live products count for dashboard/hero."""
        coll = get_products_collection()
        if coll is None:
            return Response({'count': 0, 'total': 0, 'live_count': 0, 'categories_count': 0, 'categories': {}})

        docs = list(coll.find())
        total = len(docs)

        # Count live products (status 'Live' or having live_url)
        live_count = sum(
            1 for d in docs
            if (d.get('status', '').lower() == 'live' or bool(d.get('live_url')))
        )

        categories = {}
        for d in docs:
            cat = d.get('category', 'Uncategorized')
            categories[cat] = categories.get(cat, 0) + 1

        return Response({
            'count': total,
            'total': total,
            'live_count': live_count,
            'categories_count': len(categories),
            'categories': categories,
        })

    # ── Retrieve ──────────────────────────────────────────────────────────────
    def retrieve(self, request, pk=None):
        coll = get_products_collection()
        if coll is None:
            return Response({'detail': 'DB unavailable.'}, status=503)
        try:
            query = {'_id': ObjectId(pk)} if ObjectId.is_valid(pk) else {'_id': pk}
            doc = coll.find_one(query)
            if not doc:
                return Response({'detail': 'Product not found.'}, status=404)
            return Response(serialize_doc(doc))
        except Exception as e:
            return Response({'detail': str(e)}, status=400)

    # ── Create ────────────────────────────────────────────────────────────────
    def create(self, request):
        coll = get_products_collection()
        if coll is None:
            return Response({'error': 'DB unavailable.'}, status=503)

        data = request.data.copy()
        data['created_at'] = datetime.datetime.utcnow()

        # Optional Cloudinary image upload
        if 'image' in request.FILES:
            try:
                data['image'] = upload_image(request.FILES['image'])
            except Exception as e:
                return Response({'error': f'Image upload failed: {e}'}, status=500)

        result = coll.insert_one(data)
        data['id'] = str(result.inserted_id)
        data.pop('_id', None)

        mongo_log('product_logs', {'action': 'create', 'product_id': data['id'], 'title': data.get('title')})
        return Response(serialize_doc(data), status=201)

    # ── Update (full + partial) ───────────────────────────────────────────────
    def update(self, request, pk=None):
        coll = get_products_collection()
        if coll is None:
            return Response({'error': 'DB unavailable.'}, status=503)

        query = {'_id': ObjectId(pk)} if ObjectId.is_valid(pk) else {'_id': pk}
        existing = coll.find_one(query)
        if not existing:
            return Response({'detail': 'Product not found.'}, status=404)

        data = {k: v for k, v in request.data.items() if k not in ('id', '_id')}

        if 'image' in request.FILES:
            try:
                if existing.get('image'):
                    pub_id = get_public_id_from_url(existing['image'])
                    if pub_id:
                        delete_image(pub_id)
                data['image'] = upload_image(request.FILES['image'])
            except Exception as e:
                return Response({'error': f'Image handling failed: {e}'}, status=500)

        coll.update_one(query, {'$set': data})
        updated = coll.find_one(query)
        mongo_log('product_logs', {'action': 'update', 'product_id': pk, 'title': updated.get('title')})
        return Response(serialize_doc(updated))

    def partial_update(self, request, pk=None):
        return self.update(request, pk=pk)

    # ── Delete ────────────────────────────────────────────────────────────────
    def destroy(self, request, pk=None):
        coll = get_products_collection()
        if coll is None:
            return Response(status=503)

        query = {'_id': ObjectId(pk)} if ObjectId.is_valid(pk) else {'_id': pk}
        existing = coll.find_one(query)
        if not existing:
            return Response({'detail': 'Product not found.'}, status=404)

        if existing.get('image'):
            try:
                pub_id = get_public_id_from_url(existing['image'])
                if pub_id:
                    delete_image(pub_id)
            except Exception as e:
                print(f'[products] Image delete error for {pk}: {e}')

        coll.delete_one(query)
        mongo_log('product_logs', {'action': 'delete', 'product_id': pk, 'title': existing.get('title')})
        return Response(status=204)

    # ── Nav-links helper ──────────────────────────────────────────────────────
    @action(detail=False, methods=['get'], url_path='nav-links')
    def nav_links(self, request):
        coll = get_products_collection()
        if coll is None:
            return Response({'title': 'Products', 'path': '/products', 'total_count': 0, 'categories': [], 'items': []})

        docs = [serialize_doc(d) for d in coll.find().sort('created_at', -1)]
        categories = list({d['category'] for d in docs if d.get('category')})

        return Response({
            'title': 'Products',
            'path': '/products',
            'total_count': len(docs),
            'categories': [
                {
                    'title': cat,
                    'category': cat,
                    'path': f'/products?category={cat}',
                    'count': sum(1 for d in docs if d.get('category') == cat),
                }
                for cat in categories
            ],
            'items': [
                {
                    'id': d.get('id', ''),
                    'title': d.get('title', ''),
                    'category': d.get('category', ''),
                    'path': f"/products/{d.get('id', '')}",
                    'price': str(d.get('price', '0.00')),
                    'image': d.get('cloudinary_image') or d.get('image') or '',
                }
                for d in docs
            ],
        })

    @action(detail=False, methods=['get'], url_path='navlink')
    def navlink_alias(self, request):
        return self.nav_links(request)
