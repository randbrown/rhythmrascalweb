# release-assets

Files that are part of the website but too large for Cloudflare Pages, which caps
individual assets at 25 MiB. They are **not committed** to git (see `.gitignore`);
instead they are attached to a GitHub Release on this repo and linked from the site.

| File | Size | Linked from |
| :-- | :-- | :-- |
| `Original-Music-Free.zip` | 33 MiB | `sampleZipUrl` in `src/data/nav.ts` (Download and FAQ pages) |

## Publishing

The release is tagged `assets` so the download URL stays stable:

```
https://github.com/randbrown/rhythmrascalweb/releases/download/assets/Original-Music-Free.zip
```

Create it once (requires the repo to be pushed and the `gh` CLI signed in):

```bash
gh release create assets release-assets/Original-Music-Free.zip --title "Site download assets" --notes "Large files linked from rhythmrascal.com that exceed the Cloudflare Pages 25 MiB per-file limit."
```

To add or replace a file on the existing release:

```bash
gh release upload assets release-assets/Original-Music-Free.zip --clobber
```

Release assets are only publicly downloadable when the repository is **public**.
If the repo must stay private, host the file in a Cloudflare R2 bucket with a
public custom domain instead and update `sampleZipUrl` (and the matching line in
`public/_redirects`).
