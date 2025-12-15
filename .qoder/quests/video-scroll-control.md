# Video Scroll Control Design Document

## Overview
This design document outlines the implementation of enhanced video scroll control features for the JRavah website's food videos section. The enhancements focus on improving user interaction, ensuring consistent video playback behavior, and maintaining visual uniformity across all devices.

## Requirements Analysis

Based on the user requirements, the following key functionalities need to be implemented or enhanced:

1. Scrolling stops when hovering over the video section (for all screen sizes, not just desktop)
2. Scrolling remains paused while any video is playing
3. Only one video plays at a time (single playback isolation)
4. When a new video is selected, the previous one pauses and returns to thumbnail view
5. Videos play with sound by default (unless browser policies restrict autoplay)
6. The back button allows users to return to the thumbnail view
7. Videos are displayed clearly in their proper size with consistent styling
8. Video is fully visible in its card at a small size when hovered
9. When any video is playing, scrolling is stopped regardless of hover state

## Current State Analysis

From examining the existing implementation:

- The video gallery uses a horizontal auto-scrolling track with CSS animations
- Play buttons convert thumbnails to inline video players
- Basic single video playback isolation is implemented
- Video sizing consistency is maintained through CSS aspect-ratio and object-fit properties
- Back button functionality exists within the video player interface
- Auto-scroll is paused on hover but only for desktop viewports (≥768px)

## Design Changes

### 1. Universal Hover Scroll Pause

**Issue**: Current implementation only pauses scrolling on hover for desktop viewports.

**Solution**: 
- Remove viewport restriction from hover event listeners
- Apply scroll pause behavior consistently across all device sizes
- Ensure video is fully visible in its card at a small size when hovered
- When user hovers over video section, scrolling effect stops immediately

```javascript
// Current implementation (lines 179-183 in food-videos.js):
track.addEventListener("mouseenter", function() {
  // Only pause on desktop
  if (window.innerWidth >= 768) {
    stopAutoScroll();
  }
});

// Proposed change:
track.addEventListener("mouseenter", stopAutoScroll);
```

### 2. Persistent Scroll Pause During Video Playback

**Issue**: Auto-scroll resumes automatically after video closes with a fixed timeout.

**Solution**:
- Implement explicit scroll state management
- Pause scrolling when any video is playing
- Only resume scrolling when user explicitly exits video playback
- Ensure scrolling remains stopped while any video is actively playing, regardless of hover state
- While watching video, scrolling will be stopped

### 3. Enhanced Single Video Playback Isolation

**Issue**: Basic implementation exists but needs refinement.

**Solution**:
- Strengthen the single playback enforcement mechanism
- Ensure previous video is completely reset when new one starts
- Clear all playback resources from previous videos
- When user selects 2nd video while 1st is playing, 1st video will pause and return to thumbnail image
- When user selects 3rd video while 2nd is playing, 2nd video will pause and 3rd video will play
- When user selects 4th video while 3rd is playing, 3rd video will pause and 4th video will play with sound

### 4. Improved Video Transition Behavior

**Issue**: Video transitions could be smoother with better state management.

**Solution**:
- Implement explicit state tracking for video elements
- Ensure clean transitions between thumbnail and player views
- Add proper cleanup of video resources

### 5. Audio Playback Handling

**Issue**: Basic audio implementation exists but needs enhancement.

**Solution**:
- Retain current unmute prompt mechanism for browser policy compliance
- Ensure consistent audio behavior across different browsers
- Improve visibility of unmute prompts

### 6. Back Button Integration

**Issue**: Back button exists but behavior could be enhanced.

**Solution**:
- Ensure back button reliably returns to thumbnail view
- Reset all video states upon returning to thumbnails
- Resume auto-scroll appropriately after back button use

### 7. Consistent Video Sizing

**Issue**: Current implementation uses CSS aspect-ratio which is good but needs verification.

**Solution**:
- Confirm aspect-ratio implementation maintains 16:9 proportions
- Ensure object-fit properties handle various source video dimensions
- Verify consistent sizing across different device viewports

## Technical Implementation Details

### JavaScript Enhancements

#### Scroll Control Management
- Create a centralized scroll state manager
- Implement event listeners for all interaction points (hover, touch, playback)
- Add explicit methods for pausing and resuming scroll
- Ensure scroll state is properly managed when switching between hover and playback states

#### Video Playback Isolation
- Maintain reference to currently active video card
- Implement robust cleanup when switching videos
- Add error handling for playback failures
- Ensure only one video plays at a time with proper isolation

#### State Tracking
- Track scroll state (playing/paused)
- Track active video element
- Manage UI state transitions
- Track hover states across all devices

### CSS Enhancements

#### Responsive Hover Behavior
- Remove media query restrictions on hover effects
- Ensure consistent interaction model across devices

#### Visual Consistency
- Verify aspect-ratio implementation
- Confirm object-fit properties handle edge cases
- Ensure back button styling is consistent

## Implementation Sequence

1. **Scroll Control Updates**
   - Modify hover event listeners to work on all devices
   - Implement persistent scroll pause during video playback
   - Ensure scrolling stops immediately when cursor hovers over video section

2. **Playback Isolation Enhancement**
   - Strengthen single video playback enforcement
   - Improve state management between video transitions
   - Implement sequential video playback switching (1st→2nd→3rd→4th)

3. **UI Component Refinements**
   - Enhance back button functionality
   - Improve unmute prompt visibility and interaction
   - Ensure video is fully visible in card when hovered

4. **Cross-device Consistency**
   - Verify behavior on mobile, tablet, and desktop
   - Test touch and hover interactions across devices
   - Ensure scrolling remains stopped while any video is playing

5. **Testing and Validation**
   - Validate all requirements are met
   - Perform cross-browser testing
   - Verify performance impact is minimal

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Browser autoplay policies | Medium | Retain current unmute prompt mechanism |
| Performance degradation | Low | Optimize event handlers and state management |
| Cross-device inconsistency | Medium | Thorough testing across device types |
| Resource leaks | Low | Implement proper cleanup mechanisms |

## Success Criteria

1. Hovering over video section pauses scrolling on all devices
2. Only one video plays at a time with proper isolation
3. Previous videos fully reset when new ones start
4. Back button reliably returns to thumbnail view
5. Videos maintain consistent sizing and aspect ratio
6. Audio plays by default with appropriate fallbacks
7. Auto-scroll behavior is predictable and user-friendly
8. Video is fully visible in its card at a small size when hovered
9. Scrolling remains paused while any video is playing, regardless of hover state
