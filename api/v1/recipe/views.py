#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.shortcuts import render_to_response, get_object_or_404, redirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.utils.translation import ugettext as _
from models import Recipe, StoredRecipe, NoteRecipe, ReportedRecipe
#from djangoratings.views import AddRatingView
from django.conf import settings
#from django.db.models import F
from taggit.models import Tag, TaggedItem

from . import serializers
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import filters


class RecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend,filters.SearchFilter)
    filter_fields = ('course', 'cuisine', 'title')
    search_fields = ('title',)


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


@login_required
def recipeMail(request, id):
    """this view creates a form used to send a recipe to someone via email"""
    if request.method == 'POST':
        form = serializers.RecipeSendMail(data=request.POST, request=request)  # passing the request object so that in the form I can get the request post dict to save the form
        if form.is_valid():
            form.save(fail_silently=False)
            return HttpResponse("recipe sent to " + request.POST['to_email'])
    else:
        form = serializers.RecipeSendMail(request=request)
    return render_to_response('recipe/recipe_email.html', {'form': form, 'id': id})


def recipeTags(request, tag):
    """displays a list of recipes with a giving tag"""
    recipe_tag = get_object_or_404(Tag, slug=tag)
    recipes_tagged = TaggedItem.objects.filter(tag=recipe_tag)
    recipe_list = []
    for recipe in recipes_tagged:
        recipe_list.append(recipe.content_object)

    return render_to_response('tags/recipe_tags.html', {'recipe_list': recipe_list}, context_instance=RequestContext(request))