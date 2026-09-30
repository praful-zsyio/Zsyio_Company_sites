import json
import datetime
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from django.conf import settings
from .models import Project
from .serializers import ProjectSerializer
from apps.utils.mongo import get_mongo_db, mongo_log
from apps.utils.views import ReloadMixin
from bson.objectid import ObjectId
from apps.utils.cloudinary import upload_image, delete_image, get_public_id_from_url

def get_projects_collection():
    db = get_mongo_db()
    return db['projects'] if db is not None else None

def serialize_mongo_doc(doc):
    """Recursively convert MongoDB ObjectId and datetime to JSON serializable formats."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_mongo_doc(item) for item in doc]
    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if k == '_id':
                new_doc['id'] = str(v)
            elif isinstance(v, (ObjectId, datetime.datetime)):
                if isinstance(v, datetime.datetime):
                    new_doc[k] = v.isoformat()
                else:
                    new_doc[k] = str(v)
            elif isinstance(v, (list, dict)):
                new_doc[k] = serialize_mongo_doc(v)
            else:
                new_doc[k] = v
        # Ensure images is always present as an array
        if 'images' not in new_doc or not isinstance(new_doc['images'], list):
            fallback_img = new_doc.get('image') or new_doc.get('cloudinary_image')
            new_doc['images'] = [fallback_img] if fallback_img else []
        return new_doc
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
                print(f"[projects] Image upload error: {e}")

    # Deduplicate while preserving order
    seen = set()
    result = []
    for img in images:
        if img and img not in seen:
            seen.add(img)
            result.append(img)
    return result

class ProjectViewSet(ReloadMixin, viewsets.ModelViewSet):
    queryset = Project.objects.none()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    
    def list(self, request, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response([])
        projects = [serialize_mongo_doc(p) for p in coll.find().sort('created_at', -1)]
        return Response(projects)

    def retrieve(self, request, pk=None, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response({"detail": "Not found."}, status=404)
        try:
            # Handle both ObjectId and potential string IDs
            query = {"_id": ObjectId(pk)} if ObjectId.is_valid(pk) else {"_id": pk}
            project = coll.find_one(query)
            if not project:
                return Response({"detail": "No project found with this ID."}, status=404)
            return Response(serialize_mongo_doc(project))
        except Exception as e:
            return Response({"detail": f"Error retrieving project: {str(e)}"}, status=400)

    def create(self, request, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response({"error": "Database connection error"}, status=500)
        
        data = request.data.copy()
        data['created_at'] = datetime.datetime.utcnow()
        
        # Handle multiple images
        images = extract_images_from_request(data, request.FILES)

        # Single image upload
        if 'image' in request.FILES:
            try:
                image_url = upload_image(request.FILES['image'])
                data['image'] = image_url
                if image_url not in images:
                    images.insert(0, image_url)
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=500)
        
        # Synchronize primary image and images array
        if not data.get('image') and images:
            data['image'] = images[0]
        elif data.get('image') and isinstance(data['image'], str) and not images:
            images = [data['image']]

        data['images'] = images

        res = coll.insert_one(data)
        data['id'] = str(res.inserted_id)
        data.pop('_id', None)
        
        mongo_log('project_logs', {
            'action': 'create',
            'project_id': data['id'],
            'title': data.get('title'),
        })
        return Response(serialize_mongo_doc(data), status=201)

    def update(self, request, pk=None, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response({"error": "Database error"}, status=500)
        
        query = {"_id": ObjectId(pk)} if ObjectId.is_valid(pk) else {"_id": pk}
        project = coll.find_one(query)
        
        if not project:
            return Response({"detail": "Project not found."}, status=404)
            
        data = request.data.copy()
        data.pop('id', None)
        data.pop('_id', None)
        
        new_images = extract_images_from_request(data, request.FILES)

        if 'image' in request.FILES:
            try:
                # Delete old image if it exists
                if 'image' in project and project['image']:
                    public_id = get_public_id_from_url(project['image'])
                    if public_id:
                        delete_image(public_id)
                
                # Upload new image
                image_url = upload_image(request.FILES['image'])
                data['image'] = image_url
                if image_url not in new_images:
                    new_images.insert(0, image_url)
            except Exception as e:
                return Response({"error": f"Image handling failed: {str(e)}"}, status=500)
        
        if 'images' in request.data or 'image_urls' in request.data or (request.FILES and ('images' in request.FILES or 'images[]' in request.FILES)):
            data['images'] = new_images
            if new_images and not data.get('image'):
                data['image'] = new_images[0]
        elif 'image' in data and isinstance(data['image'], str):
            if not data.get('images'):
                data['images'] = [data['image']]

        coll.update_one(query, {"$set": data})
        updated_project = coll.find_one(query)
            
        mongo_log('project_logs', {
            'action': 'update',
            'project_id': pk,
            'title': updated_project.get('title'),
        })
        return Response(serialize_mongo_doc(updated_project))

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, pk=None, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response(status=500)
        
        query = {"_id": ObjectId(pk)} if ObjectId.is_valid(pk) else {"_id": pk}
        project = coll.find_one(query)
        
        if not project:
            return Response({"detail": "Project not found."}, status=404)
            
        # Delete image from Cloudinary if it exists
        if 'image' in project and project['image']:
            try:
                public_id = get_public_id_from_url(project['image'])
                if public_id:
                    delete_image(public_id)
            except Exception as e:
                # Log the error but proceed with deletion from DB
                print(f"Could not delete image for project {pk}: {e}")

        coll.delete_one(query)
        mongo_log('project_logs', {
            'action': 'delete',
            'project_id': pk,
            'title': project.get('title'),
        })
        return Response(status=204)

class ProjectCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        return ProjectViewSet().create(request)

class ProjectDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.AllowAny]
    def delete(self, request, pk=None):
        return ProjectViewSet().destroy(request, pk=pk)

