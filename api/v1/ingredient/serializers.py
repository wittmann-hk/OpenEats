from rest_framework import serializers
from models import Ingredient
from measurement.measures import Volume


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Ingredient.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.measurement = validated_data.get('measurement', instance.measurement)
        instance.preparation = validated_data.get('preparation', instance.preparation)
        instance.save()
        return instance
