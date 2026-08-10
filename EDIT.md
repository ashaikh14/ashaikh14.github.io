# Editing this site

All text and listings live in **`content.js`**.

1. Open `content.js`
2. Edit the fields you want (bio, experience, awards, writings, etc.)
3. Save and refresh the browser
4. To publish: commit and push to GitHub

## Artwork

The gallery is currently empty. When you are ready, add items to `artwork` in `content.js` like:

```js
artwork: [
  {
    src: "artwork/web/your-image.jpeg",
    title: "01 — Title",
    alt: "Description",
    feature: true,  // optional larger tile
    tall: false     // optional tall tile
  }
]
```

Then put the image file in `artwork/web/` and push.

## Files

| File | Purpose |
|------|---------|
| `content.js` | **Edit this** — all site content |
| `render.js` | Builds the page from content (usually leave alone) |
| `index.html` | Layout, styles, animations |
