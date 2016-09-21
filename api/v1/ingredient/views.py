#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.http import HttpResponse
from models import Ingredient
import json
from serializers import IngredientSerializer
from rest_framework import permissions, viewsets
from permissions import IsOwnerOrReadOnly


class IngredientViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
