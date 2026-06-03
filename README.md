# Project FIZIKA — Website

A site for **Project FIZIKA**, a youth-led STEM enrichment
initiative. Static HTML + Tailwind CSS.
---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, mission, impact stats, program previews, featured resources, quote, CTA |
| `programs.html` | The five programs as editorial features + "how it works" |
| `resources.html` | Searchable / filterable library of PDF handouts & solutions |
| `contact.html` | Purpose-specific email inboxes, social links, FAQ |

## Shared assets

| File | What it holds |
|------|---------------|
| `assets/tw-config.js` | Tailwind theme tokens (colors, fonts) — shared by every page |
| `assets/styles.css` | The editorial layer: drop caps, grain, blueprint grid, buttons, reveal animations |
| `assets/main.js` | Mobile nav, sticky header, scroll-reveal, stat count-up, resource filtering |

---

## Run it locally

Just open `index.html` in a browser. For nicer behaviour (relative paths, etc.)
serve it:

```bash
cd "FIZIKA Website"
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (free)

- **Netlify / Cloudflare Pages:** drag this folder onto the dashboard. Done.
- **GitHub Pages:** push to a repo → Settings → Pages → deploy from `main`, root.

---

## Swapping in your real content

Everything below is a placeholder — search-and-replace at your leisure.

### 1. Email addresses
Replace these across all four files (they appear in the header CTA, contact
cards, FAQ, and footer):

- `hello@projectfizika.org` — general
- `join@projectfizika.org` — volunteers
- `partners@projectfizika.org` — school partnerships

### 2. Social links
In `contact.html` (info panel) and every footer, the social icons currently
point to `href="#"` / `contact.html`. Replace with your real Instagram,
LinkedIn, YouTube, and GitHub URLs.

### 3. Resource PDFs
In `resources.html`, every download button is `<a href="#" …>`. Point each at
its real PDF, e.g. `href="pdfs/rotational-dynamics.pdf"`. To add a new resource,
copy any `<div data-resource …>` row and set:
- `data-subject="physics|mathematics"` (the project's four pillars are Physics, Mathematics, Engineering, Computing — add `engineering` / `computing` groups + matching filter buttons when ready)
- `data-type="handout|solutions|slides|problem-set"`
- `data-search="lowercase keywords for the search box"`

Filtering/search picks it up automatically — no JS changes needed.

### 4. Stats & copy
Home-page impact numbers live on `index.html` as
`data-count="1200"` etc. Program details, the student quote, and all body copy
are plain text — edit in place.

### 5. Logo
The mark is an inline SVG "atom" (also the favicon). Swap the `<svg>` in each
header/footer if you have your own logo.

---

## Notes

- **Tailwind via Play CDN.** Great for zero-config editing; it prints a console
  notice that it's not for production. Totally fine for launch. To remove it
  later, compile Tailwind properly (`npx tailwindcss -i in.css -o out.css`) using
  the tokens already in `assets/tw-config.js`.
- **Accessibility:** semantic landmarks, skip link, keyboard-focus rings, labelled
  icon buttons, `prefers-reduced-motion` fully respected, AA-contrast palette.
- **No tracking, no cookies, no dependencies** beyond Google Fonts + the Tailwind CDN.

Built with the `ui-ux-pro-max` design system.
