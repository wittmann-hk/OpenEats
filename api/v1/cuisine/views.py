#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from models import Cuisine
from serializers import CuisineSerializer
from rest_framework import permissions
from rest_framework import viewsets
from permissions import IsOwnerOrReadOnly


class CuisineViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    # TODO: this is how I can change the lookup field
    #lookup_field = 'title'
