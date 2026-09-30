import json
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
    """Convert MongoDB ObjectId / datetime fields to JSON-safe types."""
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
        # Ensure images is always present as an array
        if 'images' not in out or not isinstance(out['images'], list):
            primary = out.get('cloudinary_image') or out.get('image')
            out['images'] = [primary] if primary else []
        return out
    return doc


def extract_images_from_request(data, files=None):
    """
    Extract images list from request data (list of URLs, JSON string, comma-separated)
    and any files uploaded in request.FILES under 'images' or 'images[]'.
    """
    images = []
    raw = data.get('images') if 'images' in data else data.get('image_urls')
    if isinstance(raw, list):
        for item in raw:
            if isinstance(item, str) and item.strip():
                images.append(item.strip())
    elif isinstance(raw, str):
        val = raw.strip()
        if val.startswith('[') and val.endswith(']'):
            try:
                parsed = json.loads(val)
                if isinstance(parsed, list):
                    images.extend([str(x).strip() for x in parsed if str(x).strip()])
            except Exception:
                pass
        if not images and val:
            parts = [p.strip() for p in val.replace('\r\n', '\n').split('\n') if p.strip()]
            if len(parts) == 1 and ',' in parts[0]:
                parts = [p.strip() for p in parts[0].split(',') if p.strip()]
            images.extend(parts)

    if files:
        uploaded_files = files.getlist('images') or files.getlist('images[]')
        for f in uploaded_files:
            try:
                url = upload_image(f)
                if url:
                    images.append(url)
            except Exception as e:
                print(f"[products] Image upload error: {e}")

    # Deduplicate while preserving order
    seen = set()
    result = []
    for img in images:
        if img and img not in seen:
            seen.add(img)
            result.append(img)
    return result


class ProductViewSet(viewsets.ViewSet):
    """
    MongoDB-backed product endpoints.
    GET  /api/products/              → list all
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
        docs = [serialize_doc(d) for d in coll.find().sort('created_at', -1)]
        return Response(docs)

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

        # Handle multiple image URLs and uploaded files
        images = extract_images_from_request(data, request.FILES)

        # Optional single image file upload
        if 'image' in request.FILES:
            try:
                single_url = upload_image(request.FILES['image'])
                data['image'] = single_url
                data['cloudinary_image'] = single_url
                if single_url not in images:
                    images.insert(0, single_url)
            except Exception as e:
                return Response({'error': f'Image upload failed: {e}'}, status=500)

        # Synchronize primary image and images array
        if not data.get('image') and images:
            data['image'] = images[0]
            data['cloudinary_image'] = images[0]
        elif (data.get('image') or data.get('cloudinary_image')) and not images:
            primary = data.get('cloudinary_image') or data.get('image')
            images = [primary]

        data['images'] = images

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

        # Handle multiple images
        new_images = extract_images_from_request(data, request.FILES)

        if 'image' in request.FILES:
            try:
                if existing.get('image'):
                    pub_id = get_public_id_from_url(existing['image'])
                    if pub_id:
                        delete_image(pub_id)
                single_url = upload_image(request.FILES['image'])
                data['image'] = single_url
                data['cloudinary_image'] = single_url
                if single_url not in new_images:
                    new_images.insert(0, single_url)
            except Exception as e:
                return Response({'error': f'Image handling failed: {e}'}, status=500)

        if 'images' in request.data or 'image_urls' in request.data or (request.FILES and ('images' in request.FILES or 'images[]' in request.FILES)):
            data['images'] = new_images
            if new_images and not data.get('image'):
                data['image'] = new_images[0]
                data['cloudinary_image'] = new_images[0]
        elif 'image' in data or 'cloudinary_image' in data:
            primary = data.get('cloudinary_image') or data.get('image')
            if primary and not data.get('images'):
                data['images'] = [primary]

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
                    'image': (d.get('images') and d.get('images')[0]) or d.get('cloudinary_image') or d.get('image') or '',
                    'images': d.get('images', []),
                }
                for d in docs
            ],
        })

    @action(detail=False, methods=['get'], url_path='navlink')
    def navlink_alias(self, request):
        return self.nav_links(request)

