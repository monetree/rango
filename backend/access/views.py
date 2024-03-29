from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from .models import Register
import json
import redis
import jwt
from access import utils
import os

# redis_url = os.environ['REDIS_URI']

# R = redis.StrictRedis(host='localhost', port=6379, db=0)
R = redis.StrictRedis(host='redis', port=6379, db=0)


def set(request):
    R.set('foo', 'bar')
    return JsonResponse({"code":200,"msg":"success"})

def get(request):
    val = R.get('foo')
    print(val)
    return JsonResponse({"code":200,"msg":"success"})

def make_token(request):
     encoded = jwt.encode({'some': 'payload'}, 'secret', algorithm='HS256')
     print(encoded)
     return JsonResponse({"code":200,"msg":"success"})

def decode_token(request):
    encoded = jwt.encode({'some': 'payload'}, 'secret', algorithm='HS256')
    data = jwt.decode(encoded, 'secret', algorithms=['HS256'])
    print(data)
    return JsonResponse(data)


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
            token = jwt.encode({'email': email}, 'secret', algorithm='HS256')
            R.rpush('token',token)
            mail = utils.send_mail([email],token.decode("utf-8"))
            return JsonResponse({"code":200,"msg":"success","token":token.decode("utf-8")})
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
            token = jwt.encode({'email': email}, 'secret', algorithm='HS256')
            R.rpush('token',token)
            return JsonResponse({"code":200,"msg":"success","token":token.decode("utf-8")})
        else:
            return JsonResponse({"code":401,"msg":"failed"})
    else:
        return JsonResponse({"code":500,"msg":"bad request"})

def logout(request):
    data     = request.body
    convert  = data.decode("utf-8")
    ds       = json.loads(convert)
    token = ds["token"]
    pop = R.lrem('token',-1,token)
    if pop:
        return JsonResponse({"code":200,"msg":"success"})
    else:
        return JsonResponse({"code":401,"msg":"failed"})

def get_user(request):
    data     = request.body
    convert  = data.decode("utf-8")
    ds       = json.loads(convert)
    token = ds["token"]
    auth_tokens = R.lrange("token", 0, -1)
    lst_of_tokens = [i.decode("utf-8") for i in auth_tokens]
    if token in lst_of_tokens:
        data = jwt.decode(token, 'secret', algorithms=['HS256'])
        email_count = Register.objects.filter(email=data["email"]).count()
        if email_count < 1:
            return JsonResponse({"code":500,"msg":"no user exist"})
        query = list(Register.objects.filter(email=data["email"]).values('username','verified'))[0]
        username = query["username"]
        verified = query["verified"]
        return JsonResponse({"code":200,"msg":"success","user":username,"verified":verified})
    else:
        return JsonResponse({"code":500,"msg":"server error"})


def verify_user(request):
    data     = request.body
    convert  = data.decode("utf-8")
    ds       = json.loads(convert)
    token    = ds["token"]
    auth_tokens = R.lrange("token", 0, -1)
    lst_of_tokens = [i.decode("utf-8") for i in auth_tokens]
    if token in lst_of_tokens:
        data = jwt.decode(token, 'secret', algorithms=['HS256'])
        update = Register.objects.filter(email=data["email"]).update(verified=True)
        if update:
            return JsonResponse({"code":200,"msg":"verfified"})
        else:
            return JsonResponse({"code":500,"msg":"server error"})
    else:
        return JsonResponse({"code":401,"msg":"invalid auth token"})

def forgot_password(request):
    data     = request.body
    convert  = data.decode("utf-8")
    ds       = json.loads(convert)
    email    = ds["email"]
    obj = Register.objects.filter(email=email).count()
    if obj < 1:
        return JsonResponse({"code":403,"msg":"email not found"})
    token = jwt.encode({'email': email}, 'secret', algorithm='HS256').decode("utf-8")
    mail = utils.send_mail([email],[token])
    if mail:
        return JsonResponse({"code":200,"msg":"verfified","token":token})
    else:
        return JsonResponse({"code":500,"msg":"server error"})

def reset_password(request):
    data     = request.body
    convert  = data.decode("utf-8")
    ds       = json.loads(convert)
    token        = ds["token"]
    new_password = ds["new_password"]
    print(new_password)
    email = jwt.decode(token, 'secret', algorithms=['HS256'])["email"]
    obj = Register.objects.filter(email=email).update(password=make_password(new_password, salt=None, hasher='default'))
    if obj:
        return JsonResponse({"code":200,"msg":"success"})
    else:
        return JsonResponse({"code":500,"msg":"server error"})
