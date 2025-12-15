import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
json_path = ROOT / "scripts" / "products.json"
output_path = ROOT / "public_html" / "js" / "products.js"

category_keywords = {
    "Pickles": ["pickle", "gongura", "mirchi", "mango", "garlic", "chicken", "mutton", "prawns"],
    "Spices": ["podi", "masala", "powder", "kaaram", "paste", "podulu"],
    "Sweets": ["ladoo", "laddu", "chikki", "sweet", "gavvalu", "ariselu", "honey", "chalimidi", "kajji"],
}


def resolve_category(item):
    current = item.get("category", "").strip()
    if current and current != "Mixed":
        return current

    name = item.get("name", "").lower()
    for category, keywords in category_keywords.items():
        if any(keyword in name for keyword in keywords):
            return category
    return "Snacks"


def price_value(amount):
    val = round(amount, 2)
    return int(val) if val.is_integer() else val


def normalize_image(path):
    return path.replace("./", "", 1) if path.startswith("./") else path


def build_records():
    products = json.loads(json_path.read_text(encoding="utf-8"))
    records = []
    for idx, item in enumerate(products, start=1):
        base_price = item.get("basePrice", 0) or 0
        if not base_price:
            continue

        description = item.get("benefits") or item.get("ingredients") or ""

        weights = {
            "250g": price_value(base_price / 4),
            "500g": price_value(base_price / 2),
            "1kg": price_value(base_price),
        }

        records.append(
            {
                "id": idx,
                "name": item["name"].strip(),
                "category": resolve_category(item),
                "image": normalize_image(item.get("image", "")),
                "description": description.strip(),
                "ingredients": item.get("ingredients", "").strip(),
                "stock": item.get("stock", "in"),
                "weights": weights,
            }
        )

    return records


def write_js(records):
    js_array = json.dumps(records, indent=2, ensure_ascii=False)
    contents = (
        "const products = "
        + js_array
        + ";\n\nif (typeof module !== 'undefined' && module.exports) {\n"
        + "  module.exports = products;\n}\n"
    )
    output_path.write_text(contents, encoding="utf-8")
    print(f"Wrote {len(records)} products to {output_path}")


if __name__ == "__main__":
    write_js(build_records())

