from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter(schema_title='Recipe Groups')
router.register(r'course', views.CourseViewSet)
router.register(r'cuisine', views.CuisineViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
