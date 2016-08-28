from django.conf.urls import url
from views import RecentRecipesFeed,TopRecipesFeed

urlpatterns = (
    url(r'^recent/$', RecentRecipesFeed()),
    url(r'^top/$', TopRecipesFeed()),
)