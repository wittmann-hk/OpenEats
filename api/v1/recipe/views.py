#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import permissions, viewsets, filters

from . import serializers
from .models import Recipe, Direction
from api.v1.common.permissions import IsOwnerOrReadOnly


class RecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('course__title', 'cuisine__title', 'course', 'cuisine', 'title')
    search_fields = ('title', 'tags__title')


class DirectionViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions for Ingredients.
    """
    queryset = Direction.objects.all()
    serializer_class = serializers.DirectionSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('recipe',)
