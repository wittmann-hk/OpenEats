#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import permissions, viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView
import random

from . import serializers
from .models import Recipe, Direction
from v1.common.permissions import IsOwnerOrReadOnly


class RecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('course__slug', 'cuisine__slug', 'course', 'cuisine', 'title')
    search_fields = ('title', 'tags__title')


class MiniBrowseViewSet(viewsets.mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    """
    This viewset automatically provides `list` action.
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.MiniBrowseSerializer

    def list(self, request, *args, **kwargs):
        # Get the limit from the request and the count from the DB.
        # Compare to make sure you aren't accessing more than possible.
        limit = int(request.query_params.get('limit'))
        count = Recipe.objects.count()
        if limit > count:
            limit = count

        # Get all ids from the DB.
        my_ids = Recipe.objects.values_list('id', flat=True)
        # Select a random sample from the DB.
        rand_ids = random.sample(my_ids, limit)
        # set teh queryset to that random sample.
        self.queryset = Recipe.objects.filter(id__in=rand_ids)

        return super(MiniBrowseViewSet, self).list(request, *args, **kwargs)


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


class RecipeImportViewSet(APIView):
    """
    Given a URL this Viewset will mine a website for recipe data.
    Whatever data is retrieved will be sent back to the UI.
    
    Only Post is allowed due to potential URL size issues.
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def post(self, request, *args, **kwargs):
        return Response({'title': 'hi'})
