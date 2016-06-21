from django.http import HttpResponse
from django.shortcuts import render
from models import Repo
from datetime import date

def index(request):
    repos = Repo.objects.all()
    repoList = []
    for repo in repos:
        d = {}
        d['title'] = repo.name.replace('-',' ')
        d['desc'] = repo.description
        d['path'] = repo.imagePath
        d['url'] = repo.url
        repoList.append(d)
    return render(request,'index.html',{'projects':repoList,'year':date.today().year})
