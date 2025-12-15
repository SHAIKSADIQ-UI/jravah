# Food Videos Implementation

This implementation adds a responsive video gallery section to the JRavah website with auto-scrolling thumbnails that can be played as YouTube videos.

## Features Implemented

1. **Responsive Video Gallery**:
   - Horizontal auto-scrolling video thumbnails
   - Device-specific behavior (mobile/desktop)
   - Consistent card sizing with shimmer loading effect

2. **Mobile Experience**:
   - Smooth infinite horizontal auto-scroll at slower speed
   - Touch interaction pauses auto-scroll
   - Tap on play button converts card to YouTube player
   - Auto-scroll resumes 3 seconds after video close

3. **Desktop Experience**:
   - Smooth infinite auto-scroll at faster speed
   - Hover interaction pauses auto-scroll
   - Click on play button opens inline YouTube video
   - Auto-scroll resumes after video closes

4. **Video Player Features**:
   - YouTube embedded player with autoplay
   - Back button to return to thumbnail view
   - Single video playback isolation
   - Consistent video sizing

## Files Added/Modified

### New Files
- `css/food-videos.css` - Styles for the video gallery
- `js/food-videos.js` - JavaScript functionality for video playback
- `tests/food-videos.test.js` - Test file for the implementation

### Modified Files
- `JRavah.html` - Added the food videos section to the homepage

## How It Works

1. **HTML Structure**:
   - The video gallery is contained within a `.food-videos-section`
   - Videos are displayed in a `.videos-track` container
   - Each video is represented by a `.video-card` with a thumbnail and play button

2. **CSS Styling**:
   - Flexbox layout for horizontal scrolling
   - CSS animations for auto-scrolling and fade-in effects
   - Media queries for device-specific behavior
   - Shimmer effect for loading states

3. **JavaScript Functionality**:
   - Event listeners for play buttons
   - Auto-scroll control (pause/resume)
   - YouTube iframe embedding
   - Back button handling
   - Single video playback isolation

## Integration with Existing Codebase

The implementation follows existing patterns in the JRavah codebase:
- Uses similar CSS variable names and styling approaches
- Follows the same event handling patterns
- Integrates with existing video controller concepts
- Maintains consistent design language

## Customization

To customize the video gallery:

1. **Add/Change Videos**:
   - Modify the HTML in `JRavah.html` to add/remove video cards
   - Update `data-video` attributes with YouTube video IDs
   - Update thumbnail image sources

2. **Adjust Styling**:
   - Modify `css/food-videos.css` to change colors, sizes, animations
   - Adjust scroll speed in media queries
   - Customize button styles

3. **Modify Behavior**:
   - Edit `js/food-videos.js` to change interaction patterns
   - Adjust auto-scroll timing
   - Add additional video controls

## Testing

Run the tests in `tests/food-videos.test.js` to verify the implementation works correctly.

## Browser Support

The implementation uses modern CSS and JavaScript features:
- CSS Flexbox
- CSS Animations
- ES6 JavaScript
- YouTube iframe API

Works in all modern browsers (Chrome, Firefox, Safari, Edge).