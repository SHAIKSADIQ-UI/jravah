const CART_STORAGE_KEY = 'jravahCart';
let cartState = [];
let toastTimer;

function safeJsonParse(value, fallback = []) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.warn('Unable to parse cart data', err);
    return fallback;
  }
}

function loadCartFromStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    cartState = [];
    return [];
  }
  const stored = safeJsonParse(localStorage.getItem(CART_STORAGE_KEY), []);
  cartState = stored.slice();
  return stored.map((item) => ({ ...item }));
}

function saveCartToStorage(cartItems) {
  if (typeof window === 'undefined' || !window.localStorage) {
    cartState = cartItems.slice();
    return;
  }
  cartState = cartItems.slice();
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
}

function getCartCount() {
  return cartState.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function showToast(message, type = 'default') {
  let toast = document.querySelector('.toast-banner');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-banner';
    document.body.appendChild(toast);
  }
  
  // Remove any existing type classes
  toast.classList.remove('toast-add', 'toast-remove');
  
  // Add the appropriate class based on type
  if (type === 'add') {
    toast.classList.add('toast-add');
  } else if (type === 'remove') {
    toast.classList.add('toast-remove');
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 1000);
}

function findProductById(productId) {
  if (!Array.isArray(window.products)) {
    return null;
  }
  return window.products.find((item) => Number(item.id) === Number(productId));
}

function normalizeWeight(weight) {
  if (!weight) return '1kg';
  return weight.toString().endsWith('g') ? weight.toString() : `${weight}g`;
}

function addToCart(productId, weightLabel = '1kg', quantity = 1) {
  const product = findProductById(productId);
  if (!product) {
    console.warn('Product not found for cart', productId);
    return;
  }

  const normalizedWeight = normalizeWeight(weightLabel);
  const pricePerUnit = product.weights?.[normalizedWeight];
  if (!pricePerUnit) {
    console.warn('Weight not available for product', productId, normalizedWeight);
    return;
  }

  const qty = Math.max(1, Number(quantity) || 1);
  const cartItems = loadCartFromStorage();
  const existing = cartItems.find(
    (item) => item.productId === product.id && item.weight === normalizedWeight
  );

  if (existing) {
    existing.quantity += qty;
  } else {
    cartItems.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      weight: normalizedWeight,
      price: pricePerUnit,
      quantity: qty,
    });
  }

  saveCartToStorage(cartItems);
  updateCartBadge();
  showToast(`Added ${product.name} ${normalizedWeight} to cart!`, 'add');
}

function getCartItems() {
  if (!cartState.length) {
    loadCartFromStorage();
  }
  return cartState.map((item) => ({ ...item }));
}

function updateCartItemQuantity(productId, weightLabel, quantity) {
  const normalizedWeight = normalizeWeight(weightLabel);
  const cartItems = loadCartFromStorage();
  const target = cartItems.find(
    (item) => item.productId === Number(productId) && item.weight === normalizedWeight
  );

  if (!target) return;

  const newQty = Number(quantity);
  if (Number.isNaN(newQty) || newQty <= 0) {
    const filtered = cartItems.filter((item) => item !== target);
    saveCartToStorage(filtered);
  } else {
    target.quantity = newQty;
    saveCartToStorage(cartItems);
  }

  updateCartBadge();
}

function removeCartItem(productId, weightLabel) {
  const normalizedWeight = normalizeWeight(weightLabel);
  const filtered = loadCartFromStorage().filter(
    (item) => !(item.productId === Number(productId) && item.weight === normalizedWeight)
  );
  saveCartToStorage(filtered);
  updateCartBadge();
}

function clearCart() {
  saveCartToStorage([]);
  updateCartBadge();
}

function getCartTotals() {
  const subtotal = cartState.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    subtotal,
    itemCount: getCartCount(),
  };
}

function initCart() {
  loadCartFromStorage();
  updateCartBadge();
  window.addEventListener('storage', () => {
    loadCartFromStorage();
    updateCartBadge();
  });
  initCartSidebar();
}

// Cart Sidebar Functions
function openCartSidebar() {
  const overlay = document.querySelector('.cart-sidebar-overlay');
  const sidebar = document.querySelector('.cart-sidebar');
  
  if (overlay && sidebar) {
    overlay.classList.add('open');
    sidebar.classList.add('open');
    document.body.classList.add('cart-sidebar-open');
    renderCartSidebar();
    
    // Focus on close button for accessibility
    setTimeout(() => {
      const closeBtn = sidebar.querySelector('.cart-sidebar-close');
      if (closeBtn) closeBtn.focus();
    }, 300);
  }
}

