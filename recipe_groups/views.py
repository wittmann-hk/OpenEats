from models import Course, Cuisine
from serializers import CourseSerializer, CuisineSerializer
from rest_framework import permissions
from rest_framework import viewsets


class CourseViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class CuisineViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
