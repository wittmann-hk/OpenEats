#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from models import UserProfiles


class ProfileAdmin(admin.ModelAdmin):
    search_fields = ['user__username', 'location']
    list_display = ['user', 'pub_date', 'location']

admin.site.register(UserProfiles, ProfileAdmin)