function closeCartSidebar() {
  const overlay = document.querySelector('.cart-sidebar-overlay');
  const sidebar = document.querySelector('.cart-sidebar');
  
  if (overlay && sidebar) {
    overlay.classList.remove('open');
    sidebar.classList.remove('open');
    document.body.classList.remove('cart-sidebar-open');
  }
}

function toggleCartSidebar() {
  const sidebar = document.querySelector('.cart-sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    closeCartSidebar();
  } else {
    openCartSidebar();
  }
}

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

function renderCartSidebar() {
  const itemsContainer = document.querySelector('.cart-items-area');
  const subtotalEl = document.getElementById('cartSidebarSubtotal');
  
  if (!itemsContainer) return;
  
  const items = getCartItems();
  const totals = getCartTotals();
  
  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-cart-shopping"></i>
        <h4>Your cart is empty</h4>
        <p>Add some delicious products to get started!</p>
        <button class="btn-pill btn-primary-pill" onclick="window.closeCartSidebar(); window.location.href='shopus3.html'">
          Continue Shopping
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
    return;
  }
  
  // Desktop table view
  const tableHTML = `
    <div class="cart-table-container">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => {
            const subtotal = (item.price || 0) * (item.quantity || 0);
            return `
              <tr data-id="${item.productId}" data-weight="${item.weight}">
                <td>
                  <div class="cart-product-cell">
                    <img src="${item.image}" alt="${item.name}" class="cart-product-image" loading="lazy" onerror="this.src='images/JRavahlogo.png'" />
                    <div class="cart-product-info">
                      <h4 class="cart-product-name">${item.name}</h4>
                      <p class="cart-product-weight">${item.weight}</p>
                    </div>
                  </div>
                </td>
                <td class="cart-price-cell">${formatCurrency(item.price)}</td>
                <td class="cart-quantity-cell">
                  <div class="cart-quantity-control">
                    <button type="button" class="qty-btn" data-action="minus" aria-label="Decrease quantity">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <input type="number" min="1" value="${item.quantity}" class="qty-input" aria-label="Quantity" />
                    <button type="button" class="qty-btn" data-action="plus" aria-label="Increase quantity">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td class="cart-subtotal-cell">
                  ${formatCurrency(subtotal)}
                  <button class="cart-remove-btn" aria-label="Remove ${item.name}">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Mobile card view
  const mobileHTML = `
    <div class="cart-mobile-view">
      ${items.map(item => {
        const subtotal = (item.price || 0) * (item.quantity || 0);
        return `
          <div class="cart-mobile-item" data-id="${item.productId}" data-weight="${item.weight}">
            <button class="cart-mobile-remove remove-item" aria-label="Remove ${item.name}">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="cart-mobile-header">
              <img src="${item.image}" alt="${item.name}" class="cart-mobile-image" loading="lazy" onerror="this.src='images/JRavahlogo.png'" />
              <div class="cart-mobile-info">
                <h4 class="cart-mobile-name">${item.name}</h4>
                <p class="cart-mobile-weight">${item.weight}</p>
              </div>
            </div>
            <div class="cart-mobile-details">
              <div class="cart-mobile-price">
                <span class="cart-mobile-price-label">Price</span>
                <span class="cart-mobile-price-value">${formatCurrency(item.price)}</span>
              </div>
              <div class="cart-quantity-cell">
                <div class="cart-quantity-control">
                  <button type="button" class="qty-btn" data-action="minus" aria-label="Decrease quantity">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <input type="number" min="1" value="${item.quantity}" class="qty-input" aria-label="Quantity" />
                  <button type="button" class="qty-btn" data-action="plus" aria-label="Increase quantity">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="cart-mobile-subtotal">
                <span class="cart-mobile-price-label">Subtotal</span>
                <span class="cart-mobile-subtotal-value">${formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  itemsContainer.innerHTML = tableHTML + mobileHTML;
  
  // Attach event listeners
  itemsContainer.querySelectorAll('.qty-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = btn.closest('[data-id]');
      const productId = Number(row.dataset.id);
      const weight = row.dataset.weight;
      const input = row.querySelector('.qty-input');
      const current = Number(input.value) || 1;
      const newValue = btn.dataset.action === 'plus' ? current + 1 : Math.max(1, current - 1);
      input.value = newValue;
      window.updateCartSidebarQuantity(productId, weight, newValue);
    });
  });
  
  itemsContainer.querySelectorAll('.qty-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      e.stopPropagation();
      const value = Math.max(1, Number(input.value) || 1);
      input.value = value;
      const row = input.closest('[data-id]');
      window.updateCartSidebarQuantity(Number(row.dataset.id), row.dataset.weight, value);
    });
  });
  
  itemsContainer.querySelectorAll('.cart-remove-btn, .cart-mobile-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = btn.closest('[data-id]');
      // Show toast notification
      showToast('Item removed from cart', 'remove');
      window.removeFromCartSidebar(Number(row.dataset.id), row.dataset.weight);
    });
  });
  
  if (subtotalEl) {
    subtotalEl.textContent = formatCurrency(totals.subtotal);
  }
}

