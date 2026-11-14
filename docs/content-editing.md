# Editing content

All content is plain HTML in `src/`. There is no build step: what you commit is what is published.

| What                         | Where                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------ |
| Navigation                   | `<header>` in `src/index.html` (keep `href="#section-id"` in sync)             |
| Hero slides                  | `#home` carousel in `src/index.html`                                           |
| Products                     | `#products` timeline in `src/index.html` **and** `src/catalogue/index.html`    |
| Statistics                   | `#achievements` — change both the text and the `data-count-to` value           |
| Service levels (rings)       | `#testimonials` — change `style="--value: N"`, `aria-valuenow` and the label   |
| Phone / e-mail / addresses   | Contact section, footer (all three pages) and catalogue contact box            |
| Colours, spacing, typography | Design tokens at the top of `src/assets/css/main.css`                          |
| Images                       | `src/assets/images/` — keep the same file names or update the `src` attributes |

## Before launch

Search the project for `TODO` and `SAMPLE` and replace:

- the placeholder phone number `+880 XXXX-XXXXXX` and e-mail `info@example.com`;
- the sample testimonials and illustrative service-level figures (remove the yellow badges once real).

Run `npm run lint` before committing.
