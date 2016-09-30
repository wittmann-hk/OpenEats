#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = [
    # Backend
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^search/', include('haystack.urls')),

    # Web UI
    url(r'^$', TemplateView.as_view(template_name='news/news.html'), name='home'),
    url(r'^recipe/$', TemplateView.as_view(template_name='recipe/recipe.html'), name='recipe'),
    url(r'^browse/', TemplateView.as_view(template_name='browse/browse.html'), name='browse'),
    url(r'^search/$', TemplateView.as_view(template_name='base/base.html'), name='search'),
    url(r'^about/$', TemplateView.as_view(template_name='base/base.html'), name='about'),

    # Admin
    url(r'^admin/', include(admin.site.urls)),

    # Robots URL for Google
    url(r'^robots.txt$', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),


    # url(r'^grappelli/', include('grappelli.urls')),

    # url(r'^accounts/logout/$', account_views.logout_page),
    # url(r'^accounts/signIn/$', account_views.signIn_page),
    # url(r'^accounts/ajax-signIn/$', auth_views.login, {'template_name': 'accounts/ajax_signIn.html', }),
    # url(r'^accounts/ajax-create/$', register,
    #     {'backend': 'registration.backends.default.DefaultBackend', 'template_name': 'accounts/ajax_create.html', }),
    # url(r'^accounts/', include('registration.backends.default.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
