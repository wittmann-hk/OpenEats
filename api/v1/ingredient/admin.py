#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from api.v1.ingredient.models import Ingredient


class IngredientAdmin(admin.ModelAdmin):
    ordering = ['title', 'recipe']
    list_display = ['title', 'recipe', ]
    search_fields = ['title', 'recipe__title', ]

admin.site.register(Ingredient, IngredientAdmin)
