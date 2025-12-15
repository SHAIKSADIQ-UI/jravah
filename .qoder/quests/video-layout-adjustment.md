# Video Layout Adjustment Design

## Overview

This design addresses the enhancement of the video gallery section in JRavah.html to provide a more consistent, user-friendly video playback experience. The current implementation uses a Slick carousel with inline video playback that lacks uniformity and has navigation controls that need removal.

## Problem Statement

The current video section presents several user experience issues:

1. Video elements lack uniform sizing across all carousel items
2. Previous and Next navigation arrows interfere with the desired single-video interaction pattern
3. The Back button is external to the video player controls
4. Videos are muted by default with no clear audio indication
5. Clicking a video should isolate playback to that specific video only

## Objectives

The redesign will achieve the following goals:

- Enforce consistent dimensions for all video items regardless of source video aspect ratio
- Remove carousel navigation arrows to prevent multi-video browsing
- Integrate a Back button overlay within the video player interface
- Enable audio playback by default or provide clear audio activation
- Ensure only the clicked video plays while all others remain paused

## Current Implementation Analysis

### Existing Structure

The video section currently uses:
- Slick Carousel library for horizontal scrolling presentation
- Multiple slide containers, each containing a video element and play icon overlay
- Inline playback that toggles between thumbnail poster and playing state
- Navigation arrows enabled for browsing between videos
- Videos initialized with muted attribute

### Current Behavior

- User clicks on any slide to trigger video playback
- Video plays inline within the carousel structure
- All other videos pause when one begins playing
- Carousel auto-advances unless video is actively playing
- Play icon overlay disappears during playback
- No dedicated back-to-thumbnail control within the video interface

## Design Solution

### Uniform Video Sizing

All video items will maintain identical dimensions to ensure visual consistency:

| Attribute | Value | Purpose |
|-----------|-------|---------|
| Container aspect ratio | 16:9 or 9:16 | Consistent viewing experience based on content orientation |
| Maximum width | Defined by carousel slide width | Prevents overflow |
| Object-fit | cover | Fills container while maintaining source aspect ratio |
| Fixed height | Calculate based on container width | Eliminates variable heights |

The video container will enforce these dimensions regardless of the source video's native resolution.

### Carousel Navigation Removal

The Slick carousel configuration will be modified to disable navigation controls:

| Configuration Parameter | Current Value | New Value | Rationale |
|------------------------|---------------|-----------|-----------|
| arrows | true | false | Removes Previous/Next buttons |
| swipe | enabled | disabled | Prevents accidental slide changes during video interaction |
| draggable | enabled | disabled | Locks focus on selected video |

This ensures users interact with one video at a time without carousel interference.

### Integrated Back Button

A Back button will be overlaid within the video player interface:

**Visual Placement:**
- Position: Top-left or top-right corner of video player
- Z-index: Above video element but below potential fullscreen controls
- Visibility: Appears only when video is in playing state

**Interaction Behavior:**
- On click: Pause video, reset playback position to 0:00, return to thumbnail view
- Visual feedback: Hover state to indicate interactivity
- Accessibility: Keyboard navigable with clear focus indicator

**Design Attributes:**

| Property | Specification |
|----------|--------------|
| Background | Semi-transparent overlay (rgba with 70-80% opacity) |
| Icon | Left-pointing arrow or "Back" text label |
| Size | Touch-friendly minimum 44x44 pixels |
| Border radius | Consistent with overall design system |
| Transition | Smooth fade-in when video starts playing |

### Audio Enablement

Videos will support audio playback with clear user control:

**Default Audio State:**
- Videos start unmuted when user initiates playback
- Alternatively, display a prominent unmute prompt on first interaction

**Audio Control Strategy:**

Option A: Auto-unmute on play
- Remove or set muted attribute to false when video.play() is triggered
- Respect browser autoplay policies that may require user gesture

Option B: Explicit unmute control
- Display an audio icon overlay alongside the Back button
- Allow toggle between muted and unmuted states
- Persist user preference across video selections

The solution will implement Option A for streamlined experience, with Option B as fallback if browser policies restrict unmuted autoplay.

### Single Video Playback Isolation

When a user clicks any video:

**Behavior Flow:**

```
User clicks video thumbnail
    ↓
System pauses all other videos in the gallery
    ↓
System resets all other videos to timestamp 0:00
    ↓
System hides all other videos' playback controls
    ↓
System shows selected video with play controls
    ↓
Selected video begins playback with audio enabled
    ↓
Back button overlay appears within selected video
    ↓
User clicks Back button
    ↓
Video pauses, resets to 0:00
    ↓
Video hides, thumbnail re-appears
    ↓
Back button overlay disappears
```

