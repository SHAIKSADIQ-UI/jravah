# Video Card Layout Update Design Document

## Overview

This document outlines the design for updating the video card layout on the JRavah Foods website. The goal is to create a modern, responsive video gallery that maintains consistency with the brand's design system while improving user experience. The design includes an optional auto-scrolling effect from right to left for the video gallery.
## Current State Analysis

Based on the code analysis, the current implementation uses:
- A carousel slider (Slick) for displaying videos
- Inline video elements with poster images
- Play icon overlays using CSS pseudo-elements
- Basic JavaScript for video playback control

The current layout uses a carousel approach with horizontal scrolling, but the requirement is to change to a grid-based layout with responsive behavior.

## Design Requirements

### Layout and Style
- Display videos in a grid layout (3 per row on desktop, 2 on tablet, 1 on mobile)
- Maintain consistent aspect ratio for all video thumbnails
- Use rounded corners and light shadows for card design
- Implement YouTube-style play button overlays
- Keep all cards in fixed positions when one video is playing
- Implement optional auto-scrolling effect from right to left

### Interaction Behavior
- Clicking a thumbnail replaces only that card's content with an embedded video player
- Other cards remain as thumbnails without layout shifts
- Add optional close/back button to return to thumbnail view
- Single video playback isolation (only one video plays at a time)
- Toggle audio on/off during video playback
### Responsiveness
- Desktop: 3 cards in a row
- Tablet: 2 cards per row
- Mobile: 1 card per row (full width)
- No horizontal scrolling
## Proposed Solution

### HTML Structure

```html
<!-- Video Gallery Container -->
<div class="video-gallery">
  <!-- Individual Video Card -->
  <div class="video-card">
    <!-- Thumbnail View (Default State) -->
    <div class="video-thumbnail">
      <img src="[video-poster-url]" alt="[video-description]" class="thumbnail-image">
      <div class="play-overlay">
        <div class="play-icon"></div>
      </div>
    </div>
    
    <!-- Playing View (Active State) -->
    <div class="video-player">
      <video src="[video-source]" controls class="video-element"></video>
      <button class="close-video" aria-label="Close video">&times;</button>
      <button class="mute-toggle" aria-label="Toggle audio"></button>
    </div>  </div>
  
  <!-- Additional video cards would follow the same structure -->
</div>
```

### CSS Implementation

