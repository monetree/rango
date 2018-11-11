from django.urls import path
from .views import register
from .views import login

urlpatterns = [
    path('register/', register),
    path('login/', login),
]
