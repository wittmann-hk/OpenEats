from views import RecentRecipesFeed,TopRecipesFeed

urlpatterns = ('',
    (r'^recent/$', RecentRecipesFeed()),
    (r'^top/$', TopRecipesFeed()),
)