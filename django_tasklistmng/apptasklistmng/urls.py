from django.urls import path

from . import views

app_name = 'tasklistmng'

urlpatterns = [
    path('', views.index, name='index'),
    path('tasklist.html', views.index, name='tasklist'),
    path('signon.html', views.signon, name='signon'),
    path('signin.html', views.signin, name='signin'),
]