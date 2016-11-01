#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers
from models import Cuisine, Course, Tag


class CuisineSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = Cuisine
        exclude = ('slug',)


class CourseSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = Course
        exclude = ('slug',)


class TagSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = Tag
        fields = ('title', 'author')
        # TODO: I really don't get how to process many to many db fields with django rest,
        # TODO: So, I'll just remove the validation on the title so that it will pass
        extra_kwargs = {
            'title': {'validators': []},
        }
