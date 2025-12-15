// Test file for food videos implementation

describe('Food Videos Section', function() {
  it('should have the food videos section in the DOM', function() {
    // Load the JRavah.html file
    cy.visit('http://localhost:8000/JRavah.html');
    
    // Check if the food videos section exists
    cy.get('.food-videos-section').should('exist');
    
    // Check if the heading exists
    cy.get('.food-videos-heading').should('contain.text', 'Our Food Process Videos');
    
    // Check if the videos track exists
    cy.get('#videosTrack').should('exist');
    
    // Check if there are video cards
    cy.get('.video-card').should('have.length.greaterThan', 0);
    
    // Check if play buttons exist
    cy.get('.custom-play-btn').should('have.length.greaterThan', 0);
  });
  
  it('should have proper CSS classes and structure', function() {
    cy.visit('http://localhost:8000/JRavah.html');
    
    // Check if the videos wrapper exists
    cy.get('.videos-wrapper').should('exist');
    
    // Check if video cards have the correct classes
    cy.get('.video-card').first().should('have.class', 'shimmer');
    
    // Check if thumbnails exist
    cy.get('.video-thumb').should('have.length.greaterThan', 0);
  });
});