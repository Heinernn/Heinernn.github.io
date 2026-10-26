# Portfolio website

My personal website: a single page with about, skills, projects, experience and contact. It is plain HTML, CSS
and a little JavaScript, with no build step and no dependencies. It follows the light or dark mode of the device
and works on phones.

## Files

- `index.html`: the content
- `styles.css`: the design
- `script.js`: builds the links to my GitHub repositories (set `GITHUB_USER` at the top of the file)
- `cv.pdf`: the CV that the "Download CV" button serves

## Run it locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Publish it with GitHub Pages

1. Create a repository named `Heinernn.github.io` and upload these files to its root.
2. In the repository, go to Settings > Pages and choose the `main` branch, folder `/ (root)`.
3. After a minute the site is live at `https://Heinernn.github.io`.

## Update it

- Change the text in `index.html`.
- Replace `cv.pdf` when the CV changes.
