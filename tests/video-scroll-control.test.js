// Test file for video scroll control functionality

describe('Video Scroll Control', () => {
  beforeEach(() => {
    // Set up DOM elements for testing
    document.body.innerHTML = `
      <div id="videosTrack" class="videos-track">
        <div class="video-card">
          <img class="video-thumb" src="test1.jpg" />
          <button class="custom-play-btn" data-video="test1">▶</button>
        </div>
        <div class="video-card">
          <img class="video-thumb" src="test2.jpg" />
          <button class="custom-play-btn" data-video="test2">▶</button>
        </div>
      </div>
    `;
    
    // Load the food-videos.js script
    jest.resetModules();
    require('../public_html/js/food-videos.js');
  });

  test('should not have scrolling functionality', () => {
    const track = document.getElementById('videosTrack');
    const mouseEnterEvent = new MouseEvent('mouseenter');
    
    // Since infinite scroll is disabled, animationPlayState should remain empty
    expect(track.style.animationPlayState).toBe('');
    
    // Dispatch mouseenter event
    track.dispatchEvent(mouseEnterEvent);
    
    // After hover, animationPlayState should still be empty as scrolling is disabled
    expect(track.style.animationPlayState).toBe('');
  });

  test('should not have scrolling functionality when leaving video track', () => {
    const track = document.getElementById('videosTrack');
    const mouseEnterEvent = new MouseEvent('mouseenter');
    const mouseLeaveEvent = new MouseEvent('mouseleave');
    
    // Since infinite scroll is disabled, animationPlayState should remain empty
    expect(track.style.animationPlayState).toBe('');
    
    // Dispatch events
    track.dispatchEvent(mouseEnterEvent);
    track.dispatchEvent(mouseLeaveEvent);
    
    // After events, animationPlayState should still be empty as scrolling is disabled
    expect(track.style.animationPlayState).toBe('');
  });

  test('should play video without affecting scrolling (as scrolling is disabled)', () => {
    const track = document.getElementById('videosTrack');
    const playButton = document.querySelector('.custom-play-btn');
    
    // Click play button to start video
    playButton.click();
    
    // Since scrolling is disabled, animationPlayState should remain empty
    expect(track.style.animationPlayState).toBe('');
  });

  test('should only play one video at a time', () => {
    const playButtons = document.querySelectorAll('.custom-play-btn');
    const firstButton = playButtons[0];
    const secondButton = playButtons[1];
    
    // Click first video
    firstButton.click();
    
    // Check that first video is playing (has video player container)
    const firstCard = firstButton.parentElement;
    expect(firstCard.querySelector('.video-player-container')).toBeTruthy();
    
    // Click second video
    secondButton.click();
    
    // Check that first video is no longer playing
    expect(firstCard.querySelector('.video-player-container')).toBeFalsy();
    
    // Check that second video is now playing
    const secondCard = secondButton.parentElement;
    expect(secondCard.querySelector('.video-player-container')).toBeTruthy();
  });
});