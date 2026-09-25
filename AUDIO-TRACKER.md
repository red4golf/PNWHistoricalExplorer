# Audio Narration Tracker — PNW Historical Explorer

**Single source of truth for the location audio.** Any task, skill, or session that touches
narration, audio files, entry rewrites, deploys, or the Replit sync reads this file first and
updates it in the same session it changes anything. Created 2026-09-24.

## What the audio is — read before doing anything

The audio is **not a reading of the entry text.** Each file is a full tour-guide script: a
spoken, guide-voice walk through the place, written for the ear. A new narration therefore
needs a new script written from the verified entry, reviewed, then recorded. Never generate
audio by feeding the article text to a voice model.

Rules:
1. A script is written only from an entry whose text is `verified` (or hand-fixed and signed
   off). If the entry text changes after a script is written, the script goes back to `drafted`.
2. Scripts get the same accuracy standard as the entries: every factual line must trace to the
   entry's sources; no booster language, no unattributed superlatives, neutrality rule applies.
3. Indigenous Heritage entries follow the same hold as the text pipeline.
4. Old audio is never deleted. Originals are kept in `_archive/audio-originals/`.

## Status lifecycle (use these exact values)

| Column | Values |
|---|---|
| Group | `A` re-script needed (text 60%+ rewritten) · `B` review (text partly changed) · `C` text unverified, re-script after the entry is verified · `HOLD` |
| Script | `none` → `drafted` → `board-reviewed` → `approved` |
| New audio | `none` → `generated` → `approved` |
| Live (Astro) / Live (Replit) | `—` until deployed, then the date it went live |

Where things live:
- New scripts: `audio-scripts/<slug>.md`
- New audio, before it goes live: `audio-staging/<slug>.mp3`
- Going live: the approved file replaces `public/audio/<slug>.mp3`, then push to main. Record
  the date in Live (Astro) once the GitHub Actions deploy succeeds and the page plays the new file.
- Replit: upload the same file there separately and record the date in Live (Replit).
- MD5 is the first 10 characters of the file's MD5 hash, used to confirm a file really was replaced.

## Baseline (measured 2026-09-24)

- 36 entries have audio; 59 have none. All 36 files were recorded from the original Replit
  text and brought over in the 2026-06-12 migration. None has been re-recorded since.
- "Text changed" = word-level difference between the entry at migration (commit `fc0a56d`)
  and live (commit `8d7a31a`).
- Group A: 25 · Group B: 4 · Group C: 6 · HOLD: 1
- **All 36 current players are live on both sites and still play the old narration.**
- **No original scripts exist on disk.** The audio files are the only record of what is
  currently said. Transcribe a file before rewriting it if you want to reuse its guide material.

## Tracker

**Priority = expected reader traffic, highest first** (set 2026-09-24 at Charles's request, so the
narrations most likely to be heard get corrected first). Work top-down. Rows whose "Can start"
says *after entry is verified* (Group C) keep their place in line but can't be scripted until the
entry itself passes the text pipeline — skip past them and come back.

The ranking is an **estimate**, not measured site traffic: neither site currently reports per-page
views. It is based on how many people visit each real place (approximate public visitation
figures from general knowledge, not individually sourced) plus a bump for Bainbridge/Kitsap
locations, which are the site's home audience and where Isla's texts send callers. Replace it with
real page-view data when that exists (the Replit admin has a per-location analytics endpoint;
the Astro site runs GoatCounter at pnwhistory.goatcounter.com, but as of 2026-09-24 it has recorded
only 119 pageviews in total and 16 across these 36 location pages — far too few to rank by) and re-sort.

