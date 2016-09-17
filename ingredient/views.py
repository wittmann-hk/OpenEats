from django.http import HttpResponse
from models import Ingredient
import json
from serializers import IngredientSerializer
from rest_framework import permissions
from rest_framework import viewsets


class IngredientViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def autocomplete_ing(request):
        """Used to auto complete ingredient names on the recipe form. This view is called by a jquery script
           returns json list of ten ingredients found
        """

        q = request.GET.get('term', '')
        ing_list = Ingredient.objects.filter(title__istartswith=q).values_list('title').distinct().order_by('title')[:10]
        results = []
        for ing_item in ing_list:
            results.append(" ".join(ing_item))
        json_obj = json.dumps(results)
        return HttpResponse(json_obj, content_type="application/json")