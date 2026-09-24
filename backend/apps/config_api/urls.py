from django.urls import path
from .views import ConfigView, NavLinksView, DatabaseStatusView

urlpatterns = [
    path('', ConfigView.as_view(), name='site-config'),
    path('nav-links/', NavLinksView.as_view(), name='nav-links'),
    path('db-status/', DatabaseStatusView.as_view(), name='db-status'),
]

