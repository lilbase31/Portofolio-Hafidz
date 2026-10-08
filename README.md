# Hafidz — Portfolio

Static portfolio for graphic design and video editing. Open `index.html` through any static web server. No build step, API key, or backend is required.

## Files
- `index.html`: page sections and accessible project dialog.
- `styles.css`: responsive dark/burgundy design, portrait silhouette, transitions and reduced-motion support.
- `app.js`: category filters, pagination, project previews, video cleanup, mobile navigation and scroll effects.
- `projects.js`: 27 portfolio assets: 15 designs and 10 videos from Cloudinary, plus 2 YouTube videos.
- `assets/hafidz-burgundy.webp`: optimized portrait.

## Updating work
Edit `window.PORTFOLIO.projects` in `projects.js`. Each entry has `id`, `title`, `type` (`image` or `video`), `category` (`design` or `video`), `src`, `thumbnail`, `width`, and `height`. Use publicly accessible HTTPS media URLs. Videos load only when a visitor opens their preview. Change email links in `index.html` when updating the contact address.

The hero uses a CSS/SVG silhouette clip over the original portrait because the supplied generated image still contains a background. Replace it with a true transparent cutout and remove the clip-path rule if a better cutout is supplied.

## Hosting
Serve this directory as a static site, for example with GitHub Pages (main branch, repository root) or an existing static hosting integration. All local paths are relative, including for GitHub Pages project URLs.

## Verification
JavaScript syntax and local file/anchor references were checked. Browser QA was blocked by the browser's inability to reach the local preview server; mobile layout and actual video playback should be visually reviewed on the hosted site.

## YouTube projects
Use `type: "video"`, `category: "video"`, `provider: "youtube"`, an 11-character `youtubeId`, and a public watch URL in `src`. Thumbnails appear in the grid; the privacy-enhanced iframe is created on click and removed when the preview closes. A YouTube fallback link remains available if embedding is restricted. Category counts are calculated from the data. Actual playback depends on YouTube availability and the owner allowing embedding.

## Background and display type
All page sections share one continuous burgundy/wine/plum body background, with a noninteractive grain overlay. Anton is self-hosted under the included OFL license. The hero lettering uses SVG textLength for full-width fitting, negative letter spacing, and a taller responsive SVG box. Its fill retains 100% opacity at the top and 20% at the bottom.
