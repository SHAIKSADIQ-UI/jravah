# Video Section Thumbnail Analysis

## Overview
This document describes the thumbnails used in the video section of the JRavah Foods website. The video section showcases food preparation videos with thumbnail images that represent each video content.

## Thumbnail Implementation Structure

### Container Structure
The video section uses a carousel-like implementation with the following key elements:
- `#videos`: Main section container
- `.videos-wrapper`: Scrollable wrapper for video cards
- `#videosTrack`: Track containing all video cards
- `.video-card`: Individual card containers for each video

### Thumbnail Elements
Each video card contains:
- An `<img>` element with class `.video-thumb` that serves as the thumbnail
- A play button with class `.custom-play-btn` overlaid on the thumbnail
- Data attributes linking the thumbnail to its corresponding video file

## Thumbnail Details

### Current Thumbnails
The video section currently features four thumbnails representing different food preparation processes:

| Thumbnail Index | Image Source | Alt Text | Associated Video |
|----------------|--------------|----------|------------------|
| 1 | `images/Chicken Pickle.png` | "Chicken Pickle Preparation" | ChickenPickle.mp4 |
| 2 | `images/dryfruitladoo.jpeg` | "Dry Fruit Ladoo Preparation" | Dryfruitladoo.mp4 |
| 3 | `images/nallakaaram.jpg` | "Karapodi Preparation" | Karampodi.mp4 |
| 4 | `images/Mushroom.jpg` | "Mushroom Pickle Preparation" | MushroomPickle.mp4 |

### Thumbnail Styling
Thumbnails are styled with the following characteristics:
- Fixed aspect ratio of 16:9
- Width of 300px with flexible height
- Object fit set to "cover" to maintain proportions
- Rounded corners (8px border radius)
- Full coverage of the video card container

### Interactive Behavior
1. Thumbnails are displayed by default in each video card
2. When a user clicks the play button:
   - The thumbnail image is hidden
   - A video player is dynamically inserted in place of the thumbnail
   - The video begins playing automatically
3. When a user exits the video:
   - The video player is removed
   - The thumbnail image is displayed again

## Technical Implementation Notes

### JavaScript Functionality
The `food-videos.js` file handles the dynamic behavior:
- Maps data attributes to actual video filenames (e.g., 'MushroomPickle' maps to 'MushroomPickle.mp4')
- Manages the show/hide state of thumbnails
- Controls video playback and cleanup

### Responsive Design
Thumbnail presentation adapts to different screen sizes:
- Mobile: 15px gap between cards
- Tablet: 25px gap between cards
- Desktop: 45px gap between cards

### Accessibility Features
- All thumbnails include descriptive alt text
- Play buttons include aria-label attributes
- Proper z-index management for interactive elements- Play buttons include aria-label attributes
