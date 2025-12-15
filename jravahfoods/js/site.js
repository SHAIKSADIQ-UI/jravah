document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing components...');
  initMobileMenu();
  highlightActiveLinks();
  initVideoCards();
  initTrustSection(); // New function to initialize trust section immediately
  initAOS();
  
  // Log video initialization for debugging
  console.log('Video components initialized');
});

// New function to handle trust section initialization
function initTrustSection() {
  // Since this section doesn't have complex interactions,
  // we just ensure it's visible immediately
  const trustSection = document.getElementById('trust');
  if (trustSection) {
    // Force immediate visibility without causing reflow
    requestAnimationFrame(() => {
      trustSection.style.visibility = 'visible';
      trustSection.style.opacity = '1';
      
      // Apply any necessary initial animations manually
      const title = trustSection.querySelector('.section-title');
      if (title) {
        title.style.transform = 'translateY(0)';
        title.style.opacity = '1';
      }
      
      const cards = trustSection.querySelectorAll('.contact-card');
      cards.forEach((card, index) => {
        // Stagger the appearance of cards with optimized timing
        setTimeout(() => {
          requestAnimationFrame(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
          });
        }, index * 100);
      });
    });
  }
}

function initMobileMenu() {
  const hamburger = document.querySelector('[data-action="open-menu"]');
  const mobileMenu = document.querySelector('[data-component="mobile-menu"]');
  if (!hamburger || !mobileMenu) return;

  const closeBtn = mobileMenu.querySelector('[data-action="close-menu"]');
  const links = mobileMenu.querySelectorAll('a');

  const openMenu = () => mobileMenu.classList.add('open');
  const closeMenu = () => mobileMenu.classList.remove('open');

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  links.forEach((link) => link.addEventListener('click', closeMenu));
}

function highlightActiveLinks() {
  const pageKey = document.body.dataset.page;
  if (!pageKey) return;

  document.querySelectorAll('[data-page-link]').forEach((link) => {
    const target = link.dataset.pageLink;
    if (target === pageKey) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initVideoCards() {
  // Initialize the new video gallery
  initVideoGallery();
  
  // Keep the old functionality for backward compatibility
  document.querySelectorAll('[data-video-card]').forEach((card) => {
    const video = card.querySelector('video');
    const thumb = card.querySelector('.video-thumb');
    if (!video || !thumb) return;

    const muteToggle = card.querySelector('[data-video-control="mute"]');
    const resetButton = card.querySelector('[data-video-control="reset"]');

    // Start videos muted by default for better UX
    video.muted = true;

    const syncMuteLabel = () => {
      if (!muteToggle) return;
      muteToggle.textContent = video.muted ? 'Unmute' : 'Mute';
    };

    const playVideo = () => {
      card.classList.add('playing');
      // Enhanced video play with error handling
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Video play failed:', error);
          // Show error message to user
          showError('Failed to play video. Please try again.');
        });
      }
    };

    video.addEventListener('ended', () => {
      card.classList.remove('playing');
      video.currentTime = 0;
    });

    // Add error handling for video loading
    video.addEventListener('error', (e) => {
      console.error('Video loading error:', e);
      showError('Failed to load video. Please check your connection and try again.');
    });

    thumb.addEventListener('click', playVideo);

    if (muteToggle) {
      syncMuteLabel();
      muteToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        video.muted = !video.muted;
        syncMuteLabel();
      });
    }

    if (resetButton) {
      resetButton.addEventListener('click', (event) => {
        event.stopPropagation();
        video.pause();
        video.currentTime = 0;
        card.classList.remove('playing');
      });
    }
  });
}

