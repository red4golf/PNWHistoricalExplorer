# Book-citation corrections — 2026-08-18

Follow-up to the 2026-08-18 book-citation audit (`book-audit-results.md`). Fixes
the 21 existing citations across the 10 already-rewritten entries, using the
audit's findings plus a fresh verification pass (real title/author confirmed,
and — where corrected — a genuine Amazon listing independently verified, never a
guessed ASIN).

**No change needed (already correct):**
- Museum of Flight — both books confirmed clean.
- Neah Bay and Cape Flattery — both books confirmed clean.
- Shasta Dam — both books were already hand-corrected during the original rewrite, before the systematic audit existed.

## Corrected — 4 already-LIVE entries (need a git push to take effect)

Files are in `live-fixed/`, built from the current live copies. Only the
`books:` frontmatter block changed — nothing else in these files was touched.

- **mukilteo-lighthouse.md** — dropped a fabricated "Ferry Tales" citation; corrected "Puget Sound" → **"Puget's Sound: A Narrative of Early Tacoma and the Southern Sound"** by Murray Morgan (title was missing its apostrophe and the old ASIN pointed nowhere real).
- **fort-casey.md** — dropped a fabricated "Whidbey Island: Images of America" citation and an unverifiable Lewarch citation (real archaeologist, no confirmable publication); corrected the Nelson lighthouse book to its real title, **"Umbrella Guide to Washington Lighthouses"** by Sharlene Nelson & Ted Nelson.
- **barkerville-historic-town.md** — kept the confirmed Richard Thomas Wright book; dropped a fabricated "The Fraser River Gold Rush" citation whose ASIN pointed to an unrelated Rockies photo book.
- **sawtooth-national-recreation-area.md** — dropped both original citations (one fabricated ASIN, one invented author "Tom Klokke"); replaced with the real book on the subject, **"Idaho Mountain Ranges"** by George Wuerthner.

These 4 entries are live on the site now with the old, bad citations — pushing
these 4 files replaces just the `books:` block in each.

## Corrected — 3 pending-review entries (already updated in place)

Patched directly in `rewrites/` (and noted in the matching `catalogue/` record):

- **oregon-state-capitol.md** — corrected both citations: **"Oregon's Capitol Buildings"** by Tom Fuller (was mistitled "A Building for the People"), and **"Salem"** by Tom Fuller, Christy Van Heukelem & Mission Mill Museum (was credited to a nonexistent "Steven J. Richardson").
- **fort-worden-battery-kinzie.md** — dropped two fully fabricated citations (including the invented "Jeannie Kaileen" book); corrected the other two to their real credited authors: **"Port Townsend"** by the Jefferson County Historical Society, and **"Lighthouses of Washington: A Guidebook and Keepsake"** by Ray Jones & Bruce Roberts.
- **columbia-river-gorge.md** — kept the two confirmed citations; dropped two fabricated ones (a non-existent "Wind Energy Development" consumer title, and a "Williams & Munger" citation whose ASIN pointed to an unrelated Lewis & Clark book).

## What to do with these

The 3 pending-review files were already delivered once; the versions in this
delivery supersede them — use these when you're ready to swap all five pending
entries into `src/content/locations/`.

The 4 live-fixed files are a smaller, standalone patch: dropping them into
`src/content/locations/` (overwriting just those 4 files) and pushing corrects
the book citations on the live site without touching anything else about those
entries.
