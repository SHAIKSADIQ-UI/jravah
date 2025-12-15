# Mobile & Desktop Video Player Design

## Overview

This document outlines the design for implementing a responsive video gallery section that adapts its behavior based on device type. The solution features auto-scrolling video thumbnails with custom play controls, shimmer loading effects, and device-specific interaction patterns for both mobile and desktop experiences. The implementation will leverage existing YouTube integration patterns found in the JRavah codebase.

## Functional Requirements

### Core Features
- Responsive video gallery with auto-scrolling horizontal layout
- Device-specific behavior for mobile and desktop
- Custom play button overlay on each video thumbnail
- Shimmer loading effect for unloaded thumbnails
- Fade-in animation for appearing cards
- Inline YouTube video embedding upon play
- Auto-scroll control management during video playback
- Consistent video sizing as per existing specifications

### Mobile Experience
1. Smooth infinite horizontal auto-scroll at slower speed
2. Touch interaction pauses auto-scroll
3. Tap on custom play button converts card to YouTube player
4. Video controls include:
   - Play/Pause
   - 10-second rewind/forward
   - Mute/Unmute
   - Fullscreen toggle
5. Auto-scroll resumes 3 seconds after video close/pause
6. Consistent card sizing maintained during scroll
7. Single video playback isolation (only one video plays at a time)

### Desktop Experience
1. Smooth infinite auto-scroll at faster speed than mobile
2. Hover interaction pauses auto-scroll
3. Click on custom play button opens inline video within card
4. Shimmer loading effect active until thumbnail loads
5. Soft fade-in animation when cards appear
6. Auto-scroll resumes after video closes
7. Other cards remain as thumbnails during playback
8. Single video playback isolation (only one video plays at a time)

## Technical Approach

### Structure
- Single section container with heading
- Wrapper div for overflow hiding
- Track div containing video cards in flex layout
- Individual video cards with:
  - Thumbnail image
  - Custom play button with YouTube video ID data attribute

### Styling Strategy
1. Base styles for section layout and typography
2. Flex-based horizontal scrolling track
3. Consistent card dimensions (230px × 330px) with aspect-ratio property
4. Absolute positioning for play button
5. CSS animations for:
   - Infinite scrolling
   - Fade-in effects
   - Shimmer loading
6. Media queries for device-specific behaviors:
   - Slower scroll speed on mobile
   - Hover pause on desktop

### Interaction Handling
1. JavaScript event listeners for:
   - Play button clicks
   - Touch events (mobile)
   - Mouse hover (desktop)
2. Auto-scroll state management
3. Dynamic iframe insertion for YouTube embeds with autoplay
4. Playback control synchronization
5. Integration with existing VideoController for centralized video management

## Implementation Constraints

### Visual Consistency
- All video cards maintain identical dimensions using CSS aspect-ratio
- Uniform spacing between cards (15px gap)
- Consistent border radius (14px) and background (#fff)
- Standardized play button styling and positioning

### Performance Requirements
- Animation smoothness prioritized (linear timing)
- Efficient event handling to prevent memory leaks
- Optimized shimmer effect with controlled animation duration
- Minimal DOM manipulation during scroll operations
- YouTube iframe embedding with proper autoplay permissions

### Browser Compatibility
- CSS animations supported in modern browsers
- YouTube iframe embedding with autoplay permissions
- Touch and mouse event handling across platforms
- Responsive design principles applied consistently

## User Experience Flow

### Initial Load
1. Section renders with heading
2. Video cards appear with shimmer loading effect
3. Fade-in animation triggers for each card
4. Auto-scroll begins immediately

### Mobile Interaction
1. User touches track → auto-scroll pauses
2. User taps play button → card transforms to player
3. Video plays inline with native controls
4. User closes video → 3-second delay then auto-scroll resumes

### Desktop Interaction
1. User hovers over track → auto-scroll pauses
2. User clicks play button → card transforms to player
3. Video plays inline with native controls
4. User closes video → auto-scroll resumes immediately

## Data Model

| Element | Attributes | Purpose |
|---------|------------|---------|
| Section | class="food-videos-section" | Container for entire component |
| Heading | class="food-videos-heading" | Title for video section |
| Wrapper | class="videos-wrapper" | Controls overflow visibility |
| Track | class="videos-track", id="videosTrack" | Contains scrolling video cards |
| Card | class="video-card", class="shimmer" | Individual video container |
| Image | class="video-thumb" | Thumbnail display |
| Button | class="custom-play-btn", data-video | Triggers video playback |

## Asset Integration

### Video Assets
- Local video files identified in images directory (.mp4 extensions)
- Thumbnail images for video previews (.jpg, .png extensions)
- YouTube video IDs to be extracted from existing implementations

### Existing Patterns
- Reuse of data-video-card attribute pattern for video containers
- Integration with existing video initialization in site.js
- Consistent with current mute/unmute control patterns

## Behavioral Specifications

### Auto-scroll Mechanics
- Continuous linear animation
- Mobile: 35-second cycle duration
- Desktop: 25-second cycle duration
- Paused during active video playback
- Resumed with appropriate delay post-playback

### Video Playback
- YouTube embedded player with autoplay using existing iframe implementation pattern
- Controls enabled for user interaction
- Fullscreen capability supported
- Audio plays automatically when permitted by browser policies
- Single video isolation enforced (pausing other videos when one starts)
- Back button integrated within player interface

### Loading States
- Shimmer effect active during thumbnail load
- Fade animation on card appearance
- Smooth transitions between states
- No visual jumps or layout shifts

## Existing Codebase Alignment

### YouTube Integration Pattern
- Utilize existing YouTube iframe embedding approach with autoplay=1 parameter
- Implement consistent iframe attributes including allowfullscreen and security permissions
- Follow existing error handling patterns for video loading failures

### Video Management
- Integrate with existing VideoController for centralized video management
- Adopt existing play/pause mechanisms and state tracking
- Reuse existing muted indicator functionality
- Implement single video playback isolation as per current specifications

### UI Components
- Maintain consistent styling with existing JRavah design system
- Reuse existing loading spinner patterns
- Adopt existing error messaging approaches

## Future Extensibility

### Potential Enhancements
- Keyboard navigation support
- Accessibility compliance (ARIA labels)
- Localization for international audiences
- Analytics integration for video engagement
- Lazy loading for improved performance
- Customizable theme options

## Success Metrics

### Performance Indicators
- Scroll smoothness maintained at 60fps
- First meaningful paint under 2 seconds
- Zero console errors during operation
- Cross-browser compatibility verified
- Touch responsiveness under 100ms

### User Engagement
- Video play rate above 30%
- Average watch time exceeding 30 seconds
- Low bounce rate from video section
- Positive feedback on mobile/desktop experience- Low bounce rate from video section
