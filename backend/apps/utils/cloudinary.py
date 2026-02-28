import cloudinary.uploader
import cloudinary
from django.conf import settings

def get_public_id_from_url(url):
    """
    Extracts the public ID from a Cloudinary URL.
    """
    try:
        # Split the URL by '/' and find the part after 'upload/'
        parts = url.split('/')
        upload_index = parts.index('upload')
        # The public ID is the part of the URL after the version number
        public_id_with_extension = '/'.join(parts[upload_index+2:])
        public_id = public_id_with_extension.rsplit('.', 1)[0]
        return public_id
    except (ValueError, IndexError):
        return None

def upload_image(file):
    """
    Uploads an image file to Cloudinary.
    """
    if not all([settings.CLOUDINARY_STORAGE['CLOUD_NAME'], 
                settings.CLOUDINARY_STORAGE['API_KEY'], 
                settings.CLOUDINARY_STORAGE['API_SECRET']]):
        raise Exception("Cloudinary credentials are not configured.")

    try:
        # Upload the image to Cloudinary
        upload_result = cloudinary.uploader.upload(
            file,
            folder="projects",  # Optional: organize uploads in a folder
            resource_type="image"
        )
        return upload_result.get('secure_url')
    except Exception as e:
        # Handle potential upload errors
        raise Exception(f"Failed to upload image to Cloudinary: {str(e)}")

def delete_image(public_id):
    """
    Deletes an image from Cloudinary using its public ID.
    """
    if not all([settings.CLOUDINARY_STORAGE['CLOUD_NAME'], 
                settings.CLOUDINARY_STORAGE['API_KEY'], 
                settings.CLOUDINARY_STORAGE['API_SECRET']]):
        raise Exception("Cloudinary credentials are not configured.")

    try:
        # Delete the image from Cloudinary
        cloudinary.uploader.destroy(public_id, resource_type="image")
    except Exception as e:
        # Handle potential deletion errors
        raise Exception(f"Failed to delete image from Cloudinary: {str(e)}")
