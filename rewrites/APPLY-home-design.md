# Applying the home page design fixes

Branch: `fix/home-design-week-1`, based on `fix/board-week-1` (commit `1f88d92`) —
the branch you published for testing.

```bat
cd C:\DEV\Projects\PNWHistoricalExplorer
git checkout fix/board-week-1
git checkout -b fix/home-design-week-1
git am rewrites\0003-home-design.patch
npm run build
git push -u origin fix/home-design-week-1
```

If `git am` complains about line endings, use `git am --keep-cr` or fall back to
`git apply --3way rewrites\0003-home-design.patch` followed by a normal commit.

## What changed

| File | Change |
|---|---|
| `src/styles/global.css` | `text-wrap: balance` on `.hero h1`; `font-family` on `.btn`; active nav is a gold underline, not a filled pill |
| `src/styles/guide.css` | `.trust-line` rebuilt as a stat row with separators; new `.trust-note` |
| `src/pages/index.astro` | pin emoji dropped from the CTA; VS16 on the telephone; stat row markup; hero-card eyebrow deleted |
| `src/layouts/Base.astro` | VS16 on the telephone in the mobile bottom nav |

## Verification run before delivery

- `astro build` clean, 112 pages indexed
- axe-core 4.10, WCAG 2.0 + 2.1 A and AA: **0 violations** at 1440px and 390px
- H1 sets on one line at 1440 and 1280; at 1024 it breaks at the sentence
  boundary — "Find the place." / "Hear the story." — instead of orphaning "story."
- every `.btn` on the home, concierge and location pages now resolves to
  `-apple-system`; the hero CTA was previously Arial
- active-nav treatment checked on `/map`, `/about` and `/concierge`: single gold
  underline, no background fill, `aria-current` unchanged

## Two things to know

**The eyebrow contrast fix from earlier today is now moot.** I raised
"Start with the trip, not the database" from 1.09:1 to 7.5:1 in `0001`. That
element is now deleted. The `.guide-card .eyebrow` rule is left in place — it is
harmless and still correct if you ever reintroduce an eyebrow there.

**The stat row now reads 95 places · 36 audio stories · 9 categories.**
"2 reviewed entries" is out. Once the rewrite programme has moved the reviewed
count somewhere north of about twenty, that stat is worth putting back — it is
the one number on the page that no competing site can claim.
