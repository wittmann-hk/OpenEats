from django.conf.urls import include, url
from django.conf import settings
from django.views.generic import TemplateView
from accounts.forms import ProfileForm
from accounts import views as account_views
from recipe import views as recipe_views
from django.contrib.auth import views as auth_views
from registration.views import RegistrationView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

import helpers.signals  #needed to import the signal for when a user is saved their profile is created
register = RegistrationView.as_view()

urlpatterns = (
    url(r'^admin/', include(admin.site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^accounts/logout/$', account_views.logout_page),
    url(r'^accounts/signIn/$', account_views.signIn_page),
    url(r'^accounts/ajax-signIn/$', auth_views.login, {'template_name': 'accounts/ajax_signIn.html',}),
    url(r'^accounts/ajax-create/$', register, {'backend': 'registration.backends.default.DefaultBackend','template_name': 'accounts/ajax_create.html',}),
    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^feed/', include('feed.urls')),
    url(r'^groups/', include('recipe_groups.urls')),
    url(r'^recipe/', include('recipe.urls')),
    url(r'^ingredient/', include('ingredient.urls')),
    url(r'^search/', include('haystack.urls')),
    url(r'^news/', include('news.urls')),
    url(r'^robots.txt$', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    url(r'^$', recipe_views.index),
    #url('^profiles/edit', 'profiles.views.edit_profile', {'form_class': ProfileForm,}),
    #url(r'^profiles/', include('profiles.urls')),
    #url(r'^rosetta/', include('rosetta.urls')),
    #url(r'^follow/', include('relationships.urls')),
    #url(r'^list/', include('list.urls')),
)


'''
if settings.SERVE_MEDIA:
    urlpatterns += ('',
        url(r'^site-media/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.MEDIA_ROOT}),
        )'''
