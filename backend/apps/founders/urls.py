from django.urls import path
from .views import FoundersListView, FounderDetailView, FounderImageUploadView

app_name = 'founders'

urlpatterns = [
    path('', FoundersListView.as_view(), name='founders-list'),
    path('upload-image/', FounderImageUploadView.as_view(), name='founder-upload-image'),
    path('<str:founder_id>/', FounderDetailView.as_view(), name='founder-detail'),
]
