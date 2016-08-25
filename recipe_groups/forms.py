from django.forms import ModelForm
from models import Course, Cuisine


class CoursePopForm(ModelForm):
    """form object for the popup from the recipe_form to add a new course"""
    class Meta:
        model = Course
        #TODO commenting this out fixed an error, not sure why????
        #exclude = ('slug')


class CuisinePopForm(ModelForm):
    """form object for the popup from the recipe_form to add a new cuisine"""
    class Meta:
        model = Cuisine
        #TODO commenting this out fixed an error, not sure why????
        #exclude = ('slug')