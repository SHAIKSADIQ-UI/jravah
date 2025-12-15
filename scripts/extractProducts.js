const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public_html');

const files = [
  { file: 'Pickels.html', category: 'Pickles' },
  { file: 'Sweets.html', category: 'Sweets' },
  { file: 'Spices.html', category: 'Spices' },
  { file: 'Snacks.html', category: 'Snacks' },
  { file: 'Snacks3.html', category: 'Snacks' },
  { file: 'shopus3.html', category: 'Mixed' },
];

const normalizeName = (name = '') => name.trim().toLowerCase();

const dataMap = new Map();

files.forEach(({ file, category }) => {
  const filePath = path.join(baseDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const products\s*=\s*\[([\s\S]*?)\];/);
  if (!match) {
    console.warn(`No products array found in ${file}`);
    return;
  }

  const arrayLiteral = `[${match[1]}]`;
  let products;
  try {
    products = eval(arrayLiteral);
  } catch (err) {
    console.error(`Failed to parse products from ${file}:`, err.message);
    return;
  }

  products.forEach((product) => {
    if (!product || !product.name) {
      return;
    }

    const key = normalizeName(product.name);
    if (dataMap.has(key)) {
      return;
    }

    dataMap.set(key, {
      name: product.name.trim(),
      image: product.image,
      basePrice: product.basePrice,
      description: product.benefits || product.ingredients || '',
      ingredients: product.ingredients || '',
      category,
    });
  });
});

const combined = Array.from(dataMap.values());

const outputPath = path.join(__dirname, 'products.json');
fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2), 'utf8');

console.log(`Extracted ${combined.length} unique products to ${outputPath}`);



