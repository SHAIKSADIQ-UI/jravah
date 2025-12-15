# Cart Table Structure Design

## Overview

Transform the shopping cart display from a card-based layout to a structured table format with small icon-sized product images, enabling clear presentation of product information, pricing, quantities, and totals.

## Objectives

- Display cart items in a clean, tabular structure
- Reduce product images to small icon size for compact display
- Show price per unit based on selected quantity/weight
- Enable quantity modification directly within the table
- Calculate and display individual item subtotals
- Show total amount for all selected items
- Maintain existing action buttons for cart management

## Design Scope

This design applies to the cart view page (viewcart.html) where users review their selections before ordering through WhatsApp.

## User Interface Structure

### Cart Table Layout

The cart display will be reorganized into a table structure with the following components:

#### Table Columns

| Column | Purpose | Content Description |
|--------|---------|-------------------|
| Product | Visual identification | Small icon-sized product image with product name |
| Price | Unit pricing | Price per selected weight/quantity variant |
| Quantity | User control | Adjustable quantity selector with plus/minus controls |
| Subtotal | Line item total | Calculated amount for that product line (Price × Quantity) |

#### Image Specifications

- **Size**: Small icon format (approximately 60px × 60px)
- **Style**: Rounded or square thumbnail
- **Position**: Left-aligned within Product column
- **Fallback**: Product name initials or placeholder icon if image unavailable

#### Product Information Display

- **Primary**: Product name displayed alongside or below the thumbnail
- **Secondary**: Weight/variant information (e.g., "500g", "1kg")
- **Layout**: Image and text arranged horizontally for compact presentation

### Quantity Control Component

The quantity selector will provide:

- **Decrease button**: Minus symbol to reduce quantity (minimum: 1)
- **Quantity display**: Numeric input field showing current quantity
- **Increase button**: Plus symbol to add more units
- **Direct input**: Allow manual quantity entry with validation
- **Behavior**: Real-time subtotal and total recalculation on change

### Pricing Display

#### Unit Price Column

- Display the price for the selected product variant (weight/size)
- Format: Currency symbol (₹) followed by numeric value
- Source: Derived from product weights pricing configuration

#### Subtotal Column

- Calculate: Unit Price × Quantity
- Format: Currency symbol (₹) followed by calculated amount
- Update: Automatically recalculate when quantity changes
- Alignment: Right-aligned for easy scanning

### Total Calculation Section

Below the product table, display comprehensive order summary:

#### Summary Row

- **Label**: "Total Amount" or "Cart Total"
- **Calculation**: Sum of all item subtotals
- **Format**: Prominent display with larger font and bold styling
- **Currency**: ₹ (Indian Rupee)
- **Precision**: Two decimal places for accuracy

#### Summary Information

- Display total item count (e.g., "5 items in cart")
- Show subtotal before any shipping or taxes
- Include informational text about shipping calculation

### Action Buttons Section

Positioned below the total calculation section:

#### Button Group

| Button | Purpose | Style |
|--------|---------|-------|
| Continue Shopping | Return to product catalog | Secondary/Ghost style button |
| Clear Cart | Remove all items from cart | Destructive/Warning style button |
| Order through WhatsApp | Proceed with order via WhatsApp | Primary/Prominent style button |

#### Button Behaviors

**Continue Shopping**
- Action: Navigate user back to shop page (shopus3.html)
- No cart modification

**Clear Cart**
- Action: Remove all items from shopping cart
- Confirmation: Display confirmation dialog before clearing
- Post-action: Show empty cart state message

**Order through WhatsApp**
- Action: Generate formatted order message
- Integration: Open WhatsApp with pre-filled message
- Message contents: Product list, quantities, prices, and total amount

## Data Flow

### Cart Data Structure

Each cart item contains:

```
{
  productId: Unique product identifier
  name: Product name
  image: Image URL/path
  weight: Selected weight variant (e.g., "500g", "1kg")
  price: Unit price for selected weight
  quantity: Number of units selected
}
```

### Calculation Logic

#### Item Subtotal Calculation

For each cart item:
- Subtotal = price × quantity
- Format result to 2 decimal places
- Display with currency symbol

#### Cart Total Calculation

- Iterate through all cart items
- Sum all individual subtotals
- Format final total with currency symbol and proper localization

### Dynamic Updates

When quantity changes:
1. Update quantity value in cart data
2. Recalculate affected item subtotal
3. Recalculate cart total
4. Update displayed values in UI
5. Persist changes to cart storage

## Responsive Behavior

### Desktop View

- Full table display with all columns visible
- Adequate spacing between columns
- Icon-sized images (60px × 60px)
- Horizontal layout for quantity controls

