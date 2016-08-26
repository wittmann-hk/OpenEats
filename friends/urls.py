from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^following/(?P<username>[\w-]+)/$', views.follow_list),
    url(r'^feed/(?P<username>[\w-]+)/$', views.feed),
]
