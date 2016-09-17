from rest_framework import serializers
from models import Entry


class EntrySerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new course"""
    class Meta:
        model = Entry
        exclude = ('slug',)
