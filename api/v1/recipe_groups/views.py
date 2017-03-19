#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.db.models import Count
from v1.recipe_groups.models import Cuisine, Course, Tag
from v1.recipe_groups import serializers
from rest_framework import permissions
from rest_framework import viewsets
from v1.common.permissions import IsOwnerOrReadOnly


class CuisineViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    serializer_class = serializers.CuisineSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'slug'

    def get_queryset(self):
        query = Cuisine.objects

        if 'course' in self.request.query_params:
            try:
                course = Course.objects.get(slug=self.request.query_params.get('course'))
                query = query.filter(recipe__course=course)
            except:
                return []

        return query.annotate(total=Count('recipe', distinct=True))


class CourseViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    serializer_class = serializers.CourseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'slug'

    def get_queryset(self):
        query = Course.objects

        if 'cuisine' in self.request.query_params:
            try:
                cuisine = Cuisine.objects.get(slug=self.request.query_params.get('cuisine'))
                query = query.filter(recipe__cuisine=cuisine)
            except:
                return []

        return query.annotate(total=Count('recipe', distinct=True))


class TagViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'title'
