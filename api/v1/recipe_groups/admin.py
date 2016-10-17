#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from models import Cuisine


class CuisineAdmin(admin.ModelAdmin):
    ordering = ['title']
    list_display = ['title', 'author']
    list_filter = ['author']


admin.site.register(Cuisine, CuisineAdmin)
