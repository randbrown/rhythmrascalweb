# rhythmrascalweb

Static website for [Rhythm Rascal](https://rhythmrascal.com), a software drum machine for Windows.

This is a migration of the original ASP.NET 2.0 WebForms site (previously hosted at
`rhythmrascal.azurewebsites.net`) to a fully static site built with [Astro](https://astro.build)
and hosted on Cloudflare Pages. The content, layout, and colors were preserved; the table-based
layout was rebuilt with CSS flexbox and the pages now work on mobile screens.

## Requirements

- Node.js 22 (pinned in `.node-version`; Astro 5 needs 18.17+)

## Commands

| Command           | Action                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Install dependencies                                |
| `npm run dev`     | Start local dev server at `http://localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`              |
| `npm run preview` | Serve the built `dist/` folder locally              |

## Project layout

```
public/               Static assets copied verbatim to the site root
  Download/           Installers (current + OldVersions/) and Quick Start Guide.pdf
  images/             Logo, screenshots, and page images
  music/              Example projects (.zip) and MP3s
  _redirects          Cloudflare Pages redirects (old .aspx URLs, www -> apex)
  _headers            Cloudflare Pages cache/security headers
release-assets/       Files too big for Cloudflare Pages; published as GitHub Release assets (gitignored)
src/
  components/         Nav.astro, Footer.astro
  data/nav.ts         Menu items, site name, support email, sample-pack URL
  layouts/BaseLayout.astro   Shared page chrome (header, nav, footer, <head> metadata)
  pages/              One .astro file per page
  styles/global.css   Site stylesheet (ported from the original StyleSheet.css)
```

## Pages

| Route         | Old URL             | Source                     |
| :------------ | :------------------ | :------------------------- |
| `/`           | `/default.aspx`     | `src/pages/index.astro`    |
| `/features/`  | `/Features.aspx`    | `src/pages/features.astro` |
| `/download/`  | `/Download.aspx`    | `src/pages/download.astro` |
| `/register/`  | `/Register.aspx`    | `src/pages/register.astro` |
| `/samples/`   | `/Samples.aspx`     | `src/pages/samples.astro`  |
| `/faq/`       | `/FAQ.aspx`         | `src/pages/faq.astro`      |
| `/contact/`   | `/Contact.aspx`     | `src/pages/contact.astro`  |
| `/about/`     | `/AboutAuthor.aspx` | `src/pages/about.astro`    |
| `/whatsnew/`  | `/whatsnew.aspx`    | `src/pages/whatsnew.astro` |

## Notes on the migration

- **Contact form.** The old form posted to server-side code that sent email (with reCAPTCHA). A static
  site has no server, so the form now composes the message and opens the visitor's email client via a
  `mailto:` link. If a hosted form service (Formspree, Cloudflare Worker, etc.) is preferred later, only
  `src/pages/contact.astro` needs to change.
- **Removed dead third-party bits.** The Download.com mirror link and CNET badge (the badge image's
  domain is now squatted), and the legacy Google Analytics `ga.js` / `UA-` tracker, which stopped
  collecting data in 2023.
- **Updated external links** that had moved: .NET Framework, DirectX, Adobe Reader, Cakewalk, Adobe Audition.
- **Large binaries** (about 105 MB of installers and MP3s) live in `public/` so the site is
  self-contained. One file, the 33 MiB ORIGINAL-MUSIC sample pack, exceeds the Cloudflare Pages
  25 MiB per-file limit and is hosted as a GitHub Release asset instead. See
  [release-assets/README.md](release-assets/README.md).

## Hosting: Cloudflare Workers (static assets)

The site is hosted on Cloudflare Workers as a static-assets-only Worker at `rhythmrascal.com`
(DNS is also at Cloudflare). This is Cloudflare's current recommended platform for static sites;
it supports the same `_redirects` and `_headers` files as Cloudflare Pages.

**Project settings** (Workers & Pages, Create, Import a repository):

| Setting          | Value                |
| :--------------- | :------------------- |
| Production branch| `main`               |
| Build command    | `npm run build`      |
| Deploy command   | `npx wrangler deploy`|
| Path             | `/`                  |

There is no "output directory" field; `wrangler.jsonc` points Wrangler at `dist/`. Node version
is pinned by `.node-version` (22). No environment variables are needed. `wrangler` is a dev
dependency so the deploy step uses a known version.

**Custom domain:** `wrangler.jsonc` declares `rhythmrascal.com` and `www.rhythmrascal.com` as custom
domains, so the first deploy attaches them and Cloudflare creates DNS records and certificates.
`public/_redirects` sends `www` to the apex domain.

**Files Cloudflare reads from the build output:**

- `_redirects`: 301s from the old `.aspx` URLs, `www` to apex, and the moved sample pack.
- `_headers`: long-lived immutable caching for installers, music, images, and hashed assets.
- `404.html` (built from `src/pages/404.astro`) is served for unknown paths via `not_found_handling`.

Every push to `main` deploys production; pushes to other branches upload preview versions.

If the production domain ever changes, update `site` in `astro.config.mjs` (used for canonical and
Open Graph URLs), the `routes` in `wrangler.jsonc`, and the `www` rule in `public/_redirects`.

To deploy manually from a machine that is logged in with `npx wrangler login`:

```bash
npm run build && npx wrangler deploy
```
