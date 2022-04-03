from django.urls import path

from . import views

app_name = 'tasklistmng'

urlpatterns = [
    path('', views.index, name='index'),
]