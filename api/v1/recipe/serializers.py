#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers

from models import Recipe, ReportedRecipe, StoredRecipe, NoteRecipe
from api.v1.ingredient.serializers import IngredientSerializer
from api.v1.ingredient.models import Ingredient
from django.conf import settings


class MyImageField(serializers.ImageField):
    def to_representation(self, value):
        if not bool(value):
            return settings.MEDIA_URL + 'default_thumbnail.png'
        return super(MyImageField, self).to_representation(value)


class RecipeSerializer(serializers.ModelSerializer):
    """ Used to create new recipes"""
    #photo = MyImageField(required=False)
    photo_thumbnail = MyImageField(required=False)
    ingredients = IngredientSerializer(many=True)
    #TODO: This is in the settings now, if I need different date tiem formats this could be a problem.
    #pub_date = serializers.DateTimeField(format='%B %-d, %Y')

    class Meta:
        model = Recipe
        exclude = ('slug',)

    #TODO: This should be moved to a common file
    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(RecipeSerializer, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            fields = self.context['request'].query_params.get('fields')
            if fields:
                fields = fields.split(',')
                # Drop any fields that are not specified in the `fields` argument.
                allowed = set(fields)
                existing = set(self.fields.keys())
                for field_name in existing - allowed:
                    self.fields.pop(field_name)

    def create(self, validated_data):
        """
        Create and return a new `Recipe` instance, given the validated data.
        This will also create all the ingredient objects required.
        """
        ingredient_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient in ingredient_data:
            Ingredient.objects.create(recipe=recipe, **ingredient)
        return recipe


class ReportedRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportedRecipe
        fields = '__all__'


class StoredRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoredRecipe
        fields = '__all__'


class NoteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteRecipe
        fields = '__all__'
