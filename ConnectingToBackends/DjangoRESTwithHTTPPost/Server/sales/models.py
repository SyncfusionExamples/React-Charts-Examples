from django.db import models


class MonthlySales(models.Model):
    month = models.CharField(max_length=20)
    sales = models.IntegerField()
    expenses = models.IntegerField()

    class Meta:
        ordering = ["id"]
        verbose_name = "Monthly Sale"
        verbose_name_plural = "Monthly Sales"

    def __str__(self):
        return f"{self.month} - Sales: {self.sales}, Expenses: {self.expenses}"