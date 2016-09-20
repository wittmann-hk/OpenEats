from django.conf.urls import include, url
from django.views.generic import TemplateView
from accounts import views as account_views
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^admin/', include(admin.site.urls)),

    # Robots URL for Google
    url(r'^robots.txt$', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),

    # url(r'^search/', include('haystack.urls')),

    # url(r'^grappelli/', include('grappelli.urls')),
    # url(r'^feed/', include('feed.urls')),

    # url(r'^accounts/logout/$', account_views.logout_page),
    # url(r'^accounts/signIn/$', account_views.signIn_page),
    # url(r'^accounts/ajax-signIn/$', auth_views.login, {'template_name': 'accounts/ajax_signIn.html', }),
    # url(r'^accounts/ajax-create/$', register,
    #     {'backend': 'registration.backends.default.DefaultBackend', 'template_name': 'accounts/ajax_create.html', }),
    # url(r'^accounts/', include('registration.backends.default.urls')),

    # url('^profiles/edit', 'profiles.views.edit_profile', {'form_class': ProfileForm,}),
    # url(r'^profiles/', include('profiles.urls')),
    # url(r'^rosetta/', include('rosetta.urls')),
    # url(r'^follow/', include('relationships.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
