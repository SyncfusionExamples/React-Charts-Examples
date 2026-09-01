from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import MonthlySales
from .serializers import MonthlySalesSerializer


class SalesChartDataAPIView(APIView):
    """
    API endpoint for Syncfusion React Chart remote data binding.

    Supports:
    - GET for browser testing
    - POST for Syncfusion DataManager UrlAdaptor

    Required response format for UrlAdaptor:
    {
        "result": [...],
        "count": 12
    }
    """

    permission_classes = [AllowAny]

    allowed_sort_fields = {
        "id",
        "month",
        "sales",
        "expenses",
    }

    def get_queryset(self):
        return MonthlySales.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = MonthlySalesSerializer(queryset, many=True)

        return Response(
            {
                "result": serializer.data,
                "count": queryset.count(),
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        payload = request.data

        queryset = self.get_queryset()

        # Sorting from Syncfusion DataManager
        sorted_items = payload.get("sorted", [])

        if isinstance(sorted_items, list):
            for sort_item in sorted_items:
                field_name = sort_item.get("name")
                direction = sort_item.get("direction", "ascending")

                if field_name in self.allowed_sort_fields:
                    if direction == "descending":
                        queryset = queryset.order_by(f"-{field_name}")
                    else:
                        queryset = queryset.order_by(field_name)

        total_count = queryset.count()

        # Paging from Syncfusion DataManager
        skip = payload.get("skip", 0)
        take = payload.get("take", None)

        try:
            skip = int(skip)
        except (TypeError, ValueError):
            skip = 0

        if take is not None:
            try:
                take = int(take)
            except (TypeError, ValueError):
                take = None

        if take is not None:
            queryset = queryset[skip: skip + take]
        else:
            queryset = queryset[skip:]

        serializer = MonthlySalesSerializer(queryset, many=True)

        return Response(
            {
                "result": serializer.data,
                "count": total_count,
            },
            status=status.HTTP_200_OK,
        )