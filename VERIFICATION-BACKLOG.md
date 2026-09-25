# Verification Backlog — books and location info not yet fact-checked

Living checklist for the 65 of 95 entries that have NOT been through the full
pnw-explorer-board pipeline (research -> write -> verify -> repair). Update this
file as entries get checked — move a row to DONE in REVIEW-TRACKER.md and delete
it from here, or mark its Status column when partially addressed.

**How to read this list:**
- `Style risk score` is from `corpus_metrics.py` (readability, banned adjectives,
  unattributed superlatives, duplication) — a proxy for how much unsourced/editorial
  content likely needs fixing. It does NOT measure factual accuracy directly.
- `Book flags` are MY best-effort read against my own training knowledge only —
  NOT a live web check. Amazon URLs can't be mechanically verified (Amazon returns
  HTTP 200 for literally any ASIN, real or fake, confirmed this session), so every
  flagged book still needs a real research pass before anything is corrected or
  dropped. An unflagged book is not confirmed clean — it just means I didn't spot
  an obvious problem; the pipeline has caught fabricated books I initially found
  plausible-sounding at a rate of roughly 60% across every batch run so far.
- `Held` = Indigenous Heritage category; the pipeline's non-negotiable rule #6 blocks
  these from the standard pipeline until a third-reviewer process exists. Do not
  pick these for a normal rewrite even though they show up here for tracking.

## Resolved 2026-09-10: the "Jet City Rewind" book and 8 other entries

The 2026-09-10 discipline board (8 reviewers + 8 adversarial checkers, 0 fabricated
findings) confirmed the suspicion below: it could not verify "Jet City Rewind:
Aviation History of Seattle and the Pacific Northwest" by Timothy A. Nelson exists
under that title/author. The citation has been removed from all 5 aviation entries
that carried it. Along with 4 other entries from that day's top-5 priority list,
these 9 have been hand-corrected for their most serious violations (see
`REVIEW-TRACKER.md`'s new "HAND-FIXED" section and each entry's `catalogue/<slug>.md`
record) and are removed from the list below.

**Update, same day:** 4 of the 9 — old-idaho-penitentiary-state-historic-site,
the-goonies-house, boeing-red-barn-historic-site-former-location, and
fort-steele-heritage-town — have since gone through a full research/write/verify
pass (the first 3 through the standard repair/reverify pipeline; fort-steele by
hand after the automated pipeline failed twice on a reproducible environment
bug unrelated to its content), plus a small hand-fix for the last few remaining
objections in each case (protecting the usage budget instead of a third paid
agent round). All four are now `factcheck.status: verified` and have moved to
REVIEW-TRACKER.md's DONE table. boeing-red-barn's reverify actually returned a
`reject` verdict on its central claim — that Boeing built his first airplane
inside this specific building — a real finding, not a mechanical bug, and it
was rewritten around only the facts the source pack confirms. fort-steele's
redo replaced two fabricated book citations and confirmed no trace of the
original neutrality violation survived.

**Update 2026-09-13 (later same day):** bellevue-airfield and carson-mansion — the last
two entries from the 2026-09-10 discipline-board HAND-FIXED tier — both completed a full
research/write/verify pass and moved to REVIEW-TRACKER.md's DONE table. This closes out
the entire 2026-09-10 hand-fixed cohort: every one of those 9 entries has now either
graduated to a full verified pass or (for the aviation book-citation-only fixes) been
resolved via the "Jet City Rewind" book search documented above. None remain in this
tier.

## Next up (Charles, 2026-09-24)

**vancouver-barracks**, then **port-gamble-historic-town** — take these before anything else in the list below. See `rewrites/REVIEW-TRACKER.md` → NEXT UP.

## Full list (34 entries, worst style-risk first)

Update 2026-09-11: duwamish-longhouse (142) and port-blakely-mill-site (120) — the two worst-scoring non-held entries — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below.

Update 2026-09-12: olympic-hot-springs (114) and vista-house-at-crown-point (108) — the next two worst-scoring non-held entries (suquamish-tribal-grounds, 111, skipped as Held/Indigenous Heritage) — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below.

Update 2026-09-13: columbia-river-maritime-museum (106), virginia-city-historic-district (106), historic-strawberry-fields (104), and point-no-point-lighthouse (100) — the next four worst-scoring non-held entries (kennewick-man-discovery-site at 99 is next but Held/Indigenous Heritage) — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below. Note: point-no-point-lighthouse's fabricated "Point No Point: Treaty and Transformation" book citation carried the same fabricated ISBN (0870043218) already confirmed on other entries in this corpus — now confirmed fabricated a third time.

