from django.urls import path, re_path

from . import views

app_name = 'apptasklistmng'

urlpatterns = [
    path('', views.index, name='index'),
    path('tasklist.html', views.index, name='index2'),
    re_path(r'\w*/tasklist.html$', views.indexLongerUrl, name='indexLonger'),

    path('signin.html', views.signin, name='signin'),
    re_path(r'\w*/signin.html$', views.signinLongerUrl, name='signinLonger'),

    path('signon.html', views.signon, name='signon'),
    re_path(r'\w*/signon.html$', views.signonLongerUrl, name='signonLonger'),
    
    path('signinprocess/', views.signinprocess, name="signinprocess"),
    path('signonprocess/', views.signonprocess, name="signonprocess"),
    
    # path('userprofile/', views.userprofile, name='userprofile'),
]