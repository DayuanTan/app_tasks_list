from django.shortcuts import render

# Create your views here.
def app_tasklistmng(request):
    return render(request, 'index.html', {})