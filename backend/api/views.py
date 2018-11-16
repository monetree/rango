from django.shortcuts import render
from .models import Posts
import json
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from .documents import PostDocument

def search(request):
    data = request.body
    data = data.decode("utf-8")
    ds   = json.loads(data)
    q = ds["q"]
    posts = PostDocument.search().query("match", title=q)
    lst=[]
    dict ={}
    for i in posts:
        dict["title"]=i.title
        dict["content"]=i.content
        dict["photo"]=i.photo
        lst.append(dict.copy())
    return JsonResponse(lst,safe=False)

def post_profile(request):
    if request.method == "POST":
        photo   = request.FILES['img']
        title   = request.POST['title']
        content = request.POST['content']

        fs = FileSystemStorage()
        filename = fs.save(photo.name, photo)
        uploaded_photo_url = fs.url(filename)

        obj = Posts.objects.create(title=title,content=content,photo=uploaded_photo_url)
        if obj:
            return JsonResponse({"code":200,"msg":"success"})
        else:
            return JsonResponse({"code":500,"msg":"server error"})
    else:
        return JsonResponse({"code":500,"msg":"bad request"})


def get_profile(request):
    data = list(Posts.objects.values())
    return JsonResponse(data, safe=False)


def delete_profile(request):
    data = request.body
    data = data.decode("utf-8")
    ds   = json.loads(data)
    id   = ds["id"]
    obj  = Posts.objects.filter(id=id).delete()
    if obj:
        return JsonResponse({"code":200,"msg":"success"})
    else:
        return JsonResponse({"code":500,"msg":"server error"})
