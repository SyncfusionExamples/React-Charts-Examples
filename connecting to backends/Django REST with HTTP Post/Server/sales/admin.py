from django.contrib import admin
from .models import MonthlySales


@admin.register(MonthlySales)
class MonthlySalesAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "month",
        "sales",
        "expenses",
    )

    search_fields = (
        "month",
    )

    ordering = (
        "id",
    )