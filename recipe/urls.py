from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views
from helpers.recipe_views import RecentRecipeView, TopRecipeView

# Create a router and register our viewsets with it.
router = DefaultRouter(schema_title='Recipes')
router.register(r'recipes', views.RecipeViewSet)
router.register(r'reported', views.ReportedRecipeViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]


'''
urlpatterns = (
    url(r'^mail/(?P<id>\d+)/$', views.recipeMail, name='recipe_mail'),
    url(r'^print/(?P<slug>[-\w]+)/$', views.recipePrint, name="print_recipe"),
    url(r'^store/(?P<object_id>\d+)/$', views.recipeStore, name='recipe_store'),
    url(r'^unstore/$', views.recipeUnStore, name='recipe_unstore'),
    url(r'^ajaxnote/$', views.recipeNote),
    url(r'^ajaxulist/(?P<shared>[-\w]+)/(?P<user>[-\w]+)/$', views.recipeUser),
    url(r'^ajax-favrecipe/$', views.recipeUserFavs),
    url(r'^recent/$', RecentRecipeView.as_view(), name='recipe_recent'),
    url(r'^top/$', TopRecipeView.as_view(), name='recipe_top'),
    url(r'^(?P<slug>[-\w]+)/$', views.recipeShow, name='recipe_show'),
    url(r'^export/(?P<slug>[-\w]+)/$', views.exportPDF, name='recipe_export'),
    url(r'^recipe/(?P<tag>[-\w]+)/$', views.recipeTags, name="recipe_tags"),
)
'''
