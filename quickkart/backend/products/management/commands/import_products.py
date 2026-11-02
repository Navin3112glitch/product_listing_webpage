import json
from pathlib import Path

from django.core.management.base import BaseCommand
from products.models import Product


class Command(BaseCommand):

    help = "Import products from JSON dataset"

    def handle(self, *args, **kwargs):

        dataset_path = (
    Path(__file__).resolve().parents[4]
    / "dataset"
    / "products.json"
)

        with open(dataset_path, "r", encoding="utf-8") as file:
            products = json.load(file)

        imported_count = 0

        for item in products:

            Product.objects.update_or_create(
                source_id=item["id"],
                defaults={
                    "title": item["title"],
                    "description": item["description"],
                    "price": item["price"],
                    "category": item["category"],
                    "image": item["image"],
                    "rating": item["rating"]["rate"],
                    "rating_count": item["rating"]["count"],
                }
            )

            imported_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully imported {imported_count} products!"
            )
        )