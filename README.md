# Xi-jajno

A static website for a Chinese restaurant, built with plain HTML, CSS and JavaScript (jQuery), with Bootstrap for styling. Content is bilingual (Serbian/English, toggled via the SRB/ENG links in the nav bar).

## Pages

- `index.html` — home page
- `jelovnik.html` / `jelovnik-kategorija.html` — menu, browsable by category, with a link to a downloadable PDF version
- `galerija.html` — photo gallery
- `o-nama.html` — about us
- `moj-nalog.html` — "my account": dish ratings and previous orders, stored in the browser's `localStorage` (no backend)

Shared navigation and footer (`templates/navigation.html`, `templates/footer.html`) are pulled into each page at runtime via jQuery `.load()`.

## Running locally

Since it's a static site, you can just open `index.html` directly in a browser, or serve the folder with any static file server.

## Running with Docker

The site is served by a minimal `nginx:alpine-slim` container:

```bash
docker compose up -d --build
```

This builds the image from the local source and starts it on port `30001`. The compose file expects an external `proxy-net` Docker network and is meant to run behind [Nginx Proxy Manager](https://nginxproxymanager.com/), which is pointed at the `kineski-restoran` container on port `30001` (or `80` over the shared network) via its own UI.
