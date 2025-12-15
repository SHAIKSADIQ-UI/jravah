# Social Media Links Update Design Document

## Overview
This document outlines the design for updating social media links in the JRavah Foods website footer. The objective is to add proper URLs to the social media icons in the footer across all pages to improve user engagement and brand presence.

## Current State Analysis
Based on the code review, the website has social media icons in the footer section across multiple pages:
- JRavah.html (main page)
- about.html
- contact.html

Currently, all social media icons have placeholder links with `href="#"`.

## Requirements
1. Update Facebook icon link to: https://www.facebook.com/people/JRavahfoods/61576078651543/
2. Update YouTube icon link to: https://www.youtube.com/@jrfarmsagri8903
3. Update Instagram icon link to: https://www.instagram.com/jravahfoods/

These links should be applied consistently across all pages that contain the footer with social media icons.

## Implementation Plan

### Pages to Update
All pages containing the footer with social media icons need to be updated:
- JRavah.html (main page)
- about.html
- contact.html
- Pickels.html
- Spices.html
- Snacks.html
- Sweets.html
- shopus3.html
- viewcart.html

### Update Details
The footer contains a section with social media links:
```html
<div class="footer-social">
  <a href="#" class="social-link" aria-label="JRavah on Instagram"><i class="fa-brands fa-instagram"></i></a>
  <a href="#" class="social-link" aria-label="JRavah on Facebook"><i class="fa-brands fa-facebook-f"></i></a>
  <a href="#" class="social-link" aria-label="JRavah on YouTube"><i class="fa-brands fa-youtube"></i></a>
</div>
```

Each link with `href="#"` needs to be updated with the appropriate social media URL.

### Link Mapping
| Social Media | Icon Class | Current Link | New Link |
|--------------|------------|--------------|----------|
| Instagram | fa-instagram | # | https://www.instagram.com/jravahfoods/ |
| Facebook | fa-facebook-f | # | https://www.facebook.com/people/JRavahfoods/61576078651543/ |
| YouTube | fa-youtube | # | https://www.youtube.com/@jrfarmsagri8903 |

## Validation Criteria
1. All social media icons in footers across pages must link to correct URLs
2. Links must open in the same window/tab (no target="_blank" needed unless already present)
3. Icons must maintain their styling and accessibility attributes
4. Footer layout and responsiveness must remain unchanged

## Rollout Strategy
1. Update each HTML page with the new social media links
2. Test links on each page to ensure they navigate correctly
3. Verify that the footer design remains consistent across all device sizes
4. Confirm that no other instances of these social links exist elsewhere in the site that would need updating

## Risk Assessment
- Low risk: Changes are limited to static link attributes
- No functional changes to page structure or styling
- No impact on existing page functionality
- Minimal chance of breaking changes since only href attributes are modified

## Success Metrics
- All social media icons correctly navigate to their respective platforms
- No broken links in footer sections
- Consistent footer appearance across all pages
- Maintained accessibility standards- Consistent footer appearance across all pages