// Utility function to show error messages
function showError(message) {
  // Create error message element if it doesn't exist
  let errorContainer = document.getElementById('video-error-message');
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'video-error-message';
    errorContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      max-width: 300px;
    `;
    document.body.appendChild(errorContainer);
  }
  
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';
  
  // Hide error after 5 seconds
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 5000);
}

// Video Controller - Centralized management of all video instances
const VideoController = {
  activeVideo: null,
  videos: [],
  
  // Register a video instance
  registerVideo: function(videoElement, card, player) {
    const videoInstance = {
      element: videoElement,
      card: card,
      player: player,
      state: 'THUMBNAIL', // THUMBNAIL, LOADING, PLAYING, PAUSED, ERROR
      index: this.videos.length
    };
    
    this.videos.push(videoInstance);
    return videoInstance;
  },
  
  // Set active video and pause all others
  setActiveVideo: function(videoInstance) {
    // Pause currently active video if exists
    if (this.activeVideo && this.activeVideo !== videoInstance) {
      this.pauseVideo(this.activeVideo);
    }
    
    this.activeVideo = videoInstance;
  },
  
  // Play a specific video
  playVideo: function(videoInstance) {
    try {
      videoInstance.state = 'LOADING';
      
      // Show loading indicator
      this.showLoadingIndicator(videoInstance.card);
      
      const playPromise = videoInstance.element.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoInstance.state = 'PLAYING';
          this.hideLoadingIndicator(videoInstance.card);
          console.log('Video playback started successfully');
        }).catch(error => {
          console.log('Autoplay with audio was prevented, playing muted:', error);
          videoInstance.element.muted = true;
          
          // Try playing again with muted audio
          const retryPlayPromise = videoInstance.element.play();
          
          if (retryPlayPromise !== undefined) {
            retryPlayPromise.then(() => {
              videoInstance.state = 'PLAYING';
              this.hideLoadingIndicator(videoInstance.card);
              console.log('Video playback started successfully (muted)');
              
              // Show visual indicator that video is muted
              this.showMutedIndicator(videoInstance.card);
            }).catch(retryError => {
              videoInstance.state = 'ERROR';
              this.hideLoadingIndicator(videoInstance.card);
              console.error('Video play failed even when muted:', retryError);
              showError('Failed to play video. Please try again.');
            });
          }
        });
      }
    } catch (error) {
      videoInstance.state = 'ERROR';
      this.hideLoadingIndicator(videoInstance.card);
      console.error('Error playing video:', error);
      showError('Failed to play video. Please try again.');
    }
  },
  
  // Pause a specific video
  pauseVideo: function(videoInstance) {
    if (videoInstance && videoInstance.element) {
      videoInstance.element.pause();
      videoInstance.element.currentTime = 0;
      videoInstance.player.classList.remove('active');
      videoInstance.state = 'THUMBNAIL';
      
      // Remove any muted indicators
      this.hideMutedIndicator(videoInstance.card);
    }
  },
  
  // Pause all videos
  pauseAllVideos: function() {
    this.videos.forEach(videoInstance => {
      this.pauseVideo(videoInstance);
    });
    
    // Also pause any legacy video cards
    const legacyCards = document.querySelectorAll('[data-video-card].playing');
    legacyCards.forEach(card => {
      const video = card.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
        card.classList.remove('playing');
      }
    });
  },
  
  // Show loading indicator
  showLoadingIndicator: function(card) {
    let loader = card.querySelector('.video-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'video-loader';
      loader.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <span>Loading video...</span>
        </div>
      `;
      loader.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        color: white;
        flex-direction: column;
      `;
      
      const spinnerStyle = document.createElement('style');
      spinnerStyle.textContent = `
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 10px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      loader.appendChild(spinnerStyle);
      
      card.appendChild(loader);
    }
    loader.style.display = 'flex';
  },
  
  // Hide loading indicator
  hideLoadingIndicator: function(card) {
    const loader = card.querySelector('.video-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  },
  
  // Show muted indicator
  showMutedIndicator: function(card) {
    let indicator = card.querySelector('.muted-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'muted-indicator';
      indicator.textContent = '🔇 MUTED';
      indicator.style.cssText = `
        position: absolute;
        top: 60px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 11;
      `;
      card.appendChild(indicator);
      
      // Remove indicator after 3 seconds
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      }, 3000);
    }
  },
  
  // Hide muted indicator
  hideMutedIndicator: function(card) {
    const indicator = card.querySelector('.muted-indicator');
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }
};

