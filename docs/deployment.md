# Deployment (GitHub Pages)

The site is deployed by `.github/workflows/deploy.yml` on every push to `main`. The workflow lints the
code and uploads the `src/` folder as the Pages artefact.

## One-time setup

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` (or run the workflow from the **Actions** tab).
3. The site is published at <https://mdraiyanalam.github.io/aracploywrap-bootstrap-2021/>.

## Custom domain

1. Add the domain under **Settings → Pages → Custom domain** and create the DNS records GitHub shows.
2. Add a `src/CNAME` file containing the domain.
3. In `src/404.html` change `<base href="/aracploywrap-bootstrap-2021/">` to `<base href="/">`.
4. Replace `https://mdraiyanalam.github.io/aracploywrap-bootstrap-2021/` with the new URL in the canonical/Open Graph
   tags, `src/robots.txt` and `src/sitemap.xml`.

All other links are relative, so they work at a domain root and under a sub-path alike.
