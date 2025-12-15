// Test file for video carousel implementation

describe('Video Carousel Functionality', function() {
  beforeEach(function() {
    // Load the JRavah.html file
    cy.visit('http://localhost:8000/JRavah.html');
  });

  it('should have the video section in the DOM', function() {
    // Check if the videos section exists
    cy.get('#videos').should('exist');
    
    // Check if the videos track exists
    cy.get('#videosTrack').should('exist');
    
    // Check if there are video cards
    cy.get('.video-card').should('have.length.greaterThan', 0);
    
    // Check if play buttons exist
    cy.get('.custom-play-btn').should('have.length.greaterThan', 0);
  });
  
  it('should have proper CSS classes and structure', function() {
    // Check if the videos wrapper exists
    cy.get('.videos-wrapper').should('exist');
    
    // Check if video cards have the correct classes
    cy.get('.video-card').first().should('have.class', 'shimmer');
    
    // Check if thumbnails exist
    cy.get('.video-thumb').should('have.length.greaterThan', 0);
  });
  
  it('should not implement seamless looping (feature disabled)', function() {
    // Check that the videos track does not have the infinite scroll animation
    cy.get('#videosTrack').should('not.have.css', 'animation-name', 'infiniteScroll');
    
    // Check that there are no cloned elements as seamless looping is disabled
    cy.get('.videos-track.cloned').should('not.exist');
  });
  
  it('should handle sequential video selection with automatic reset', function() {
    // Get the first two play buttons
    cy.get('.custom-play-btn').eq(0).as('firstButton');
    cy.get('.custom-play-btn').eq(1).as('secondButton');
    
    // Click the first video
    cy.get('@firstButton').click();
    
    // Check if the first video is playing (has active class)
    cy.get('.video-card').eq(0).should('have.class', 'active');
    
    // Click the second video
    cy.get('@secondButton').click();
    
    // Check if the first video is reset (no active class)
    cy.get('.video-card').eq(0).should('not.have.class', 'active');
    
    // Check if the second video is playing (has active class)
    cy.get('.video-card').eq(1).should('have.class', 'active');
  });
  
  it('should not pause scrolling during video playback (feature disabled)', function() {
    // Check that there is no animation as scrolling is disabled
    cy.get('#videosTrack').should('not.have.css', 'animation-name', 'infiniteScroll');
    
    // Click a play button
    cy.get('.custom-play-btn').first().click();
    
    // Check that there is still no animation as scrolling is disabled
    cy.get('#videosTrack').should('not.have.css', 'animation-name', 'infiniteScroll');
    
    // Click the back button
    cy.get('.back-btn').click();
    
    // Check that there is still no animation as scrolling is disabled
    cy.get('#videosTrack').should('not.have.css', 'animation-name', 'infiniteScroll');
  });
  
  it('should have integrated back button', function() {
    // Click a play button
    cy.get('.custom-play-btn').first().click();
    
    // Check if back button exists
    cy.get('.back-btn').should('exist');
    
    // Check back button text
    cy.get('.back-btn').should('contain.text', 'Back');
  });
});