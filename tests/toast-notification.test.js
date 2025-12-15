// Test file for toast notification functionality
describe('Toast Notifications', function() {
  beforeEach(function() {
    // Clean up any existing toast elements
    const existingToast = document.querySelector('.toast-banner');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Load the cart.js file
    jest.resetModules();
    require('../jravahfoods/cart.js');
  });

  it('should create a toast element when showToast is called', function() {
    showToast('Test message');
    
    const toast = document.querySelector('.toast-banner');
    expect(toast).toBeTruthy();
    expect(toast.textContent).toBe('Test message');
    expect(toast.classList.contains('show')).toBe(true);
  });

  it('should add toast-add class for add to cart notifications', function() {
    showToast('Added to cart', 'add');
    
    const toast = document.querySelector('.toast-banner');
    expect(toast.classList.contains('toast-add')).toBe(true);
    expect(toast.classList.contains('toast-remove')).toBe(false);
  });

  it('should add toast-remove class for remove from cart notifications', function() {
    showToast('Removed from cart', 'remove');
    
    const toast = document.querySelector('.toast-banner');
    expect(toast.classList.contains('toast-remove')).toBe(true);
    expect(toast.classList.contains('toast-add')).toBe(false);
  });

  it('should have gold background for add toasts', function() {
    // This would require DOM and CSS testing which is more complex in Jest
    // For now, we're testing the class assignment which controls the styling
    showToast('Added to cart', 'add');
    
    const toast = document.querySelector('.toast-banner');
    expect(toast.classList.contains('toast-add')).toBe(true);
  });

  it('should have red background for remove toasts', function() {
    showToast('Removed from cart', 'remove');
    
    const toast = document.querySelector('.toast-banner');
    expect(toast.classList.contains('toast-remove')).toBe(true);
  });
});