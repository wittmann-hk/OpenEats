#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Recipe, Tag
from api.v1.ingredient.serializers import IngredientSerializer
from api.v1.recipe_groups.serializers import TagSerializer
from api.v1.ingredient.models import Ingredient
from django.conf import settings
from .mixins import FieldLimiter


class MyImageField(serializers.ImageField):
    def to_representation(self, value):
        if not bool(value):
            return settings.MEDIA_URL + 'default_thumbnail.png'
        return super(MyImageField, self).to_representation(value)


class RecipeSerializer(FieldLimiter, serializers.ModelSerializer):
    """ Used to create new recipes"""
    photo_thumbnail = MyImageField(required=False)
    ingredients = IngredientSerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Recipe
        exclude = ('slug',)

    def create(self, validated_data):
        """
        Create and return a new `Recipe` instance, given the validated data.
        This will also create all the ingredient objects required and
        Create all Tags that are new.
        """
        # Pop tags and ingredients
        ingredient_data = validated_data.pop('ingredients')
        tag_data = validated_data.pop('tags')

        # Create the recipe
        recipe = Recipe.objects.create(**validated_data)

        # Create the Ingredients
        for ingredient in ingredient_data:
            Ingredient.objects.create(recipe=recipe, **ingredient)

        # Create the Tags
        for tag in tag_data:
            author = User.objects.get(pk=1)
            obj, created = Tag.objects.get_or_create(title=tag['title'].strip(), defaults={'author': author})
            recipe.tags.add(obj)

        return recipe
