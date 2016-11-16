#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from .models import Recipe
from imagekit.admin import AdminThumbnail
from api.v1.ingredient.models import Ingredient
from django.shortcuts import render_to_response
from django.contrib.flatpages.models import FlatPage
from django.contrib.flatpages.admin import FlatPageAdmin
from django.conf import settings


class RecipeAdmin(admin.ModelAdmin):

    def export_MealMaster(self, request, queryset):
        response = render_to_response('recipe/mealmaster_export.txt', {'queryset': queryset}, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename=recipe.txt'
        return response

    export_MealMaster.short_description = "Export Meal Master"

    actions=[export_MealMaster]
    list_display = ['title', 'admin_thumbnail', 'author', 'pub_date']
    admin_thumbnail = AdminThumbnail(image_field='photo')
    list_filter = ['author']
    search_fields = ['author__username', 'title',]


admin.site.register(Recipe, RecipeAdmin)
