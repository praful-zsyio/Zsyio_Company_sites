from django.urls import path
from .views import EstimateView

urlpatterns = [
    path('calculate/', EstimateView.as_view(), name='calculate_estimate'),
]
