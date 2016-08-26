from django.conf.urls import url
from helpers.recipe_views import RecentRecipeView, TopRecipeView
from recipe.views import CookList

from . import views

urlpatterns = ('',
    url(r'^new/$', views.recipe, name="new_recipe"),
    url(r'^mail/(?P<id>\d+)/$', views.recipeMail, name='recipe_mail'),
    url(r'^edit/(?P<user>[-\w]+)/(?P<slug>[-\w]+)/$', views.recipe, name='recipe_edit'),
    url(r'^print/(?P<slug>[-\w]+)/$', views.recipePrint, name="print_recipe"),
    (r'^cook/(?P<slug>[-\w]+)/$', CookList.as_view()),
    url(r'^report/(?P<slug>[-\w]+)/$', views.recipeReport, name='recipe_report'),
    url(r'^store/(?P<object_id>\d+)/$', views.recipeStore, name='recipe_store'),
    url(r'^unstore/$', views.recipeUnStore, name='recipe_unstore'),
    (r'^ajaxnote/$', views.recipeNote),
    (r'^ajaxulist/(?P<shared>[-\w]+)/(?P<user>[-\w]+)/$', views.recipeUser),
    url(r'^ajax-raterecipe/(?P<object_id>\d+)/(?P<score>\d+)/$', views.recipeRate, name='recipe_rate'),
    (r'^ajax-favrecipe/$', views.recipeUserFavs),
    url(r'^recent/$', RecentRecipeView.as_view(), name='recipe_recent'),
    url(r'^top/$', TopRecipeView.as_view(), name='recipe_top'),
    url(r'^(?P<slug>[-\w]+)/$', views.recipeShow, name='recipe_show'),
    url(r'^export/(?P<slug>[-\w]+)/$', views.exportPDF, name='recipe_export'),
    url(r'^$', views.index, name='recipe_index'),
)
