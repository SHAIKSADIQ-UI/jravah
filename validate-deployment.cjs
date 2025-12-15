// Simple validation script to check if all required files exist for deployment
const fs = require('fs');
const path = require('path');

// Define the base directory
const baseDir = './jravahfoods';

// List of essential files for the website to function
const essentialFiles = [
  // HTML files
  'index.html',
  'about.html',
  'contact.html',
  'Snacks.html',
  'Pickels.html',
  'Spices.html',
  'Sweets.html',
  'shopus3.html',
  'product-single.html',
  'viewcart.html',
  
  // CSS files
  'css/premium-style.css',
  'css/food-videos.css',
  
  // JS files
  'cart.js',
  'js/products.js',
  'js/catalog.js',
  'js/site.js',
  'js/food-videos.js',
  'js/single-product.js',
  
  // Images directory should exist
  'images'
];

// Function to check if a file exists
function checkFileExists(filePath) {
  try {
    const fullPath = path.join(baseDir, filePath);
    const exists = fs.existsSync(fullPath);
    console.log(`${exists ? '✓' : '✗'} ${filePath}`);
    return exists;
  } catch (error) {
    console.log(`✗ ${filePath} - Error: ${error.message}`);
    return false;
  }
}

// Function to validate all essential files
function validateDeployment() {
  console.log('Checking essential files for deployment...\n');
  
  let allFilesExist = true;
  
  essentialFiles.forEach(file => {
    const exists = checkFileExists(file);
    if (!exists) {
      allFilesExist = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  if (allFilesExist) {
    console.log('✅ All essential files are present for deployment!');
    console.log('✅ The website is ready to be deployed to Hostinger.');
  } else {
    console.log('❌ Some essential files are missing.');
    console.log('❌ Please check the missing files before deployment.');
  }
  console.log('='.repeat(50));
  
  return allFilesExist;
}

// Run the validation
validateDeployment();