Update 2026-09-14: manzanar-national-historic-site (93) and coeur-dalene-mission-of-the-sacred-heart (92) — the next two worst-scoring non-held entries — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below. Note: the Coeur d'Alene Mission entry required a major reframe — its previous "successful cultural collaboration" narrative was found unsupported by research and replaced with an accurate account including the tribe's pre-contact epidemic population collapse and a century of subsequent land loss.

Update 2026-09-17: walla-walla-valley-wine-country (89), oregon-trail-interpretive-center (83), craters-of-the-moon-national-monument (82), and japanese-american-exclusion-memorial (81) — the next four worst-scoring non-held entries (mashel-prairie at 88 and treaty-rock at 83 skipped as Held/Indigenous Heritage) — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below. Note: the Oregon Trail Interpretive Center's Francis Parkman book citation, flagged in this list as a suspected fabricated/drifted subtitle, was confirmed fabricated — corrected to Parkman's real book, "The Oregon Trail: Sketches of Prairie and Rocky-Mountain Life." The Japanese American Exclusion Memorial entry superseded its 2026-07-12 partial-pass factcheck block, which had left later sections uncited.

Update 2026-09-22: bainbridge-island-historic-strawberry-fields (79), bannack-state-park (79), jacksonville-historic-district (79), and fort-ward (77) — the next four worst-scoring non-held entries (mashel-prairie at 88 and treaty-rock at 83 skipped as Held/Indigenous Heritage) — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below. Note: the Jacksonville Historic District entry superseded its 2026-07-12 partial-pass factcheck block; its fabricated "Lisa J. Bramlett" book citation was replaced with the real Margaret LaPlante title. Fort Ward's two book citations, both pointing to fabricated titles/ISBNs, were corrected to the authors' real books. Bannack State Park's Kittredge-attributed citation was confirmed misattributed (real author Krys Holmes) and deleted outright, no replacement found.

Update 2026-09-22 (later same session): fort-clatsop-national-memorial (74), clayton-beach (71), fort-nisqually-living-history-museum (70), and shasta-state-historic-park (68) — the next four worst-scoring non-held entries (fay-bainbridge-park at 68 skipped as Held/Indigenous Heritage) — completed a full research/write/verify pass this session and moved to REVIEW-TRACKER.md's DONE table. Removed from the list below. Note: both Fort Clatsop and Fort Nisqually superseded earlier partial-pass factcheck blocks (2026-07-09 and 2026-07-12 respectively). Shasta State Historic Park's two book citations, flagged in this list as suspect, were both confirmed fabricated (neither Boessenecker's nor Varney's real bibliography contains the cited titles) and deleted with no replacement found — `books: []` confirmed as the correct outcome.

