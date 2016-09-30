#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

import django.forms as forms
from django.core.mail import EmailMessage, BadHeaderError
from django.utils.translation import ugettext_lazy as _
from django.contrib.sites.models import Site
from django.template import loader, RequestContext
from django.http import HttpResponse

from rest_framework import serializers
from models import Recipe, ReportedRecipe, StoredRecipe, NoteRecipe


class MyImageField(serializers.ImageField):
    def to_representation(self, value):
        if not bool(value):
            return "http://www.freeiconspng.com/uploads/chef-hat-food-restaurant-icon-31.png"
        return super(MyImageField, self).to_representation(value)


class RecipeSerializer(serializers.ModelSerializer):
    """ Used to create new recipes"""
    photo = MyImageField(required=False)
    # This is in the settings now, if I need different date tiem formats this could be a problem.
    #pub_date = serializers.DateTimeField(format='%B %-d, %Y')

    class Meta:
        model = Recipe
        exclude = ('slug',)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Recipe.objects.create(**validated_data)


class ReportedRecipeSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = ReportedRecipe
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return ReportedRecipe.objects.create(**validated_data)


class StoredRecipeSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = StoredRecipe
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return StoredRecipe.objects.create(**validated_data)


class NoteRecipeSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = NoteRecipe
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return NoteRecipe.objects.create(**validated_data)


class RecipeSendMail(forms.Form):
    """Recipe form to send a recipe via email"""
    def __init__(self, data=None, files=None, request=None, *args, **kwargs):
        if request is None:
            raise TypeError("Keyword argument 'request must be supplies'")
        super(RecipeSendMail, self).__init__(data=data, files=files, *args, **kwargs)
        self.request = request

    to_email = forms.EmailField(widget=forms.TextInput(), label=_('email address'))
    id = forms.CharField(widget=forms.HiddenInput())
    from_site = Site.objects.get_current()

    def _get_recipe(self):
        if self.is_valid():
            recipe = Recipe.objects.get(pk=self.cleaned_data['id'])
            self.recipe = recipe
            return self.recipe
        else:
            raise ValueError(_('Can not get the recipe id from invalid form data'))


    def get_body(self):
        """get the recipe and return the message body for the email"""
        template_name = 'recipe/recipe_mail_body.html'  # template that contains the email body and also shared by the grocery print view
        message = loader.render_to_string(template_name, {'recipe': self._get_recipe()}, context_instance=RequestContext(self.request))
        return message

    def get_toMail(self):
        """gets the email to send the list to from the form"""
        if self.is_valid():
            return self.cleaned_data['to_email']
        else:
            raise ValueError(_('Can not get to_email from invalid form data'))

    def save(self, fail_silently=False):
        """ sends the email message"""
        self.subject = _(str(self.from_site) + ' recipe: ' + self._get_recipe().title)
        self.from_email =  self.request.user.email
        if self.subject and self.get_body() and self.from_email:
            try:
                msg = EmailMessage(self.subject, self.get_body(), self.from_email, [self.get_toMail()])
                msg.content_subtype = 'html'
                msg.send()
            except BadHeaderError:
                return HttpResponse(_('Invalid header found.'))
            return HttpResponse(_('Email Sent'))
        else:
            return HttpResponse('Make sure all fields are entered and valid.')
