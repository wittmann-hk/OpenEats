# -*- coding:utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.db import models
from django.utils.translation import ugettext_lazy as _
from measurement.measures import Volume

from api.v1.recipe.models import Recipe
from .utils import mass_to_volume_lookup


class Ingredient(models.Model):
    title = models.CharField(_('title'), max_length=250)
    quantity = models.FloatField(_('quantity'), default=0)
    measurement = models.CharField(_('measurement'), max_length=200, blank=True, null=True)
    preparation = models.CharField(_('preparation'), max_length=100, blank=True, null=True)
    recipe = models.ForeignKey(Recipe, verbose_name=_('recipe'), related_name='ingredients')
 
    class Meta:
        ordering = ['title']

    def __unicode__(self):
        return self.title

    def mass_to_volume(self, mass):
        amount = float(mass_to_volume_lookup(mass, 'us_cup'))
        #self.quantity = Volume(us_cup=amount)
        #self.save()
