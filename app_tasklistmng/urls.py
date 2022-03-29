from django.urls import path
from app_tasklistmng import views

urlpatterns = [
    path('', views.app_tasklistmng, name='app_tasklistmng'),
]
