from rest_framework import serializers
from models import Course, Cuisine


class CourseSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new course"""
    class Meta:
        model = Course
        exclude = ('slug',)


class CuisineSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = Cuisine
        exclude = ('slug',)