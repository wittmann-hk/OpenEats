from django.conf.urls import patterns

urlpatterns = patterns('',
   (r'^auto/$', 'ingredient.views.autocomplete_ing'),
)