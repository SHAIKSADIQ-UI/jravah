(() => {
  if (typeof window === 'undefined') return;

  const weightOrder = ['250g', '500g', '1kg'];
  const priceFormatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formatCurrency = (value) => `₹${priceFormatter.format(value || 0)}`;

  document.addEventListener('DOMContentLoaded', () => {
    if (!Array.isArray(window.products)) {
      renderNotFound();
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));
    const product = window.products.find((item) => Number(item.id) === productId);

    if (!product) {
      renderNotFound();
      return;
    }

    populateProduct(product);
    renderRelatedProducts(product);
  });

  function renderNotFound() {
    const container = document.getElementById('singleProductContainer');
    if (!container) return;
    container.innerHTML = `
      <section class="section-wrapper">
        <div class="form-card" data-aos="fade-up">
          <h2>Product not found</h2>
          <p>We couldn’t find the product you are looking for. Please explore our <a href="shopus3.html">Shop All</a> page.</p>
        </div>
      </section>
    `;
  }

  function populateProduct(product) {
    const image = document.getElementById('productImage');
    const title = document.getElementById('productTitle');
    const description = document.getElementById('productDescription');
    const category = document.getElementById('productCategory');
    const categoryRow = document.getElementById('productCategoryRow');
    const ingredients = document.getElementById('productIngredients');
    const weightsRow = document.getElementById('productWeights');
    const weightSelect = document.getElementById('weightSelect');
    const quantityInput = document.getElementById('quantityInput');
    const priceDisplay = document.getElementById('singlePriceDisplay');
    const addButton = document.getElementById('addToCartBtn');

    if (image) image.src = product.image;
    if (image) image.alt = product.name;
    if (title) title.textContent = product.name;
    if (description) description.textContent = product.description || '';
    if (category) category.textContent = product.category;
    if (categoryRow) categoryRow.textContent = product.category;
    if (ingredients) ingredients.textContent = product.ingredients || 'Secret family recipe';
    if (weightsRow) weightsRow.textContent = getWeightKeys(product).join(', ');

    const weightOptions = getWeightKeys(product);
    if (weightSelect) {
      weightSelect.innerHTML = weightOptions
        .map(
          (label) => `<option value="${label}">${label.replace('g', ' g')} - ${formatCurrency(product.weights[label])}</option>`
        )
        .join('');
    }

    const updatePrice = () => {
      const weight = weightSelect?.value || weightOptions[0];
      const qty = Math.max(1, Number(quantityInput?.value) || 1);
      const unitPrice = product.weights?.[weight] || 0;
      if (priceDisplay) {
        priceDisplay.textContent = `${formatCurrency(unitPrice)} × ${qty} = ${formatCurrency(unitPrice * qty)}`;
      }
    };

    weightSelect?.addEventListener('change', updatePrice);

    document.querySelectorAll('.qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const current = Number(quantityInput.value) || 1;
        quantityInput.value = action === 'plus' ? current + 1 : Math.max(1, current - 1);
        updatePrice();
      });
    });

    quantityInput?.addEventListener('input', updatePrice);
    updatePrice();

    addButton?.addEventListener('click', () => {
      const weight = weightSelect?.value || weightOptions[0];
      const qty = Math.max(1, Number(quantityInput?.value) || 1);
      if (typeof window.addToCart === 'function') {
        window.addToCart(product.id, weight, qty);
      }
    });
  }

  function renderRelatedProducts(product) {
    const container = document.getElementById('relatedProducts');
    const emptyState = document.getElementById('relatedEmpty');
    if (!container) return;

    const related = window.products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);

    if (!related.length) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';

    related.forEach((item, index) => {
      container.appendChild(createRelatedCard(item, index));
    });
  }

  function createRelatedCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.aos = index % 2 === 0 ? 'fade-up' : 'fade-down';

    const range = getPriceRange(product);
    const weights = getWeightKeys(product);
    const defaultWeight = weights[0];

    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-overlay">
          <h5>${product.name}</h5>
          <p class="price-range">${formatCurrency(range.min)} - ${formatCurrency(range.max)}</p>
        </div>
      </div>
      <div class="product-info">
        <div>
          <h4>${product.name}</h4>
          <p class="price-range">${formatCurrency(range.min)} - ${formatCurrency(range.max)}</p>
        </div>
        <button class="btn-pill btn-primary-pill select-options-btn">Select Options</button>
      </div>
      <div class="options-panel">
        <div class="form-group">
          <label>Choose Weight</label>
          <select class="weight-select">
            ${weights
              .map(
                (label) => `<option value="${label}" ${label === defaultWeight ? 'selected' : ''}>
                  ${label.replace('g', ' g')} - ${formatCurrency(product.weights[label])}
                </option>`
              )
              .join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Quantity</label>
          <div class="quantity-control">
            <button type="button" class="qty-btn" data-action="minus">-</button>
            <input type="number" min="1" value="1" class="qty-input">
            <button type="button" class="qty-btn" data-action="plus">+</button>
          </div>
        </div>
        <div class="price-display">${formatCurrency(product.weights[defaultWeight])} (per ${defaultWeight})</div>
        <button class="btn-pill btn-primary-pill add-cart-btn">
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        </button>
      </div>
    `;

    const weightSelect = card.querySelector('.weight-select');
    const qtyInput = card.querySelector('.qty-input');
    const priceDisplay = card.querySelector('.price-display');
    const selectBtn = card.querySelector('.select-options-btn');
    const addBtn = card.querySelector('.add-cart-btn');
    const qtyButtons = card.querySelectorAll('.qty-btn');

    const updatePrice = () => {
      const weight = weightSelect.value;
      const qty = Math.max(1, Number(qtyInput.value) || 1);
      const unitPrice = product.weights[weight] || 0;
      priceDisplay.textContent = `${formatCurrency(unitPrice)} × ${qty} = ${formatCurrency(unitPrice * qty)}`;
    };

    selectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('options-open');
      updatePrice();
    });

    weightSelect.addEventListener('change', updatePrice);
    qtyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dir = btn.dataset.action;
        const current = Number(qtyInput.value) || 1;
        qtyInput.value = dir === 'plus' ? current + 1 : Math.max(1, current - 1);
        updatePrice();
      });
    });
    qtyInput.addEventListener('input', updatePrice);
    updatePrice();

    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const weight = weightSelect.value;
      const qty = Math.max(1, Number(qtyInput.value) || 1);
      if (typeof window.addToCart === 'function') {
        try {
          window.addToCart(product.id, weight, qty);
          
          // Auto-close the options panel after successful add to cart
          card.classList.remove('options-open');
          
          // Reset the button state
          selectBtn.textContent = 'Select Options';
          selectBtn.classList.remove('btn-ghost-pill');
          selectBtn.classList.add('btn-primary-pill');
          selectBtn.setAttribute('aria-expanded', 'false');
        } catch (error) {
          // In case of an error during add to cart, keep the panel open
          console.error('Error adding product to cart:', error);
          // Optionally show an error message to the user
        }
      }
    });    card.addEventListener('click', (e) => {
      const interactive =
        e.target.closest('.options-panel') ||
        e.target.closest('.select-options-btn') ||
        e.target.closest('.add-cart-btn') ||
        e.target.closest('.weight-select') ||
        e.target.closest('.quantity-control');
      if (!interactive) {
        window.location.href = `product-single.html?id=${product.id}`;
      }
    });

    return card;
  }

  function getWeightKeys(product) {
    if (!product.weights) return [];
    const keys = Object.keys(product.weights);
    const ordered = weightOrder.filter((label) => keys.includes(label));
    const remaining = keys.filter((key) => !weightOrder.includes(key));
    return [...ordered, ...remaining];
  }

  function getPriceRange(product) {
    const weights = getWeightKeys(product);
    if (!weights.length) return { min: 0, max: 0 };
    const values = weights.map((label) => Number(product.weights[label]) || 0);
    return { min: Math.min(...values), max: Math.max(...values) };
  }
})();

