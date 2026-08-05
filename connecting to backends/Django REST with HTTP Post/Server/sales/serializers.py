from rest_framework import serializers
from .models import MonthlySales


class MonthlySalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlySales
        fields = [
            "id",
            "month",
            "sales",
            "expenses",
        ]