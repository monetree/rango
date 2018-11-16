from django.urls import path
from .views import (login, register,
                    set, get,
                    make_token, decode_token,
                    get_user,logout,
                    verify_user,forgot_password,
                    reset_password,
                    )

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('set/', set),
    path('get/', get),
    path('make_token/', make_token),
    path('decode_token/', decode_token),
    path('get_user/', get_user),
    path('logout/', logout),
    path('verify_user/', verify_user),
    path('forgot_password/', forgot_password),
    path('reset_password/', reset_password),
]