// Initialize video gallery functionality
function initVideoGallery() {
  console.log('Initializing video gallery...');
  
  const videoGallery = document.querySelector('.video-gallery');
  const videoCards = document.querySelectorAll('.video-card');
  
  console.log('Found video gallery:', videoGallery);
  console.log('Found video cards:', videoCards.length);
  
  // Check if auto-scrolling is enabled
  const enableAutoScroll = videoGallery && videoGallery.classList.contains('auto-scroll');
  
  if (enableAutoScroll) {
    console.log('Auto-scroll is enabled');
    initAutoScroll(videoGallery, videoCards);
  }
  
  if (!videoGallery) {
    console.warn('Video gallery not found');
    return;
  }
  
  // Add loading state to video gallery
  videoGallery.classList.add('loading');
  
  if (videoCards.length === 0) {
    console.warn('No video cards found');
    videoGallery.classList.remove('loading');
    return;
  }
  
  console.log('Setting up', videoCards.length, 'video cards');
  
  // Clear video controller
  VideoController.videos = [];
  VideoController.activeVideo = null;
  
  videoCards.forEach((card, index) => {
    const thumbnail = card.querySelector('.video-thumbnail');
    const player = card.querySelector('.video-player');
    const videoElement = player ? player.querySelector('.video-element') : null;
    const closeButton = player ? player.querySelector('.close-video') : null;
    const muteToggle = player ? player.querySelector('.mute-toggle') : null;
    
    // Validate required elements
    if (!thumbnail || !player || !videoElement) {
      console.warn('Skipping video card', index, 'due to missing elements:', {
        thumbnail: !!thumbnail,
        player: !!player,
        videoElement: !!videoElement
      });
      return;
    }
    
    console.log('Setting up video card', index);
    
    // Register video with controller
    const videoInstance = VideoController.registerVideo(videoElement, card, player);
    
    // Add data attribute for debugging
    card.setAttribute('data-video-index', index);
    
    // Log video source for debugging
    console.log('Video source for card', index, ':', videoElement.src);
    
    // Preload video metadata for better performance
    videoElement.preload = 'metadata';
    
    // Handle video loading errors
    videoElement.addEventListener('error', (e) => {
      console.error('Video loading error for card', index, ':', e);
      videoInstance.state = 'ERROR';
      VideoController.hideLoadingIndicator(card);
      showError('Failed to load video. Please refresh the page and try again.');
      
      // Add error class for styling
      card.classList.add('video-error');
    });
    
    // Handle video metadata loaded
    videoElement.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded for card', index);
      // Remove loading state when all videos are ready
      if (index === videoCards.length - 1) {
        videoGallery.classList.remove('loading');
        console.log('All videos loaded');
      }
    });
    
    // Play video when thumbnail is clicked
    thumbnail.addEventListener('click', () => {
      console.log('Thumbnail clicked for video card', index);
      
      // Set this video as active
      VideoController.setActiveVideo(videoInstance);
      
      // Show player view
      player.classList.add('active');
      
      // Play this video
      VideoController.playVideo(videoInstance);
      
      // Set initial mute state
      if (muteToggle) {
        muteToggle.classList.toggle('muted', videoElement.muted);
      }
      
      // Pause auto-scrolling when a video is playing
      if (enableAutoScroll) {
        videoGallery.classList.add('scrolling-paused');
      }
      
      // Dispatch custom event for analytics
      const playEvent = new CustomEvent('videoPlayed', {
        detail: { 
          videoIndex: index,
          videoSrc: videoElement.src
        }
      });
      document.dispatchEvent(playEvent);
    });
    
    // Close video when close button is clicked
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        console.log('Close button clicked for video card', index);
        e.stopPropagation();
        
        // Pause this video
        VideoController.pauseVideo(videoInstance);
        
        // Resume auto-scrolling when video is closed
        if (enableAutoScroll) {
          videoGallery.classList.remove('scrolling-paused');
        }
      });
    }
    
    // Toggle mute when mute button is clicked
    if (muteToggle) {
      muteToggle.addEventListener('click', (e) => {
        console.log('Mute toggle clicked for video card', index);
        e.stopPropagation();
        videoElement.muted = !videoElement.muted;
        muteToggle.classList.toggle('muted', videoElement.muted);
        
        // Update UI based on mute state
        if (videoElement.muted) {
          VideoController.showMutedIndicator(card);
        } else {
          VideoController.hideMutedIndicator(card);
        }
      });
    }
  });
  
  console.log('Video gallery initialization complete');
}

// Initialize auto-scrolling effect
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
  VideoController.pauseAllVideos();
}

// Play a specific video
function playVideo(videoElement) {
  console.log('Attempting to play video:', videoElement.src);
  
  // Check if video element is valid
  if (!videoElement || !(videoElement instanceof HTMLMediaElement)) {
    console.error('Invalid video element provided to playVideo function');
    showError('Failed to play video. Invalid video element.');
    return;
  }
  
  // Find the video instance in our controller
  const videoInstance = VideoController.videos.find(v => v.element === videoElement);
  
  if (videoInstance) {
    VideoController.playVideo(videoInstance);
  } else {
    // Fallback for legacy videos
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Video playback started successfully');
      }).catch(error => {
        console.log('Autoplay with audio was prevented, playing muted:', error);
        videoElement.muted = true;
        // Try playing again with muted audio
        const retryPlayPromise = videoElement.play();
        if (retryPlayPromise !== undefined) {
          retryPlayPromise.then(() => {
            console.log('Video playback started successfully (muted)');
            // Show visual indicator that video is muted
            showMutedIndicator(videoElement);
          }).catch(retryError => {
            console.error('Video play failed even when muted:', retryError);
            showError('Failed to play video. Please try again.');
          });
        }
      });
    }
  }
}

// Show visual indicator when video is muted
function showMutedIndicator(videoElement) {
  // Find the parent card to show the muted indicator
  const card = videoElement.closest('.video-card');
  if (card) {
    // Check if indicator already exists
    let indicator = card.querySelector('.muted-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'muted-indicator';
      indicator.textContent = '🔇 MUTED';
      indicator.style.cssText = `
        position: absolute;
        top: 60px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 11;
      `;
      card.appendChild(indicator);
      
      // Remove indicator after 3 seconds
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      }, 3000);
    }
  }
}

// Close video and return to thumbnail view
function closeVideo(card, videoElement) {
  // Find the video instance in our controller
  const videoInstance = VideoController.videos.find(v => v.element === videoElement);
  
  if (videoInstance) {
    VideoController.pauseVideo(videoInstance);
  } else {
    // Fallback for legacy videos
    videoElement.pause();
    videoElement.currentTime = 0;
    const player = card.querySelector('.video-player');
    if (player) {
      player.classList.remove('active');
    }
  }
  
  // Dispatch custom event for analytics or other tracking
  const closeEvent = new CustomEvent('videoClosed', {
    detail: { video: videoElement }
  });
  document.dispatchEvent(closeEvent);
}
function initAOS() {
  if (window.AOS) {
    window.AOS.init({
      duration: 900,
      once: true,
      offset: 60,
    });
  }
}
