from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from .models import Register
import json

def register(request):
    if request.method == "POST":
        data     = request.POST.get
        data     = request.body
        convert  = data.decode("utf-8")
        ds       = json.loads(convert)
        username = ds["username"]
        email    = ds["email"]
        password = ds["password"]

        if username is None or "" or (len(username) < 1):
            return JsonResponse({"code":422,"msg":"username can't be empty"})
        if email is None or "" or (len(email) < 1):
            return JsonResponse({"code":422,"msg":"email can't be empty"})
        if password is None or "" or (len(password) < 1):
            return JsonResponse({"code":422,"msg":"password can't be empty"})

        filter         = Register.objects.filter
        count_username = filter(username=username).count()
        count_email    = filter(email=email).count()


        if count_username > 0:
             return JsonResponse({"code":422,"msg":"duplicate username"})
        if count_email > 0:
             return JsonResponse({"code":422,"msg":"duplicate email"})

        hash = make_password(password, salt=None, hasher='default')
        obj = Register.objects.create(username=username,
                                        email=email,
                                        password=hash
                                    )
        if obj:
            return JsonResponse({"code":200,"msg":"success"})
        else:
            return JsonResponse({"code":500,"msg":"Internal server error"})
    else:
        return JsonResponse({"code":500,"msg":"bad request"})

def login(request):
    if request.method == "POST":
        data     = request.POST.get
        data     = request.body
        convert  = data.decode("utf-8")
        ds       = json.loads(convert)
        email    = ds["email"]
        password = ds["password"]
        if email is None or "" or (len(email) < 1):
            return JsonResponse({"code":422,"msg":"email can't be empty"})
        if password is None or "" or (len(password) < 1):
            return JsonResponse({"code":422,"msg":"password can't be empty"})
        if not Register.objects.filter(email=email).count() > 0:
            return JsonResponse({"code":401,"msg":"failed"})
        hash = list(Register.objects.filter(email=email).values('password'))[0]["password"]
        match = check_password(password, hash)
        if match > 0:
            return JsonResponse({"code":200,"msg":"success"})
        else:
            return JsonResponse({"code":401,"msg":"failed"})
    else:
        return JsonResponse({"code":500,"msg":"bad request"})
