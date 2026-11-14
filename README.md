<div align="center">

<img src="src/assets/images/brand/logo.png" alt="ARAC Polywrap Limited" width="184" />

# ARAC Polywrap — corporate website (Bootstrap)

The website of **ARAC Polywrap Limited**, a Bangladeshi manufacturer of stretch, shrink, FMCG lamination,
agricultural, protection and custom-made polyethylene films. Built with **Bootstrap 5.3**, plain HTML, CSS and
JavaScript, and hosted on **GitHub Pages**.

[![Deploy](https://github.com/mdraiyanalam/aracploywrap-bootstrap-2021/actions/workflows/deploy.yml/badge.svg)](https://github.com/mdraiyanalam/aracploywrap-bootstrap-2021/actions/workflows/deploy.yml)
![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

**Live site:** <https://mdraiyanalam.github.io/aracploywrap-bootstrap-2021/>

</div>

This is a Bootstrap port of [aracpolywrap-nextjs](https://github.com/mdraiyanalam/aracpolywrap-nextjs), with the same
content and design and no framework or build step.

## Features

- Responsive one-page layout: hero carousel, product timeline, statistics, services, testimonials, about, contact
  with map, and catalogue download.
- Printable **product catalogue** page (`/catalogue/`) with a print-only letterhead, so visitors can save it as a PDF.
- Accessibility: skip link, landmarks, an ARIA carousel with a pause button, `role="meter"` rings, visible focus
  styles, and support for `prefers-reduced-motion`.
- SEO: canonical and Open Graph tags, `Organization` JSON-LD, `sitemap.xml`, `robots.txt`, and a web app manifest.
- Bootstrap and Bootstrap Icons load from jsDelivr with Subresource Integrity hashes.

## Project structure

```text
aracploywrap-bootstrap-2021/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Lint on pull requests
│   │   └── deploy.yml          # Lint + publish src/ to GitHub Pages on push to main
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
├── docs/
│   ├── content-editing.md      # Where each piece of content lives
│   └── deployment.md           # GitHub Pages and custom-domain setup
├── src/                        # ← the website (deployed as-is)
│   ├── index.html              # Home page
│   ├── catalogue/index.html    # Printable product catalogue
│   ├── 404.html                # Not-found page
│   ├── assets/
│   │   ├── css/main.css        # Design tokens + component styles on top of Bootstrap
│   │   ├── js/main.js          # Carousel, scroll effects, counters, meters, back-to-top
│   │   ├── images/{brand,hero,products}/
│   │   └── icons/              # Favicon, Apple touch and PWA icons
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .nojekyll
├── .editorconfig  .prettierrc.json  .htmlvalidate.json  .stylelintrc.json
├── package.json                # Dev tooling only (lint, format, local server)
├── CHANGELOG.md  CONTRIBUTING.md  LICENSE
└── README.md
```

## Getting started

Requirements: Node.js 22.22+ (see `.nvmrc`) (only for the dev tools; the site itself needs nothing).

```bash
npm install
npm start          # serves src/ at http://localhost:8080
```

You can also open `src/index.html` directly in a browser.

| Script           | What it does                                  |
| ---------------- | --------------------------------------------- |
| `npm start`      | Local server for `src/` with caching disabled |
| `npm run lint`   | html-validate + Stylelint + Prettier check    |
| `npm run format` | Format everything with Prettier               |

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which lints the site and publishes `src/` to GitHub Pages.
For first-time setup, go to **Settings → Pages → Source: GitHub Actions**. See [docs/deployment.md](docs/deployment.md)
for custom domains.

## Before go-live

Some content is still a placeholder. See [docs/content-editing.md](docs/content-editing.md#before-launch).

- Phone number and e-mail address (`+880 XXXX-XXXXXX`, `info@example.com`)
- Sample testimonials and illustrative service-level percentages (they show yellow "Sample" badges)

## License

[ISC](LICENSE) © Md Raiyan Alam
