from django.urls import path
from .views import SalesChartDataAPIView

urlpatterns = [
    path("sales/", SalesChartDataAPIView.as_view(), name="sales-chart-data"),
]