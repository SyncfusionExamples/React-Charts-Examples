from rest_framework.viewsets import ModelViewSet
from .models import Sales
from .serializers import SalesSerializer

class SalesViewSet(ModelViewSet):
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        year = self.request.query_params.get('year')

        if year:
            queryset = queryset.filter(year=year)

        return queryset