import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parents[1] / "public_html"

FILES = [
    ("Pickels.html", "Pickles"),
    ("Sweets.html", "Sweets"),
    ("Spices.html", "Spices"),
    ("Snacks.html", "Snacks"),
    ("Snacks3.html", "Snacks"),
    ("shopus3.html", "Mixed"),
]

pattern = re.compile(
    r"\{\s*name:\s*'([^']+)'\s*,\s*image:\s*'([^']+)'\s*,\s*stock:\s*'([^']+)'\s*,"
    r"\s*basePrice:\s*([0-9.]+)\s*,\s*ingredients:\s*'([^']*)'\s*,\s*benefits:\s*'([^']*)'\s*\}",
    re.DOTALL,
)

def extract_products():
    data = {}

    for file_name, category in FILES:
        content = (BASE / file_name).read_text(encoding="utf-8")
        block_match = re.search(r"const products\s*=\s*\[([\s\S]*?)\];", content)
        if not block_match:
            continue

        for match in pattern.findall(block_match.group(1)):
            name, image, stock, base_price, ingredients, benefits = match
            key = name.strip().lower()
            if key in data:
                continue

            base_val = float(base_price)
            data[key] = {
                "name": name.strip(),
                "image": image.strip(),
                "category": category,
                "stock": stock.strip(),
                "basePrice": base_val,
                "ingredients": ingredients.strip(),
                "benefits": benefits.strip(),
            }

    return list(data.values())


if __name__ == "__main__":
    products = extract_products()
    output_path = Path(__file__).with_name("products.json")
    with open(output_path, "w", encoding="utf-8") as fh:
        json.dump(products, fh, indent=2, ensure_ascii=False)
    print(f"Extracted {len(products)} products to {output_path}")

