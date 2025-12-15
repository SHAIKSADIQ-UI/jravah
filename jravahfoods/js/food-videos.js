document.addEventListener('DOMContentLoaded', function() {
  // Initialize food videos section
  initFoodVideos();
});

function initFoodVideos() {
  const track = document.getElementById("videosTrack");
  const playButtons = document.querySelectorAll(".custom-play-btn");
  let activeVideoCard = null;

  // Helper function to map video data attributes to actual filenames
  function getVideoFilename(videoDataAttr) {
    // Map data-video attribute to actual video filenames
    const videoMap = {
      'ChickenPickle': 'ChickenPickle.mp4',
      'Dryfruitladoo': 'Dryfruitladoo.mp4',
      'Karampodi': 'Karampodi.mp4',
      'MushroomPickle': 'MushroomPickle.mp4'
    };
    
    // Return mapped filename or default
    return videoMap[videoDataAttr] || 'foodvideo.mp4';
  }

  // Enhanced function to reset a video card to thumbnail view
  function resetVideoCard(card) {
    if (!card) return;
    
    // Remove active class
    card.classList.remove('active');
    
    // Remove video player if exists
    const videoContainer = card.querySelector('.video-player-container');
    if (videoContainer) {
      const video = videoContainer.querySelector('video');
      if (video) {
        video.pause();
        video.remove();
      }
      videoContainer.remove();
    }
    
    // Show thumbnail and play button
    const thumb = card.querySelector('.video-thumb');
    const playBtn = card.querySelector('.custom-play-btn');
    if (thumb) thumb.style.display = 'block';
    if (playBtn) playBtn.style.display = 'block';
  }

  // Add event listeners to play buttons
  playButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const videoData = this.getAttribute("data-video");
      const card = this.parentElement;

      // Pause any currently active video (ensuring single video playback isolation)
      if (activeVideoCard && activeVideoCard !== card) {
        resetVideoCard(activeVideoCard);
      }

      // Hide thumbnail and play button
      const thumbElement = card.querySelector('.video-thumb');
      if (thumbElement) thumbElement.style.display = 'none';
      this.style.display = 'none';

      // Add active class to card
      card.classList.add('active');
      
      // Create video player container
      const videoContainer = document.createElement('div');
      videoContainer.className = 'video-player-container';

      // Create video element for local files
      const video = document.createElement('video');
      video.className = 'inline-player';
      video.src = `video/${getVideoFilename(videoData)}`; // Use video from the video folder
      video.controls = true;
      video.autoplay = true;
      video.muted = false; // Audio will play by default (as per requirements)

      // Create integrated back button within the video player
      const backBtn = document.createElement('button');
      backBtn.className = 'back-btn';
      backBtn.textContent = 'Back';
      backBtn.setAttribute('aria-label', 'Back to thumbnails');
      
      backBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Pause and remove video player
        video.pause();
        videoContainer.remove();
        
        // Show thumbnail and play button again
        if (thumbElement) thumbElement.style.display = 'block';
        if (btn) btn.style.display = 'block';
        
        // Remove active class
        card.classList.remove('active');
        
        // Clear active video card
        if (activeVideoCard === card) {
          activeVideoCard = null;
        }
      });

      // Assemble the video player
      videoContainer.appendChild(video);
      videoContainer.appendChild(backBtn);
      card.appendChild(videoContainer);
      
      // Set this as the active video card
      activeVideoCard = card;
      
      // Attempt to play the video with audio
      video.play().catch(function(error) {
        console.log("Autoplay prevented, showing unmute prompt");
        // If autoplay is blocked, show an unmute prompt
        const unmutePrompt = document.createElement('div');
        unmutePrompt.innerHTML = '🔇 Click to unmute';
        unmutePrompt.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          z-index: 12;
          font-size: 16px;
        `;
        
        unmutePrompt.addEventListener('click', function() {
          video.muted = false;
          unmutePrompt.remove();
          video.play();
        });
        
        videoContainer.appendChild(unmutePrompt);
      });
    });
  });
}