#### Container Grid Layout
```css
.video-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem 1rem;
  /* Auto-scrolling effect from right to left */
  overflow-x: hidden;
  position: relative;
}

@media (max-width: 992px) {
  .video-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .video-gallery {
    grid-template-columns: 1fr;
  }
}

/* Auto-scrolling animation */
@keyframes scrollRightToLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.video-gallery.auto-scroll .video-card {
  animation: scrollRightToLeft 30s linear infinite;
  position: absolute;
  top: 0;
  right: 0;
}
#### Video Card Styling
```css
.video-card {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: var(--white);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

#### Thumbnail View
```css
.video-thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.play-icon::before {
  content: "▶";
  font-size: 24px;
  color: var(--orange-primary);
  margin-left: 4px;
}

.video-thumbnail:hover .play-icon {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
```

#### Player View
```css
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
}

.video-player.active {
  display: block;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close-video {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.close-video:hover {
  background: rgba(0, 0, 0, 0.85);
  transform: scale(1.05);
}

.mute-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.mute-toggle:hover {
  background: rgba(0, 0, 0, 0.85);
  transform: scale(1.05);
}

.mute-toggle::before {
  content: "🔊";
}

.mute-toggle.muted::before {
  content: "🔇";
}
```
### JavaScript Implementation

#### Core Functionality
```javascript
// Initialize video gallery functionality
function initVideoGallery() {
  const videoGallery = document.querySelector('.video-gallery');
  const videoCards = document.querySelectorAll('.video-card');
  
  // Check if auto-scrolling is enabled
  const enableAutoScroll = videoGallery.classList.contains('auto-scroll');
  
  if (enableAutoScroll) {
    initAutoScroll(videoGallery, videoCards);
  }
  
  videoCards.forEach(card => {
    const thumbnail = card.querySelector('.video-thumbnail');
    const player = card.querySelector('.video-player');
    const videoElement = card.querySelector('.video-element');
    const closeButton = card.querySelector('.close-video');
    const muteToggle = card.querySelector('.mute-toggle');
    
    // Play video when thumbnail is clicked
    thumbnail.addEventListener('click', () => {
      // Pause all other videos
      pauseAllVideos();
      
      // Show player view
      player.classList.add('active');
      
      // Play this video
      playVideo(videoElement);
      
      // Set initial mute state
      if (muteToggle) {
        muteToggle.classList.toggle('muted', videoElement.muted);
      }
      
      // Pause auto-scrolling when a video is playing
      if (enableAutoScroll) {
        videoGallery.classList.add('scrolling-paused');
      }
    });
    
    // Close video when close button is clicked
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideo(card, videoElement);
      
      // Resume auto-scrolling when video is closed
      if (enableAutoScroll) {
        videoGallery.classList.remove('scrolling-paused');
      }
    });
    
    // Toggle mute when mute button is clicked
    if (muteToggle) {
      muteToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        videoElement.muted = !videoElement.muted;
        muteToggle.classList.toggle('muted', videoElement.muted);
      });
    }
  });
}// Initialize auto-scrolling effect
function initAutoScroll(gallery, cards) {
  if (gallery.classList.contains('scrolling-paused')) return;
  
  let scrollPosition = 0;
  const scrollSpeed = 0.5; // pixels per frame
  
  function scrollStep() {
    if (!gallery.classList.contains('scrolling-paused')) {
      scrollPosition -= scrollSpeed;
      gallery.scrollLeft = scrollPosition;
      
      // Reset scroll position when reaching the end
      if (scrollPosition <= -gallery.scrollWidth) {
        scrollPosition = gallery.clientWidth;
      }
    }
    
    requestAnimationFrame(scrollStep);
  }
  
  // Start scrolling
  requestAnimationFrame(scrollStep);
}

// Pause all videos in the gallery
function pauseAllVideos() {
  const allPlayers = document.querySelectorAll('.video-player.active');
  allPlayers.forEach(player => {
    const video = player.querySelector('.video-element');
    video.pause();
    video.currentTime = 0;
    player.classList.remove('active');
  });
}

// Play a specific video
function playVideo(videoElement) {
  // Try to play with audio, fallback to muted if needed
  const playPromise = videoElement.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Autoplay with audio was prevented, playing muted:', error);
      videoElement.muted = true;
      videoElement.play();
    });
  }
}

// Close video and return to thumbnail view
function closeVideo(card, videoElement) {
  videoElement.pause();
  videoElement.currentTime = 0;
  card.querySelector('.video-player').classList.remove('active');
}
```
## Implementation Constraints

1. Reuse existing HTML structure where possible to minimize data changes
2. Use CSS Grid for layout instead of the current carousel approach
3. Maintain existing color scheme and brand styling
4. Preserve existing video sources and attributes
5. Ensure accessibility with proper ARIA labels and keyboard navigation
6. Make auto-scrolling effect optional and disable when user interacts with gallery
7. Implement intuitive audio toggle controls for video playback

## Responsive Behavior

### Breakpoints
- Large screens (≥992px): 3 columns
- Medium screens (600px-991px): 2 columns
- Small screens (<600px): 1 column

### Adaptations
- Cards maintain consistent aspect ratio across all breakpoints
- Play button scales appropriately for touch targets on mobile
- Close button remains accessible on all screen sizes
- Hover effects disabled on touch devices

## Accessibility Considerations

1. Proper ARIA labels for interactive elements
2. Keyboard navigation support
3. Sufficient color contrast for play/close buttons
4. Focus management when switching between thumbnail and player views
5. Semantic HTML structure for screen readers
6. Accessible audio toggle controls with proper labeling

## Performance Optimization

1. Lazy loading of video content
2. Efficient CSS transitions using transform and opacity
3. Minimal DOM manipulation in JavaScript
4. Optimized asset loading for thumbnails
5. Prevent layout shifts during state changes
6. Optimize auto-scrolling animation using requestAnimationFrame

## Testing Scenarios

1. Verify grid layout on all device sizes
2. Test video playback and pause functionality
3. Confirm only one video plays at a time
4. Validate close button functionality
5. Check hover states and transitions
6. Ensure accessibility compliance
7. Test on various browsers and devices
8. Verify auto-scrolling effect works smoothly and pauses when interacting with videos
9. Test audio toggle functionality during video playback
