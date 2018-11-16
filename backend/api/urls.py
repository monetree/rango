from django.urls import path
from .views import post_profile, get_profile, delete_profile, search

urlpatterns = [
    path('post_profile/', post_profile),
    path('get_profile/', get_profile),
    path('delete_profile/', delete_profile),
    path('search/', search),
]
