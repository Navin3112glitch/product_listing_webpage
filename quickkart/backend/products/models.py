from django.db import models


class Product(models.Model):

    source_id = models.PositiveIntegerField(unique=True)

    title = models.CharField(max_length=255)

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    category = models.CharField(max_length=100)

    image = models.URLField(max_length=500)

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0
    )

    rating_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title