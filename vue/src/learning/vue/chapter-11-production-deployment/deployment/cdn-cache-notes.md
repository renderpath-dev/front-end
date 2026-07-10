# CDN Cache Notes

- The CDN can cache hashed assets aggressively because their names change when content changes.
- The CDN should not cache `index.html` aggressively because it points to the current hashed assets.
- A rollback must restore the matching `index.html` and assets from the same build artifact.
- Purging only assets or only `index.html` can create a mixed-version page.
- Browser cache and CDN cache are different layers and must be reasoned about separately.