**State Management:**

| State | Condition | Visual Representation |
|-------|-----------|----------------------|
| Idle | No video playing | All thumbnails visible with play icon overlay |
| Active | One video playing | Selected video visible with controls, others show thumbnails |
| Transitioning | User clicked Back | Video fades out, thumbnail fades in |

### Responsive Behavior

Video sizing will adapt across breakpoints while maintaining consistency:

| Breakpoint | Slides Visible | Container Width | Video Height |
|------------|----------------|-----------------|--------------|
| Desktop (>992px) | 3 | 33.33% of viewport - gaps | Calculated from 16:9 ratio |
| Tablet (600-992px) | 2 | 50% of viewport - gaps | Calculated from 16:9 ratio |
| Mobile (<600px) | 1 | 100% of viewport - padding | Calculated from 16:9 ratio |

All videos within each breakpoint will share identical dimensions.

## Implementation Considerations

### Video Container Structure

The slide container will enforce dimensions through CSS:

- Parent container sets explicit width based on carousel settings
- Video element inherits width: 100%
- Height is calculated via aspect-ratio property or padding-top hack
- Object-fit: cover ensures video fills container
- Overflow: hidden prevents aspect ratio mismatch visibility

### Back Button Integration

The Back button will be a sibling element to the video, positioned absolutely within the slide container:

- Button element with data-video-control attribute for JavaScript targeting
- Position: absolute with top and right/left offsets
- Display: none by default, becomes visible when parent has "playing" class
- Event listener prevents event bubbling to parent slide container
- Executes pause, reset, and state class removal on click

### Audio Control Logic

The video playback trigger will manage audio state:

- Remove muted attribute when transitioning from thumbnail to play state
- Wrap play() call in try-catch to handle browser autoplay restrictions
- If autoplay with audio fails, display unmute prompt overlay
- Log audio play success/failure for debugging

### Carousel Configuration Adjustment

The Slick initialization parameters will be updated:

- Set arrows: false to remove navigation buttons
- Set swipe: false to prevent touch/mouse dragging
- Set draggable: false to disable desktop drag
- Maintain responsive settings for slide count per breakpoint
- Keep or disable autoplay based on whether it should cycle when idle

### State Synchronization

When any video begins playing:

- Query all video elements within the carousel
- Filter out the currently clicked video
- Iterate through remaining videos to pause and reset
- Remove "playing" class from all other slide containers
- Add "playing" class only to the active slide container

## Accessibility Considerations

| Aspect | Implementation |
|--------|---------------|
| Keyboard navigation | Back button receives focus, activates on Enter/Space |
| Screen reader support | Back button has aria-label describing its function |
| Focus management | Focus moves to Back button when video starts, returns to slide on back |
| Audio indication | Provide visual indicator (icon) for muted/unmuted state |
| Video captions | Support for closed captions if source videos include them |

## Visual Design Specifications

### Video Thumbnail State

- Poster image displayed
- Play icon centered with hover scale effect
- Border radius consistent with design system
- Box shadow for depth

### Video Playing State

- Video element visible, poster hidden
- Back button overlay in corner
- Optional: Progress bar at bottom
- Optional: Current time / duration display
- Optional: Audio toggle icon

### Back Button Appearance

- Background: Semi-transparent dark overlay (e.g., rgba(0, 0, 0, 0.6))
- Icon color: White or brand color for visibility
- Size: 40x40 pixels minimum for touch targets
- Border radius: 8px for rounded corners
- Hover state: Slight brightness increase or scale animation

## Testing Criteria

The implementation will be validated against these scenarios:

1. All video thumbnails appear with identical width and height
2. Clicking any video thumbnail initiates playback of that video only
3. All other videos remain paused when one is playing
4. Back button appears within the video player interface upon play
5. Clicking Back button returns to thumbnail view and pauses video
6. Audio plays when video starts (or clear unmute prompt appears)
7. Previous and Next carousel arrows are not visible
8. Carousel does not advance slides automatically during idle state
9. Responsive breakpoints maintain uniform video sizing
10. Keyboard users can navigate to and activate Back button

## Success Metrics

The redesign will be considered successful when:

- Visual consistency: All video items display with uniform dimensions across all breakpoints
- Interaction clarity: Users can play a single video without carousel navigation interference
- Control accessibility: Back button is easily discoverable and functional within video interface
- Audio experience: Sound plays by default or unmute process is intuitive
- Performance: Video switching is smooth with no layout shifts- Audio experience: Sound plays by default or unmute process is intuitive
