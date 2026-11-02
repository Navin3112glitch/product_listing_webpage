from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Product
from .serializers import ProductSerializer


class ProductListView(generics.ListAPIView):

    serializer_class = ProductSerializer

    filter_backends = [SearchFilter, OrderingFilter]

    search_fields = ['title', 'category', 'description']

    ordering_fields = ['price', 'title', 'rating']

    ordering = ['id']

    def get_queryset(self):

        queryset = Product.objects.all()

        category = self.request.query_params.get('category')

        if category:
            queryset = queryset.filter(category__iexact=category)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer