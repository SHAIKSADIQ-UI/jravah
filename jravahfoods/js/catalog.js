(() => {
  if (typeof window === 'undefined') return;

  const weightPreference = ['250g', '500g', '1kg'];
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formatCurrency = (value) => `₹${currencyFormatter.format(value || 0)}`;

  const getWeightKeys = (product) => {
    if (!product.weights) return [];
    const keys = Object.keys(product.weights);
    const ordered = weightPreference.filter((label) => keys.includes(label));
    const remaining = keys.filter((key) => !weightPreference.includes(key));
    return [...ordered, ...remaining];
  };

  const deriveTag = (name = '') => {
    const cleaned = name.trim();
    if (!cleaned) return 'Other';
    const firstWord = cleaned.split(' ')[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
  };

  const getPriceRange = (product) => {
    const weights = getWeightKeys(product);
    if (!weights.length) return { min: 0, max: 0 };
    const values = weights.map((label) => Number(product.weights[label]) || 0);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  class ProductGrid {
    constructor(root) {
      this.root = root;
      this.grid = root.querySelector('[data-role="grid"]');
      this.emptyState = root.querySelector('[data-role="empty"]');
      this.searchInput = root.querySelector('[data-role="search"]');
      this.typeSelect = root.querySelector('[data-role="type-filter"]');
      this.priceSelect = root.querySelector('[data-role="price-filter"]');
      this.sortSelect = root.querySelector('[data-role="sort"]');
      this.resetButton = root.querySelector('[data-role="reset"]');
      this.mobileToggle = root.querySelector('[data-role="mobile-filter-toggle"]');
      this.drawer = root.querySelector('[data-role="filter-drawer"]');
      this.drawerClose = root.querySelector('[data-role="drawer-close"]');
      this.activeCard = null;

      this.categories = (root.dataset.category || root.dataset.categories || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      this.limit = Number(root.dataset.limit) || null;
      this.products = this.getBaseProducts();

      // Home page featured grid: restrict to selected hero products only
      if (root.dataset.featured === 'home') {
        const allowedNames = [
          'tomato pickle',
          'bellam sunundalu',
          'chakralu',
          'chicken gongura pickle',
          'spicy boondi',
          'biryani masala',
          'mutton boneless',
          'ginger garlic paste',
          'gavvalu',
          'prawns pickle',
        ];
        this.products = this.products.filter((product) => {
          const name = (product.name || '').toLowerCase();
          return allowedNames.includes(name);
        });
      }
      this.currentProducts = this.products.slice();

      this.populateTypeFilter();
      this.bindEvents();
      this.registerOutsideClickHandler();
      this.render();
    }

    getBaseProducts() {
      if (!Array.isArray(window.products)) return [];
      if (!this.categories.length || this.categories.includes('All')) {
        return window.products.slice();
      }
      return window.products.filter((product) =>
        this.categories.some(
          (category) => product.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }

    populateTypeFilter() {
      if (!this.typeSelect) return;
      const tags = new Set();
      this.products.forEach((product) => tags.add(deriveTag(product.name)));
      const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));

      this.typeSelect.innerHTML = `<option value="all">All Types</option>`;
      sortedTags.slice(0, 20).forEach((tag) => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        this.typeSelect.appendChild(option);
      });
    }

    bindEvents() {
      if (this.searchInput) {
        this.searchInput.addEventListener('input', () => this.updateGrid());
      }

      if (this.typeSelect) {
        this.typeSelect.addEventListener('change', () => this.updateGrid());
      }

      if (this.priceSelect) {
        this.priceSelect.addEventListener('change', () => this.updateGrid());
      }

      if (this.sortSelect) {
        this.sortSelect.addEventListener('change', () => this.updateGrid());
      }

      if (this.resetButton) {
        this.resetButton.addEventListener('click', () => this.resetFilters());
      }

      if (this.mobileToggle && this.drawer) {
        this.mobileToggle.addEventListener('click', () => this.drawer.classList.add('open'));
      }

      if (this.drawerClose && this.drawer) {
        this.drawerClose.addEventListener('click', () => this.drawer.classList.remove('open'));
      }
    }

    registerOutsideClickHandler() {
      document.addEventListener('click', (event) => {
        if (!this.activeCard) return;
        const clickedInsideActive = this.activeCard.contains(event.target);
        if (!clickedInsideActive) {
          this.activeCard.classList.remove('options-open');
          // Reset the button state
          const button = this.activeCard.querySelector('.select-options-btn');
          if (button) {
            button.textContent = 'Select Options';
            button.classList.remove('btn-ghost-pill');
            button.classList.add('btn-primary-pill');
            button.setAttribute('aria-expanded', 'false');
          }
          this.activeCard = null;
        }
      });
    }

    resetFilters() {
      if (this.searchInput) this.searchInput.value = '';
      if (this.typeSelect) this.typeSelect.value = 'all';
      if (this.priceSelect) this.priceSelect.value = 'all';
      if (this.sortSelect) this.sortSelect.value = 'default';
      if (this.drawer) this.drawer.classList.remove('open');
      this.updateGrid();
    }

    updateGrid() {
      this.applyFilters();
      this.render();
      if (this.drawer) this.drawer.classList.remove('open');
    }

    applyFilters() {
      const searchTerm = (this.searchInput?.value || '').toLowerCase().trim();
      const selectedTag = this.typeSelect?.value || 'all';
      const priceFilter = this.priceSelect?.value || 'all';
      const sortValue = this.sortSelect?.value || 'default';

      let filtered = this.products.slice();

      if (searchTerm) {
        filtered = filtered.filter((product) => {
          const haystack = `${product.name} ${product.description || ''}`.toLowerCase();
          return haystack.includes(searchTerm);
        });
      }

      if (selectedTag !== 'all') {
        filtered = filtered.filter((product) => deriveTag(product.name) === selectedTag);
      }

      if (priceFilter !== 'all') {
        filtered = filtered.filter((product) => {
          const range = getPriceRange(product);
          if (priceFilter === 'under-200') return range.min < 200;
          if (priceFilter === '200-400') return range.min >= 200 && range.min <= 400;
          if (priceFilter === '400-600') return range.min > 400 && range.min <= 600;
          if (priceFilter === 'above-600') return range.min > 600;
          return true;
        });
      }

      if (sortValue === 'price-asc') {
        filtered.sort((a, b) => getPriceRange(a).min - getPriceRange(b).min);
      } else if (sortValue === 'price-desc') {
        filtered.sort((a, b) => getPriceRange(b).min - getPriceRange(a).min);
      }

      if (this.limit) {
        filtered = filtered.slice(0, this.limit);
      }

      this.currentProducts = filtered;
    }

    render() {
      if (!this.grid) return;
      this.grid.innerHTML = '';

      if (!this.currentProducts.length) {
        if (this.emptyState) this.emptyState.style.display = 'block';
        return;
      }
      if (this.emptyState) this.emptyState.style.display = 'none';

      this.currentProducts.forEach((product, index) => {
        const card = this.createCard(product, index);
        this.grid.appendChild(card);
      });

      if (window.AOS && typeof window.AOS.refreshHard === 'function') {
        window.AOS.refreshHard();
      } else if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
      }
    }

    createCard(product, index) {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.productId = product.id;
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
            <i class="fa fa-shopping-cart"></i>
            Add to Cart
          </button>
        </div>
      `;

      const selectButton = card.querySelector('.select-options-btn');
      const weightSelect = card.querySelector('.weight-select');
      const qtyInput = card.querySelector('.qty-input');
      const qtyButtons = card.querySelectorAll('.qty-btn');
      const priceDisplay = card.querySelector('.price-display');
      const addCartBtn = card.querySelector('.add-cart-btn');

      const updatePriceDisplay = () => {
        const weight = weightSelect.value;
        const unitPrice = Number(product.weights[weight]) || 0;
        const qty = Math.max(1, Number(qtyInput.value) || 1);
        const total = unitPrice * qty;
        priceDisplay.textContent = `${formatCurrency(unitPrice)} × ${qty} = ${formatCurrency(total)}`;
        priceDisplay.dataset.unitPrice = unitPrice;
      };

      selectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isCurrentlyOpen = card.classList.contains('options-open');
        
        if (this.activeCard && this.activeCard !== card) {
          this.activeCard.classList.remove('options-open');
          // Reset the previous card's button
          const prevButton = this.activeCard.querySelector('.select-options-btn');
          if (prevButton) {
            prevButton.textContent = 'Select Options';
            prevButton.classList.remove('btn-ghost-pill');
            prevButton.classList.add('btn-primary-pill');
            prevButton.setAttribute('aria-expanded', 'false');
          }
        }
        
        card.classList.toggle('options-open');
        this.activeCard = card.classList.contains('options-open') ? card : null;
        
        // Update button state
        if (card.classList.contains('options-open')) {
          selectButton.textContent = 'Back';
          selectButton.classList.remove('btn-primary-pill');
          selectButton.classList.add('btn-ghost-pill');
          selectButton.setAttribute('aria-expanded', 'true');
        } else {
          selectButton.textContent = 'Select Options';
          selectButton.classList.remove('btn-ghost-pill');
          selectButton.classList.add('btn-primary-pill');
          selectButton.setAttribute('aria-expanded', 'false');
        }
        
        if (!isCurrentlyOpen) {
          updatePriceDisplay();
        }
      });

      weightSelect.addEventListener('change', updatePriceDisplay);

      qtyButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = button.dataset.action;
          const current = Number(qtyInput.value) || 1;
          qtyInput.value = action === 'plus' ? current + 1 : Math.max(1, current - 1);
          updatePriceDisplay();
        });
      });

      qtyInput.addEventListener('input', updatePriceDisplay);

      addCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedWeight = weightSelect.value;
        const quantity = Math.max(1, Number(qtyInput.value) || 1);
        if (typeof window.addToCart === 'function') {
          try {
            window.addToCart(product.id, selectedWeight, quantity);
            
            // Auto-close the options panel after successful add to cart
            card.classList.remove('options-open');
            
            // Reset the button state
            selectButton.textContent = 'Select Options';
            selectButton.classList.remove('btn-ghost-pill');
            selectButton.classList.add('btn-primary-pill');
            selectButton.setAttribute('aria-expanded', 'false');
            
            // Clear active card reference if it points to this card
            if (this.activeCard === card) {
              this.activeCard = null;
            }
          } catch (error) {
            // In case of an error during add to cart, keep the panel open
            console.error('Error adding product to cart:', error);
            // Optionally show an error message to the user
          }
        }
      });
      card.addEventListener('click', (e) => {
        const isInteractive =
          e.target.closest('.options-panel') ||
          e.target.closest('.select-options-btn') ||
          e.target.closest('.add-cart-btn') ||
          e.target.closest('.weight-select') ||
          e.target.closest('.quantity-control');
        if (isInteractive) return;
        window.location.href = `product-single.html?id=${product.id}`;
      });

      updatePriceDisplay();
      return card;
    }
  }

  function initProductGrids() {
    if (!Array.isArray(window.products)) {
      console.warn('Product data is not available.');
      return;
    }

    document.querySelectorAll('[data-product-grid]').forEach((grid) => {
      if (!grid.__jravahGridInstance) {
        grid.__jravahGridInstance = new ProductGrid(grid);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initProductGrids);
})();

