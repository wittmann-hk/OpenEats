from django.conf.urls import url

from . import views

urlpatterns = (
   url(r'^auto/$', views.autocomplete_ing),
)