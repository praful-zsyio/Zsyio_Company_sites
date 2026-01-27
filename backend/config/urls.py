"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from apps.authentication.views import CustomTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/projects/', include('apps.projects.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/about/', include('apps.about.urls')),
    path('api/estimation/', include('apps.estimation.urls')),
    path('api/chatbot/', include('apps.chatbot.urls')),
    path('api/config/', include('apps.config_api.urls')),
    path('api/contact/', include('apps.contact.urls')),
]