| Priority | Slug | Group | Current file | Length | MD5 | Recorded from text of | Text changed | Entry status | Script | Script date | New audio | Audio date | Live (Astro) | Live (Replit) | Notes | Traffic basis (estimate) | Can start |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | pike-place-market | A | /audio/pike-place-market.mp3 | 3:53 | 7911e0cec8 | 2026-06-12 | 98% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | ~10M visitors/yr; Seattle's top attraction | ready |
| 2 | winslow-ferry-terminal | A | /audio/winslow-ferry-terminal.mp3 | 6:39 | e3566ed0ed | 2026-06-12 | 98% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Busiest WSF route (~6M riders/yr); home audience + Isla texts link here | ready |
| 3 | multnomah-falls | A | /audio/multnomah-falls.mp3 | 2:52 | 9e335b638e | 2026-06-12 | 94% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | ~2M visitors/yr; Oregon's most-visited natural site | ready |
| 4 | mount-rainier-national-park | A | /audio/mount-rainier-national-park.mp3 | 2:54 | fb393b8dff | 2026-06-12 | 97% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | ~1.5–2M NPS visits/yr | ready |
| 5 | columbia-river-gorge | A | /audio/columbia-river-gorge.mp3 | 3:20 | c0a6a79fe0 | 2026-06-12 | 96% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Multi-million visits/yr across the Scenic Area; broad search term | ready |
| 6 | pioneer-square---klondike-gold-rush | A | /audio/pioneer-square---klondike-gold-rush.mp3 | 2:41 | 4d86e2794c | 2026-06-12 | 93% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Downtown Seattle district; heavy tourist foot traffic | ready |
| 7 | underground-seattle | A | /audio/underground-seattle.mp3 | 2:06 | 2b2405a0e0 | 2026-06-12 | 94% | corrected | none | — | none | — | — | — | Text rewritten; current audio narrates old version | One of Seattle's best-known tours; high search interest | ready |
| 8 | ye-olde-curiosity-shop | A | /audio/ye-olde-curiosity-shop.mp3 | 3:05 | 982e8fde31 | 2026-06-12 | 64% | corrected | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Seattle waterfront, heavy cruise/tourist foot traffic | ready |
| 9 | crater-lake-national-park | A | /audio/crater-lake-national-park.mp3 | 2:31 | b4c154644b | 2026-06-12 | 90% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | ~500–700K NPS visits/yr | ready |
| 10 | museum-of-flight | A | /audio/museum-of-flight.mp3 | 2:39 | f3862864b9 | 2026-06-12 | 98% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | ~500K+ visitors/yr | ready |
| 11 | vancouver-barracks | C | /audio/vancouver-barracks.mp3 | 3:42 | aa80756999 | 2026-06-12 | 1% | unverified | none | — | none | — | — | — | Text unchanged but not yet fact-checked; re-script after the entry is verified. NEXT in the text review queue (Charles, 2026-09-24) | Fort Vancouver NHS; high visitation in Vancouver, WA | after entry is verified |
| 12 | mount-st-helens-national-volcanic-monument | A | /audio/mount-st-helens-national-volcanic-monument.mp3 | 1:47 | 1bba457c77 | 2026-06-12 | 88% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Several hundred K/yr; high search interest | ready |
| 13 | tillamook-rock-lighthouse | A | /audio/tillamook-rock-lighthouse.mp3 | 2:51 | 3edc241d68 | 2026-06-12 | 72% | corrected | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Seen from Ecola SP / Cannon Beach, a very busy coast stop | ready |
| 14 | the-goonies-house | A | /audio/the-goonies-house.mp3 | 3:57 | 18b36582ba | 2026-06-12 | 98% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Famous film site; outsized search curiosity for its size | ready |
| 15 | fort-casey | A | /audio/fort-casey.mp3 | 1:55 | 597a344693 | 2026-06-12 | 98% | corrected | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Popular Whidbey state park, near the Keystone ferry | ready |
| 16 | fort-clatsop-national-memorial | A | /audio/fort-clatsop-national-memorial.mp3 | 3:11 | 282ca693f0 | 2026-06-12 | 86% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Lewis and Clark NHP; ~200K+/yr | ready |
| 17 | san-juan-island---the-pig-war | A | /audio/san-juan-island---the-pig-war.mp3 | 3:06 | afa0cd2e8c | 2026-06-12 | 87% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | San Juan Island NHP; ferry-borne summer tourism | ready |
| 18 | heceta-head-lighthouse | A | /audio/heceta-head-lighthouse.mp3 | 2:41 | 6bb9683490 | 2026-06-12 | 71% | corrected | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Popular Oregon coast lighthouse | ready |
| 19 | japanese-american-exclusion-memorial | B | /audio/japanese-american-exclusion-memorial.mp3 | 1:31 | 80557a17f9 | 2026-06-12 | 41% | verified | none | — | none | — | — | — | Partly changed; listen and compare before deciding | Bainbridge home audience; national significance | ready |
| 20 | hanford-secret-city-that-changed-the-world | A | /audio/hanford-secret-city-that-changed-the-world.mp3 | 5:45 | a86a499a08 | 2026-06-12 | 93% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Manhattan Project NHP; strong search interest, modest visits | ready |
| 21 | point-no-point-lighthouse | A | /audio/point-no-point-lighthouse.mp3 | 4:47 | fbbc62b1b3 | 2026-06-12 | 99% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Kitsap local; home-region audience | ready |
| 22 | clayton-beach | A | /audio/clayton-beach.mp3 | 2:11 | 9e964c6cb5 | 2026-06-12 | 73% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Larrabee SP, busy Chuckanut Drive stop | ready |
| 23 | port-gamble-historic-town | C | /audio/port-gamble-historic-town.mp3 | 2:47 | d0d08026c4 | 2026-06-12 | 1% | unverified | none | — | none | — | — | — | Text unchanged but not yet fact-checked; re-script after the entry is verified. Second in the text review queue (Charles, 2026-09-24) | Kitsap day-trip town; home-region audience | after entry is verified |
| 24 | fay-bainbridge-park | B | /audio/fay-bainbridge-park.mp3 | 6:29 | b0be0175ae | 2026-06-12 | 17% | corrected | none | — | none | — | — | — | Partly changed; listen and compare before deciding | Bainbridge local park; home audience | ready |
| 25 | pia-the-peacekeeper | C | /audio/pia-the-peacekeeper.mp3 | 3:11 | 359a13a816 | 2026-06-12 | 2% | unverified | none | — | none | — | — | — | Text unchanged but not yet fact-checked; re-script after the entry is verified | Troll sculpture; steady local/family visits | after entry is verified |
| 26 | whitman-mission-national-historic-site | A | /audio/whitman-mission-national-historic-site.mp3 | 3:02 | c6cbdb3d93 | 2026-06-12 | 91% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | ~50K/yr; remote | ready |
| 27 | celilo-falls | A | /audio/celilo-falls.mp3 | 4:28 | da952435b8 | 2026-06-12 | 85% | corrected | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Roadside viewpoint; niche interest | ready |
| 28 | bannack-state-park | B | /audio/bannack-state-park.mp3 | 5:01 | ca367f7d3d | 2026-06-12 | 19% | verified | none | — | none | — | — | — | Partly changed; listen and compare before deciding | Remote Montana ghost town; modest visits | ready |
| 29 | boeing-red-barn-historic-site-former-location | A | /audio/boeing-red-barn-historic-site-former-location.mp3 | 2:50 | c45a8e6266 | 2026-06-12 | 95% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Former site only, nothing to see; low | ready |
| 30 | fancher-field---first-trans-pacific-landing-site | B | /audio/fancher-field---first-trans-pacific-landing-site.mp3 | 4:20 | 643ffe76eb | 2026-06-12 | 32% | verified | none | — | none | — | — | — | Partly changed; listen and compare before deciding | Niche aviation-history interest | ready |
| 31 | bellevue-airfield | A | /audio/bellevue-airfield.mp3 | 2:04 | a7a867ee4c | 2026-06-12 | 92% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Former airfield; niche | ready |
| 32 | bowerman-airport-lanas-cafe | A | /audio/bowerman-airport-lanas-cafe.mp3 | 5:03 | 34822ed9f3 | 2026-06-12 | 82% | verified | none | — | none | — | — | — | Text rewritten; current audio narrates old version | Small-town airport; niche | ready |
| 33 | yama-village-historic-site | C | /audio/yama-village-historic-site.mp3 | 2:30 | 4960920d1c | 2026-06-12 | 1% | unverified | none | — | none | — | — | — | Text unchanged but not yet fact-checked; re-script after the entry is verified | Bainbridge; access limited; niche | after entry is verified |
| 34 | camp-yeomalt-cabin | C | /audio/camp-yeomalt-cabin.mp3 | 5:37 | 1483947456 | 2026-06-12 | 0% | unverified | none | — | none | — | — | — | Text unchanged but not yet fact-checked; re-script after the entry is verified | Bainbridge local; very low | after entry is verified |
| 35 | pasayten-airstrip---washingtons-highest-runway | C | /audio/pasayten-airstrip---washingtons-highest-runway.mp3 | 5:30 | ccb80fe104 | 2026-06-12 | 1% | unverified | none | — | none | — | — | — | Text unchanged but not yet fact-checked; re-script after the entry is verified | Wilderness airstrip; very low | after entry is verified |
| — | kennewick-man-discovery-site | HOLD | /audio/kennewick-man-discovery-site.mp3 | 4:27 | ebc18d68b6 | 2026-06-12 | 1% | unverified | none | — | none | — | — | — | Indigenous Heritage hold; no work until third-reviewer process exists | HOLD — not ranked | hold |

## Entries with no audio (59)

Not tracked row by row yet. If a new narration is commissioned for one of them, add a row
above with Group `NEW` and Current file `—`.

## Change log

- 2026-09-24 — Tracker created from measured baseline. No scripts or new audio yet.
- 2026-09-24 — Winslow Ferry Terminal, Columbia River Gorge, Mount St. Helens: entry status in-review → verified (Charles signed off the hand-fixes).
- 2026-09-24 — Priority column added and rows re-sorted by estimated reader traffic (Charles's request).
