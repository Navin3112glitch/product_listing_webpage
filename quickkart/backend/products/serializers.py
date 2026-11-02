from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product

        fields = [
            'id',
            'source_id',
            'title',
            'description',
            'price',
            'category',
            'image',
            'rating',
            'rating_count'
        ]