### Tablet View

- Maintain table structure
- Slightly reduced spacing
- Images remain icon-sized
- Responsive column widths

### Mobile View

- Transform table to card-based rows
- Stack information vertically within each card
- Icon image positioned at top-left of each card
- Product name and weight below or beside image
- Quantity controls in horizontal arrangement
- Price and subtotal on separate lines
- Maintain clear visual separation between items

## Visual Design Specifications

### Table Styling

- **Header Row**: Bold text, subtle background color, bottom border
- **Data Rows**: Alternating row background (zebra striping) for readability
- **Borders**: Subtle borders between rows
- **Padding**: Adequate cell padding for comfortable reading
- **Alignment**: 
  - Product: Left-aligned
  - Price: Right-aligned
  - Quantity: Center-aligned
  - Subtotal: Right-aligned

### Image Styling

- **Dimensions**: 60px × 60px (maximum)
- **Border radius**: 8px for rounded corners
- **Background**: Light background if image has transparency
- **Object fit**: Cover or contain to maintain aspect ratio
- **Loading**: Lazy loading for performance

### Typography

- **Product name**: Medium weight, readable size (14-16px)
- **Weight variant**: Smaller, lighter text (12px)
- **Prices**: Bold or semi-bold for emphasis
- **Total**: Larger size (18-20px), bold weight

### Color Scheme

- Align with existing JRavah Foods brand colors
- Use accent color for primary action button
- Subtle grays for borders and backgrounds
- High contrast for text readability

## Empty Cart State

When cart contains no items:

- Display centered message: "Your cart is empty"
- Provide descriptive subtext: "Add some products to get started"
- Show "Continue Shopping" button to redirect to shop
- Hide table structure and total calculation section

## Interaction States

### Hover States

- Table rows: Subtle background change on hover
- Buttons: Color/shadow change to indicate interactivity
- Quantity controls: Highlight on hover

### Loading States

- Show loading indicator while cart data loads
- Display "Loading your cart..." message
- Prevent interaction during load

### Error States

- Handle missing product images gracefully
- Display error message if cart load fails
- Provide retry mechanism

## WhatsApp Order Message Format

When user clicks "Order through WhatsApp", generate message containing:

```
Hello JRavah Foods,

I'd like to place an order with the following items:

1. [Product Name] - [Weight] x [Quantity] = ₹[Subtotal]
2. [Product Name] - [Weight] x [Quantity] = ₹[Subtotal]
...

Total Amount: ₹[Cart Total]

Please confirm product availability, shipping charges, and payment options.
```

## Accessibility Considerations

- **Table markup**: Use semantic table elements (table, thead, tbody, tr, th, td)
- **Alt text**: Provide descriptive alt text for product images
- **Button labels**: Clear, descriptive text for all buttons
- **Keyboard navigation**: Ensure all controls are keyboard accessible
- **Screen readers**: Proper ARIA labels for quantity controls
- **Focus indicators**: Visible focus states for interactive elements

## Technical Considerations

### Storage

- Cart data persists in browser localStorage
- Storage key: 'jravahCart'
- JSON format for cart array

### Performance

- Minimize DOM manipulations during quantity updates
- Debounce calculation updates if needed
- Optimize image loading with appropriate sizing

### Browser Compatibility

- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Mobile browser compatibility (iOS Safari, Chrome Mobile)

## Integration Points

### Existing Components

- **cart.js**: Cart management functions (add, update, remove, clear)
- **products.js**: Product data and pricing information
- **premium-style.css**: Styling framework and components

### Functions to Utilize

- `getCartItems()`: Retrieve all cart items
- `getCartTotals()`: Calculate subtotal and item count
- `updateCartItemQuantity()`: Modify item quantity
- `removeCartItem()`: Remove specific item
- `clearCart()`: Empty entire cart
- `formatCurrency()`: Format prices consistently

## Success Criteria

The cart table structure will be considered successful when:

1. Product images display as small icons (≤ 60px)
2. All four columns are clearly visible and labeled
3. Prices accurately reflect selected weight/variant
4. Quantity controls function smoothly with real-time updates
5. Item subtotals calculate correctly (price × quantity)
6. Total amount sums all item subtotals accurately
7. All three action buttons are positioned below total
8. WhatsApp integration generates correct order message
9. Responsive design works across all device sizes
10. Empty cart state displays appropriately

## Future Enhancements

Potential improvements for future iterations:

- Add product variant switching directly in cart
- Include remove/delete button per item in table
- Show savings or discounts if applicable
- Add estimated shipping calculator
- Include "Save for later" functionality
- Enable coupon code entry and application
- Show stock availability status
- Add "Recently removed" item restoration
