from rest_framework import serializers
from models import Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new course"""
    class Meta:
        model = Ingredient
        exclude = ('slug',)
