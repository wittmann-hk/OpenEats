from django.conf.urls import url

urlpatterns = ('',
    url(r'^recipe/(?P<tag>[-\w]+)/$', 'tags.views.recipeTags', name="recipe_tags"),
)