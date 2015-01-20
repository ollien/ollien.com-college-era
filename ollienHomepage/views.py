from django.http import HttpResponse
from django.shortcuts import render
from models import Repo
def index(request):
	
	return render(request,'index.html',{'projects':[{'title':'test','desc':'toast','path':'http://i.imgur.com/QpOEX.jpg'},{'title':'toasting!','desc':'Toasting bread in a toaster!','path':'/git-screenshots/c77bb05e4a3c95811d3ebb157e21e97748db6589.png'}]})