function updateCartSidebarQuantity(productId, weight, newQuantity) {
  const qty = Math.max(1, Number(newQuantity) || 1);
  updateCartItemQuantity(productId, weight, qty);
  renderCartSidebar();
}

function removeFromCartSidebar(productId, weight) {
  removeCartItem(productId, weight);
  renderCartSidebar();
}

function checkoutViaWhatsApp() {
  const items = getCartItems();
  if (!items.length) {
    alert('Your cart is empty. Please add some products before checking out.');
    return;
  }

  const totals = getCartTotals();
  const lines = items.map((item, index) => {
    const lineTotal = (item.price || 0) * (item.quantity || 0);
    const formattedTotal = Number(lineTotal || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    });
    return `${index + 1}. ${item.name} - ${item.weight} x ${item.quantity} = ₹${formattedTotal}`;
  });

  const subtotalFormatted = Number(totals.subtotal || 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  });

  const messageLines = [
    'Hello JRavah Foods,',
    '',
    'I\'d like to place an order with the following items:',
    ...lines,
    '',
    `Total Amount: ₹${subtotalFormatted}`,
    '',
    'Please confirm product availability, shipping charges, and payment options.',
  ];

  const whatsappText = encodeURIComponent(messageLines.join('\n'));
  const whatsappUrl = `https://wa.me/918522084422?text=${whatsappText}`;
  window.open(whatsappUrl, '_blank');
}

function initCartSidebar() {
  // Create cart sidebar HTML if it doesn't exist
  if (!document.querySelector('.cart-sidebar-overlay')) {
    const sidebarHTML = `
      <div class="cart-sidebar-overlay" onclick="window.closeCartSidebar()"></div>
      <aside class="cart-sidebar" role="dialog" aria-label="Shopping cart">
        <div class="cart-sidebar-header">
          <h3>Your Cart</h3>
          <button class="cart-sidebar-close" onclick="window.closeCartSidebar()" aria-label="Close cart">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="cart-sidebar-body">
          <div class="cart-items-area"></div>
        </div>
        <div class="cart-sidebar-footer">
          <div class="cart-sidebar-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <strong id="cartSidebarSubtotal">₹0</strong>
            </div>
            <small>Shipping calculated at checkout. Free shipping above ₹1000 for AP & Telangana.</small>
            <p class="whatsapp-hint">Tap "Order on WhatsApp" to share your cart with our team instantly.</p>
          </div>
          <div class="cart-sidebar-actions">
            <button class="btn-pill btn-ghost-pill" onclick="window.closeCartSidebar()">
              Continue Shopping
            </button>
            <button class="btn-pill btn-primary-pill" onclick="window.checkoutViaWhatsApp()">
              <i class="fa-brands fa-whatsapp"></i>
              Order on WhatsApp
            </button>
          </div>
        </div>
      </aside>
    `;
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);
  }
  
  // Bind cart icon clicks to open sidebar
  document.querySelectorAll('.cart-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartSidebar();
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.cart-sidebar.open')) {
      closeCartSidebar();
    }
  });
}

document.addEventListener('DOMContentLoaded', initCart);

window.jravahCart = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  getCartTotals,
};

// Expose cart sidebar functions to window
window.openCartSidebar = openCartSidebar;
window.closeCartSidebar = closeCartSidebar;
window.toggleCartSidebar = toggleCartSidebar;
window.updateCartSidebarQuantity = updateCartSidebarQuantity;
window.removeFromCartSidebar = removeFromCartSidebar;
window.checkoutViaWhatsApp = checkoutViaWhatsApp;
window.addToCart = addToCart;
