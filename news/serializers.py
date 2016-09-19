from rest_framework import serializers
from models import Entry


class EntrySerializer(serializers.ModelSerializer):
    #title = serializers.HyperlinkedIdentityField(view_name='entry-title', format='html')

    class Meta:
        model = Entry
        exclude = ('slug',)

    def create(self, validated_data):
        """
        Create and return a new `Entry` instance, given the validated data.
        """
        return Entry.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Entry` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.frontpage = validated_data.get('frontpage', instance.frontpage)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
