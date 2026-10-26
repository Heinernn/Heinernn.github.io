# Portfolio website

Live: https://heinernn.github.io

A single-page site with a WebGL background, scroll animations and an English / Spanish switch. There is no build
step: it is plain HTML, CSS and JavaScript, so GitHub Pages serves it as it is.

## What is in it

- **WebGL:** the hero background is a fragment shader (domain-warped noise) that reacts to the mouse. It pauses when
  the hero is off screen or the tab is hidden.
- **GSAP + ScrollTrigger:** word-by-word headings, counters, a typed terminal, a checklist and a timeline that
  fills as you scroll.
- **Lenis:** smooth scrolling.
- **Accessibility:** semantic HTML, a skip link, visible focus, keyboard friendly, and `prefers-reduced-motion`
  turns the animations off. If the animation libraries fail to load, the page still shows all its content.
- **i18n:** English text lives in the markup; the Spanish strings are in `script.js`. It starts in the visitor's
  browser language and remembers the choice.

## Files

- `index.html`: content and structure
- `styles.css`: design tokens and layout
- `script.js`: shader, animations and translations
- `cv.pdf`: the CV served by the "Download CV" button
- `favicon.svg`, `og.png`: icon and social preview image

## Run it locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

GSAP, ScrollTrigger and Lenis load from a CDN (pinned versions), so it needs an internet connection.

## Update it

- Change the text in `index.html` (and the Spanish version in `script.js`).
- Replace `cv.pdf` when the CV changes.
- Push to `main`; GitHub Pages redeploys in about a minute.
