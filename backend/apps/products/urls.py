from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductDeleteView

router = DefaultRouter()
router.register(r'', ProductViewSet, basename='product')

urlpatterns = [
    path('delete/<str:pk>/', ProductDeleteView.as_view(), name='product-delete'),
    path('delete/<str:pk>', ProductDeleteView.as_view(), name='product-delete-no-slash'),
    path('', include(router.urls)),
]
