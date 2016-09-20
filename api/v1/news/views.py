from models import Entry
from serializers import EntrySerializer
from rest_framework import renderers, permissions, viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response


class EntryViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = (permissions.IsAdminUser,)

    @detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
    def title(self, request, *args, **kwargs):
        entry = self.get_object()
        return Response(entry.content)
