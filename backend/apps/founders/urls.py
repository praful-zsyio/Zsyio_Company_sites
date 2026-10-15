from django.urls import path
from .views import FoundersListView, FounderDetailView, FounderImageUploadView

urlpatterns = [
    path('', FoundersListView.as_view(), name='founders-list'),
    path('upload-image/', FounderImageUploadView.as_view(), name='founder-upload-image'),
    path('upload-image', FounderImageUploadView.as_view(), name='founder-upload-image-no-slash'),
    path('<str:founder_id>/', FounderDetailView.as_view(), name='founder-detail'),
    path('<str:founder_id>', FounderDetailView.as_view(), name='founder-detail-no-slash'),
]