| Slug | Category | Held | Style risk | Books | Book flags |
|---|---|---|---|---|---|
| museum-at-warm-springs | Indigenous Heritage | Y | 177 | 2 |  |
| yakama-nation-museum | Indigenous Heritage | Y | 171 | 2 | "Yakama Nation Treaty Days, 1855" by Yakama Nation Museum — vague org-as-author, unverified; "Click Relander: Yakima Valley Author and Historian" by Robert Ruby & John Brown — unusual biographical title, unverified |
| tamstslikt-cultural-institute | Indigenous Heritage | Y | 168 | 2 | "Weyíiletpuu Iceyéeye Weyíiletpuu: As Days Go By, Weyíiletpuu Lives On" by Confederated Tribes of the Umatilla — title text looks garbled/corrupted, needs re-verification regardless of held status |
| first-peoples-buffalo-jump-state-park | Indigenous Heritage | Y | 127 | 2 |  |
| chief-seattles-burial-site | Indigenous Heritage | Y | 122 | 2 |  |
| suquamish-tribal-grounds | Indigenous Heritage | Y | 111 | 2 |  |
| kennewick-man-discovery-site | Indigenous Heritage | Y | 99 | 2 |  |
| nez-perce-national-historical-park | Indigenous Heritage | Y | 94 | 2 |  |
| mashel-prairie | Indigenous Heritage | Y | 88 | 3 |  |
| treaty-rock | Indigenous Heritage | Y | 83 | 2 |  |
| fay-bainbridge-park | Indigenous Heritage | Y | 68 | 4 |  |
| frog-rock | Landmarks and Memorials |  | 67 | 3 |  |
| camp-yeomalt-cabin | Landmarks and Memorials |  | 66 | 0 |  |
| ebeys-landing-national-historical-reserve | Towns and Settlements |  | 64 | 2 | "Ebeys Landing: Island in Time" by Island County Historical Society — vague org-as-author, unverified |
| tillamook-rock-lighthouse | Maritime |  | 62 | 2 |  |
| glacier-national-park | Natural Wonders |  | 58 | 2 | "Glacier National Park: Crown Jewel of the Continent" by Will MacPheat — author name not recognized, possibly fabricated |
| heceta-head-lighthouse | Maritime |  | 54 | 2 |  |
| pioneer-courthouse-portland | Culture and Community |  | 54 | 2 |  |
| fort-flagler | Military and Conflict |  | 52 | 2 | "Guardian of the Sound" by Port Townsend Marine Science Center — vague org-as-author, unverified; "Coast Artillery Corps: Seacoast Fortifications" by Emanuel Raymond Lewis — real author but title looks reordered from his actual book 'Seacoast Fortifications of the United States' - check exact title |
| pasayten-airstrip---washingtons-highest-runway | Aviation and Transportation |  | 52 | 1 |  |
| pia-the-peacekeeper | Culture and Community |  | 47 | 0 |  |
| celilo-falls | Indigenous Heritage | Y | 44 | 2 |  |
| underground-seattle | Towns and Settlements |  | 39 | 2 |  |
| snoqualmie-falls | Natural Wonders |  | 38 | 2 | "A Guide to the Indian Tribes of the Pacific Northwest" by Ruby, Brown, Collins, Trafzer — real book by Ruby & Brown; 4th co-author Trafzer not recalled as credited - possible fabricated addition |
| vancouver-barracks | Military and Conflict |  | 33 | 2 |  |
| shanghai-tunnels-portland | Maritime |  | 30 | 2 | "Shanghai Tunnels of Portland" by William Bottoms — author/title combo not recognized, possibly fabricated |
| ye-olde-curiosity-shop | Culture and Community |  | 30 | 0 |  |
| oregon-vortex | Natural Wonders |  | 28 | 2 |  |
| bruce-lee-brandon-lee-lake-view-cemetery | Culture and Community |  | 27 | 0 |  |
| yama-village-historic-site | Culture and Community |  | 26 | 2 |  |
| bloedel-reserve | Natural Wonders |  | 24 | 2 |  |
| historic-port-townsend---victorian-seaport | Towns and Settlements |  | 22 | 2 |  |
| port-gamble-historic-town | Towns and Settlements |  | 20 | 2 | "Mill Town: Reckoning with What Remains" by Kerri Arseneault — this real book is about Millinocket, MAINE, not Port Gamble WA - likely wrong-context citation |
| port-madison | Towns and Settlements |  | 6 | 2 |  |

## Progress

- 61 of 95 entries fully verified (research -> write -> verify -> repair/hand-fix), catalogue record on file. Up from 38: columbia-river-maritime-museum, virginia-city-historic-district, historic-strawberry-fields, and point-no-point-lighthouse completed a full pass 2026-09-13 — the next four worst-scoring non-held entries on this backlog (style-risk 106, 106, 104, and 100; kennewick-man-discovery-site at 99 skipped as Held/Indigenous Heritage). Same day, bowerman-airport-lanas-cafe, fancher-field---first-trans-pacific-landing-site, and sand-point-naval-air-station were closed out via a dedicated book-citation search (see note above) and also moved to verified. Later the same day, bellevue-airfield and carson-mansion each completed a full research/write/verify pass and also moved to verified — closing out the entire 2026-09-10 discipline-board HAND-FIXED cohort. 2026-09-14: manzanar-national-historic-site and coeur-dalene-mission-of-the-sacred-heart (style-risk 93 and 92) completed a full research/write/verify pass and moved to verified. 2026-09-17: walla-walla-valley-wine-country, oregon-trail-interpretive-center, craters-of-the-moon-national-monument, and japanese-american-exclusion-memorial (style-risk 89, 83, 82, 81) completed a full research/write/verify pass and moved to verified. 2026-09-22: bainbridge-island-historic-strawberry-fields, bannack-state-park, jacksonville-historic-district, and fort-ward (style-risk 79, 79, 79, 77) completed a full research/write/verify pass and moved to verified. Later the same day: fort-clatsop-national-memorial, clayton-beach, fort-nisqually-living-history-museum, and shasta-state-historic-park (style-risk 74, 71, 70, 68) completed a full research/write/verify pass and moved to verified.
- 0 of 95 remain hand-fixed-only per the 2026-09-10 discipline board review. That tier is now empty — see `REVIEW-TRACKER.md`'s "HAND-FIXED" section.
- 34 of 95 remain on this list, fully untouched.
- Of those 34, 12 are Indigenous Heritage / held pending the third-reviewer process.
- 22 are eligible for the normal pipeline right now.