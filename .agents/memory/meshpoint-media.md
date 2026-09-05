---
name: Meshpoint media extraction
description: How the authorized Meshpoint intro footage is exposed for this project.
---

The original Meshpoint Systems homepage embeds its chaos intro footage as an inline base64 MP4 in the rendered page source rather than exposing a normal static video URL.

**Why:** Reusing the actual clip keeps the distinctive motion from the reference site without depending on a fragile cross-site media request.

**How to apply:** When updating the KATACHI / Meshpoint experience, keep the local MP4 asset and its image poster fallback together; preserve muted autoplay, looping, inline playback, and reduced-motion behavior.