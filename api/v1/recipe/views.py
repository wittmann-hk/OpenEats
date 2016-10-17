#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import permissions, viewsets, filters

from . import serializers
from models import Recipe, StoredRecipe, NoteRecipe, ReportedRecipe


class RecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('cuisine', 'title')
    search_fields = ('title', 'tags')


class ReportedRecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = ReportedRecipe.objects.all()
    serializer_class = serializers.ReportedRecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class NoteRecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = NoteRecipe.objects.all()
    serializer_class = serializers.NoteRecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class StoredRecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = StoredRecipe.objects.all()
    serializer_class = serializers.StoredRecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
