from django.urls import path

from .views import (
    ApplicationDetailView,
    ApplicationListView,
    ApplyView,
    JobDetailView,
    JobListCreateView,
)

urlpatterns = [
    path('jobs/', JobListCreateView.as_view(), name='careers-jobs'),
    path('jobs/<str:key>/', JobDetailView.as_view(), name='careers-job-detail'),
    path('apply/', ApplyView.as_view(), name='careers-apply'),
    path('applications/', ApplicationListView.as_view(), name='careers-applications'),
    path('applications/<str:pk>/', ApplicationDetailView.as_view(), name='careers-application-detail'),
]
