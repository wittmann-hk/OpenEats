from django.conf.urls import patterns
from views import RecentRecipesFeed,TopRecipesFeed

urlpatterns = patterns('',
    (r'^recent/$', RecentRecipesFeed()),
    (r'^top/$', TopRecipesFeed()),
)