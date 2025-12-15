# Quick Reference Guide - JRavah UI Enhancements

## For Developers

### 1. Product Card Options Toggle

**How it works:**
- Clicking "Select Options" adds `.options-open` class to card
- CSS transitions `max-height` from 0 to 500px
- Button text and classes toggle between two states

**Key Classes:**
- `.options-open` - Applied to `.product-card` when expanded
- `.btn-primary-pill` - Orange gradient (collapsed state)
- `.btn-ghost-pill` - Outline style (expanded "Back" state)

**To customize:**
- Adjust `max-height` in CSS if content is taller than 500px
- Modify transition duration (currently 300ms)
- Change button text in `catalog.js` line ~327

---

### 2. Cart Sidebar

**How to open programmatically:**
```javascript
window.openCartSidebar();
```

**How to close:**
```javascript
window.closeCartSidebar();
```

**How to render cart:**
```javascript
// Cart updates automatically, but to force re-render:
renderCartSidebar(); // Internal function
```

**Key Functions:**
- `openCartSidebar()` - Shows sidebar
- `closeCartSidebar()` - Hides sidebar
- `renderCartSidebar()` - Updates cart display
- `updateCartSidebarQuantity(id, weight, qty)` - Changes item quantity
- `removeFromCartSidebar(id, weight)` - Removes item
- `checkoutViaWhatsApp()` - Opens WhatsApp with order

**Key Classes:**
- `.cart-sidebar-overlay` - Dark backdrop
- `.cart-sidebar` - Main sidebar container
- `.open` - Visible state (both overlay and sidebar)
- `.cart-item-row` - Individual cart item

**To customize:**
- Width: Change `width: 480px` in `.cart-sidebar` (line 1547)
- Colors: Uses CSS variables (no hardcoded colors)
- WhatsApp number: Update in `checkoutViaWhatsApp()` function

---

### 3. WhatsApp Button Position

**Desktop/Tablet (≥ 768px):**
```css
.whatsapp-fab {
  bottom: 20px;
  right: 20px;
}
```

**Mobile (< 768px):**
```css
.whatsapp-fab {
  bottom: 85px; /* Above bottom nav */
}
```

**To adjust:**
- Change mobile bottom offset in media query (line 1764)
- If bottom nav height changes, update accordingly

---

### 4. Video Section Styling

**Key Classes:**
- `.video-slider` - Slick carousel container
- `.slide` - Individual video card
- `.play-icon` - Play button overlay

**Hover Effects:**
- Card lifts: `translateY(-8px)`
- Play icon scales: `scale(1.1)`
- Shadow increases

**To customize:**
- Card radius: `border-radius: 16px` (line 1205)
- Hover lift distance: `translateY(-8px)` (line 1199)
- Play icon size: `width: 64px; height: 64px` (line 1219)

---

## Common Tasks

### Change Button Text
**File**: `catalog.js`  
**Line**: ~327-338
```javascript
selectButton.textContent = 'Back'; // Change this
// or
selectButton.textContent = 'Select Options'; // Change this
```

### Adjust Cart Sidebar Width
**File**: `premium-style.css`  
**Line**: 1547
```css
.cart-sidebar {
  width: 480px; /* Change this */
}
```

### Change Animation Speed
**Options Panel**:
```css
.options-panel {
  transition: max-height 0.3s ease-in-out; /* Change 0.3s */
}
```

**Cart Sidebar**:
```css
.cart-sidebar {
  transition: transform 0.3s ease-out; /* Change 0.3s */
}
```

### Update WhatsApp Number
**File**: `cart.js`  
**Line**: ~359
```javascript
const whatsappUrl = `https://wa.me/918522084422?text=${whatsappText}`;
// Change 918522084422 to your number
```

---

## Debugging Tips

### Product Options Not Expanding?
1. Check if `.options-open` class is being added:
   ```javascript
   console.log(card.classList.contains('options-open'));
   ```
2. Check CSS `max-height` value is sufficient
3. Verify no conflicting CSS overriding `max-height`

### Cart Sidebar Not Showing?
1. Check if HTML was injected:
   ```javascript
   console.log(document.querySelector('.cart-sidebar'));
   ```
2. Verify `.open` class is being added
3. Check z-index conflicts (should be 1001)
4. Look for console errors

### Button State Not Changing?
1. Check if classes are toggling:
   ```javascript
   console.log(selectButton.classList);
   ```
2. Verify both `.btn-primary-pill` and `.btn-ghost-pill` exist in CSS
3. Check for CSS specificity issues

### Cart Items Not Rendering?
1. Check cart data:
   ```javascript
   console.log(window.jravahCart.getCartItems());
   ```
2. Verify products array is loaded:
   ```javascript
   console.log(window.products);
   ```
3. Check for JavaScript errors in console

---

## CSS Variables Reference

```css
:root {
  --orange-primary: #E67E22;
  --orange-dark: #c76315;
  --golden-accent: #F5E1B3;
  --dark-brown: #4A2C1D;
  --cream-bg: #FAF6EE;
  --white: #FFFFFF;
  --light-pink: #FFF5F3;
  --whatsapp-green: #25D366;
  --text-muted: #7A5F51;
  --border-soft: #eadfcc;
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
  --transition: 0.3s ease-in-out;
}
```

To change theme colors, update these values.

---

## File Locations

```
public_html/
├── css/
│   └── premium-style.css    # All styling changes
├── js/
│   ├── catalog.js           # Product card logic
│   └── cart.js              # Cart sidebar & cart operations
├── JRavah.html              # Home page (video section)
├── Pickels.html             # Example category page
└── viewcart.html            # Full cart page (unchanged)
```

---

## Testing Commands (Browser Console)

```javascript
// Open cart sidebar
window.openCartSidebar();

// Close cart sidebar
window.closeCartSidebar();

// Add item to cart
window.addToCart(1, '500g', 2); // productId, weight, quantity

// Check cart contents
window.jravahCart.getCartItems();

// Check cart total
window.jravahCart.getCartTotals();

// Clear cart
window.jravahCart.clearCart();

// Update quantity
window.jravahCart.updateCartItemQuantity(1, '500g', 5);

// Remove item
window.jravahCart.removeCartItem(1, '500g');
```

---

## Browser DevTools Tips

**View Cart State:**
1. Open DevTools (F12)
2. Go to Application tab
3. Expand Local Storage
4. Click on your domain
5. Look for key: `jravahCart`

**Test Responsive Design:**
1. Open DevTools
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or custom width
4. Test: Mobile (< 768px), Tablet (768-991px), Desktop (≥ 992px)

**Check Element Classes:**
1. Right-click element
2. Choose "Inspect"
3. View class list in Elements panel
4. Toggle classes in Styles panel

---

## Performance Tips

- Cart sidebar HTML is injected once on page load
- CSS transitions use GPU-accelerated properties (transform, opacity)
- Cart data persists in localStorage (no server calls)
- Product options use CSS transitions (no JavaScript animation)

---

## Accessibility Features

- `aria-expanded` on option toggle buttons
- `aria-label` on cart close and remove buttons
- `role="dialog"` on cart sidebar
- Keyboard support: Tab, Enter, Escape
- Focus management in cart sidebar

---

## Need Help?

1. Check Implementation Summary: `IMPLEMENTATION_SUMMARY.md`
2. Review Design Document: `product-options-behavior.md`
3. Check browser console for errors
4. Test in incognito mode (rules out cache issues)
5. Verify all files are loaded (Network tab in DevTools)

---

**Last Updated**: December 6, 2025
