from django.shortcuts import render_to_response, get_object_or_404, redirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.forms.models import inlineformset_factory
from django.http import HttpResponse, Http404
from django.contrib.contenttypes.models import ContentType
from django.views.generic import DetailView
from django.utils.translation import ugettext as _
from models import Recipe, StoredRecipe, NoteRecipe, ReportedRecipe
from ingredient.models import Ingredient
#from djangoratings.views import AddRatingView
from django.conf import settings
from django.db.models import F
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import *
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from taggit.models import Tag, TaggedItem
import json

from . import serializers
from rest_framework import permissions
from rest_framework import viewsets


class RecipeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


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


def exportPDF(request, slug):
    """Exports recipes to a pdf"""

    pdfmetrics.registerFont(TTFont('Vera', 'Vera.ttf'))
    pdfmetrics.registerFont(TTFont('VeraBd', 'VeraBd.ttf'))
    pdfmetrics.registerFont(TTFont('VeraIt', 'VeraIt.ttf'))
    pdfmetrics.registerFont(TTFont('VeraBI', 'VeraBI.ttf'))
    registerFontFamily('Vera', normal='Vera', bold='VeraBd', italic='VeraIt', boldItalic='VeraBI')

    recipe = get_object_or_404(Recipe, slug=slug)

    # Create the HttpResponse object with the appropriate PDF headers.
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=' + recipe.slug + '.pdf'

    # Our container for 'Flowable' objects
    elements = []

    # set up our styles
    styles = getSampleStyleSheet()
    styleH1 = styles['Heading1']
    styleH1.textColor = colors.green
    styleH1.fontName = 'VeraBd'
    styleH2 = styles['Heading2']
    styleH2.textColor = colors.goldenrod
    styleH2.fontName = 'Vera'
    styleNormal = styles['Normal']
    styleNormal.fontName='Vera'
    styleBullet = styles['Bullet']
    styleBullet.fontName = 'VeraIt'

    # create the pdf doc
    doc = SimpleDocTemplate(response)

    # set the openeats logo
    logo = settings.STATIC_ROOT + "/" + settings.OELOGO
    I = Image(logo)
    I.hAlign = 'LEFT'
    elements.append(I)
    elements.append(Spacer(0, 1 * cm))

    # add the recipe photo if the recipe has one
    if recipe.photo:
        photo = settings.BASE_PATH + recipe.photo.url
        I = Image(photo)
        I.height = "CENTER"
        elements.append(I)
        elements.append(Spacer(0, 0.5 * cm))

    # add the meat of the pdf
    elements.append(Paragraph(recipe.title, styleH1))
    elements.append(Paragraph('info', styleH2))
    elements.append(Paragraph(recipe.info, styleNormal))
    elements.append(Paragraph('ingredients', styleH2))

    for ing in recipe.ingredients.all():
        ing = "%s %s %s %s" % (ing.quantity, ing.measurement, ing.title, ing.preparation)
        elements.append(Paragraph(ing, styleBullet))

    elements.append(Paragraph('directions', styleH2))
    elements.append(Paragraph(recipe.directions, styleNormal))

    # build the pdf and return it
    doc.build(elements)
    return response


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