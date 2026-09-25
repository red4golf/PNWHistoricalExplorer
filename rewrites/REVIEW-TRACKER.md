# Fact-Check Review Tracker

> **If an entry you rewrite has audio,** update its row in `../AUDIO-TRACKER.md` in the same session — the current narration will no longer match the text.

Shared coordination log for the master's-level board fact-check
(pnw-explorer-board pipeline: research pack -> write-from-pack -> adversarial verify).
**Two (or more) sessions work this repo. Check this file before claiming an entry. Update it when you claim or finish one.**

**This file is the single source of truth for live per-entry status and active
claims.** Durable process knowledge (pipeline mechanics, cost, lessons learned,
skill bug history) lives in project memory (`pnw-entry-rewrite-pipeline.md`) —
that file now points here for anything that changes entry-by-entry, instead of
keeping its own copy that can drift out of sync. Update *this* file when you
claim, finish, or fix something; update project memory when you learn something
that should hold true for every future session (a new bug, a new lesson, a
process change).

Legend for the `factcheck.status` in each live entry:
- `verified`  = fully board-reviewed, verdict publishable. DONE.
- `in-review` = researched + rewritten, not yet through final verify. Staged in rewrites/.
- `corrected`= Aug-18 citation/coordinate pass ONLY, OR a Sept-10 discipline-board hand-fix on an already-`verified`/`corrected` entry that only touched a book citation. NOT a full content fact-check on its own; check the notes for what it actually covers.
- `flagged`  = Sept-10, 2026: discipline-board hand-fix on a previously **untouched** entry. Worst violations (unattributed superlatives, a false checkable claim, a neutrality violation, a fabricated-looking book citation) removed or corrected without new research. Still needs the full research/write/verify pass — do NOT read `flagged` as verified.
- `—`        = untouched. Needs everything.

Last updated: 2026-08-23 by CLOUD SESSION (Claude / Cowork) — merged in the
2026-08-18 book-citation cleanup, the other session's identity, and a repo-hygiene
flag. See "Notes" at the bottom for both.

---

## NEXT UP — review queue (set by Charles 2026-09-24)

Run these two through the full pipeline (Mode 1) before anything else. Both have audio and rank
high on the audio tracker's traffic list, but their scripts can't be written until the text is verified.

1. **vancouver-barracks** — audio priority #11. Never fact-checked. Style risk 33.
2. **port-gamble-historic-town** — audio priority #23. Never fact-checked. Style risk 20. Known book
   problem: "Mill Town" (Kerri Arsenault) is about Millinocket, Maine, not Port Gamble — verify or drop.

After each: update its row in `../AUDIO-TRACKER.md` (Entry status → verified, Can start → ready).

## DONE — verified (31) + hand-fixed (14) — see note below on the "hand-fixed" tier
| slug | where | by | date |
|---|---|---|---|
| mukilteo-lighthouse | live + rewrites/ | this session (book-citation fix 2026-08-18; content verified earlier) | 2026-08-18 |
| museum-of-flight | live + rewrites/ | this session (content verified 2026-07-26; books already clean) | 2026-07-26 |
| fort-worden-battery-kinzie | rewrites/ + catalogue/ (awaiting move) | cloud session (2026-07-26 run); Kinzie death-date sourcing hand-fixed this session 2026-08-23, see gap #3 note above | 2026-08-23 |
| oregon-state-capitol | rewrites/ + catalogue/ (awaiting move) | this session — re-researched from scratch 2026-08-23, replacing the cloud session's earlier same-day rewrite (see note below) | 2026-08-23 |
| sun-valley-resort | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| hanford-secret-city-that-changed-the-world | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| san-juan-island---the-pig-war | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| pike-place-market | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| whitman-mission-national-historic-site | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| crater-lake-national-park | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| pioneer-square---klondike-gold-rush | rewrites/ + catalogue/ (awaiting move) | cloud session | 2026-08-23 |
| astoria-column | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| mount-st-helens-national-volcanic-monument | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| rajneeshpuram | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| mount-rainier-national-park | rewrites/ + catalogue/ (awaiting move) | cloud session — publishable, zero objections; spot-checked this session, all-primary sourcing, hedges the contested Tacoma/Rainier naming and Sluiskin's tribal affiliation appropriately | 2026-08-23 |
| bonneville-dam | rewrites/ + catalogue/ (awaiting move) | cloud session — publishable, zero objections | 2026-08-23 |
| deception-pass-bridge | rewrites/ + catalogue/ (awaiting move) | cloud session — publishable, zero objections; one fabricated book caught in research and correctly swapped for a real one in the drop-in file (verified this session) | 2026-08-23 |
| multnomah-falls | rewrites/ + catalogue/ (awaiting move) | cloud session — publishable, zero objections | 2026-08-23 |
| winslow-ferry-terminal | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| redwood-national-and-state-parks | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| lava-beds-national-monument | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| oregon-caves-national-monument | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| skagit-valley-tulip-fields | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| yaquina-head-lighthouse | rewrites/ + catalogue/ (awaiting move) | this session | 2026-08-23 |
| barkerville-historic-town | rewrites/ + catalogue/ (awaiting move) | earlier session (2026-08-10 run); mis-tracked as in-progress, corrected this session 2026-08-23 | 2026-08-10 |
| columbia-river-gorge | rewrites/ + catalogue/ (awaiting move) | earlier session (2026-08-10 run); mis-tracked as in-progress, corrected this session 2026-08-23 | 2026-08-10 |
| neah-bay-and-cape-flattery | rewrites/ + catalogue/ (awaiting move) | earlier session (2026-08-10 run); mis-tracked as in-progress, corrected this session 2026-08-23 | 2026-08-10 |
| sawtooth-national-recreation-area | rewrites/ + catalogue/ (awaiting move) | earlier session (2026-08-10 run); mis-tracked as in-progress, corrected this session 2026-08-23 | 2026-08-10 |
| shasta-dam | rewrites/ + catalogue/ (awaiting move) | earlier session (2026-08-18 run); mis-tracked as in-progress, corrected this session 2026-08-23 | 2026-08-18 |
| fort-casey | rewrites/ (catalogue/ backfilled this session) | earlier session (2026-07-26 run); catalogue record backfilled 2026-08-23 — 2 open flags are deliberate, documented source disagreements, not defects | 2026-07-26 |
| old-idaho-penitentiary-state-historic-site | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify/repair/reverify pass, superseding its 2026-09-10 hand-fix; 2 remaining reverify objections hand-fixed without a third paid agent round (a backwards/unsourced Southard-vs-Orchard sentence, an unsourced Warden's House flourish) | 2026-09-10 |
| the-goonies-house | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify/repair/reverify pass, superseding its 2026-09-10 hand-fix; 4 remaining reverify objections hand-fixed (a 63-years arithmetic error, an uncited box-office ratio, unsourced psychological framing, an overstated "national" coverage claim) | 2026-09-10 |
| boeing-red-barn-historic-site-former-location | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify/repair/reverify pass, superseding its 2026-09-10 hand-fix; reverify actually returned `reject` on the central claim that Boeing built his first airplane inside this specific building (unsupported by the pack) — rewritten around only confirmed facts (1910 purchase, 1916 Lake Union flight, building's later role as the WWI plant) | 2026-09-10 |
| fort-steele-heritage-town | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding its earlier 2026-09-10 neutrality hand-fix. The project's standard automated Workflow pipeline failed twice on this entry with a reproducible environment-level tool-access error unrelated to content (confirmed via journal inspection); completed instead via 3 direct, hand-sequenced research/write/verify agent calls. Verify returned 4 fixable objections (an unsourced prospector-count quantifier, a settlement-name conflation, an unsourced inferential treaty claim, 2 over-length sentences), all hand-fixed without a repair round | 2026-09-10 |
| duwamish-longhouse | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched pick off the backlog (style-risk 142). Previous entry (`factcheck.status: corrected`, 2026-07-12) was almost entirely advocacy prose with no checkable factual content ("Symbol of Resilience," "Living Heritage" section headers). Verify returned 4 fixable objections (an overclaim about a settlement-payout figure appearing on two tribal-site pages when it only appears on one, an unsourced treaty inference, an unsourced editorial gloss, an unhedged superlative in the frontmatter description), all hand-fixed without a repair round | 2026-09-11 |
| port-blakely-mill-site | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched pick off the backlog (style-risk 120); no prior `factcheck` field existed. Previous entry stated "world's largest sawmill" and "most successful lumber operation" as flat unsourced fact and handled labor history vaguely. Verify returned 3 fixable objections (an unsourced "ran night and day" claim, an unattributed "most intact structure" superlative, an unsourced ownership-action claim), all hand-fixed without a repair round | 2026-09-11 |
| olympic-hot-springs | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 114). Previous entry had a wrong 99°F temp floor, a volcanic-implying geology error, an unverifiable named founder ("Billy Everett") with a wrong 1907 date, and multiple unsourced Klallam "spiritual"/"ceremonial" claims (confirmed absent from the tribe's own website) — all deleted. Added major current-visitor material entirely missing before: the access road has been closed to vehicles since a 2021 washout. Verify returned 2 fixable objections (a missing HistoryLink attribution on the 1988 Wilderness Act acreage figure, an out-of-order fatality/storm paragraph), both hand-fixed without a repair round | 2026-09-12 |
| vista-house-at-crown-point | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 108; suquamish-tribal-grounds at 111 skipped as Held/Indigenous Heritage). Previous entry was heavily nationalist/booster prose ("conquered... to reach the promised land"), had an unsourced "Native American travelers for centuries" claim, a disputed style label stated as fact, a wrong elevation figure, and an anachronistic WWI-victory framing — all corrected or dropped. Both previously-cited books confirmed fabricated (fake ISBNs resolving to unrelated books); no real replacement found, books list intentionally empty. Verify returned 3 fixable objections (an implied-installation-date notice bullet, a missing Oregon Encyclopedia attribution paragraph, an overstated "financially" on Samuel Hill's backing), all hand-fixed without a repair round | 2026-09-12 |
| columbia-river-maritime-museum | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 106, tied with virginia-city-historic-district). Previous entry was written almost entirely in booster prose and stated the Columbia River Bar's ~2,000-vessel toll came from "systematic record-keeping" beginning 1792 — actually the Bar Pilots' own unaudited figure, now explicitly attributed to them. Both previously-cited books had real problems (one fabricated, one misattributed to the wrong real author); no replacement found, books list intentionally empty. Verify returned 4 fixable objections (an unattributed "centerpiece exhibit" superlative, an invented "self-guided" tour detail, an unsourced lightship-function claim, an overstated causal claim about Cape Disappointment Lighthouse), all hand-fixed without a repair round | 2026-09-13 |
| virginia-city-historic-district | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding a 2026-07-12 partial correction pass that fixed specific facts but left the entry full of unsourced booster language ("most authentic and well-preserved," "liveliest commercial centers"). All 2026-07-12 corrections re-verified and held up. Vigilante death-toll dispute (100+ per Dimsdale vs. 15-35 per modern historian Frederick Allen) presented evenhandedly. One book confirmed fabricated and replaced with a real verified title; the other's fabricated subtitle removed. Verify returned 3 fixable objections (an invented "Montana Historical Society" attribution misapplied to two claims, a frontmatter period field inconsistent with the body's 1875 territorial-capital-move date), all hand-fixed without a repair round | 2026-09-13 |
| historic-strawberry-fields | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched pick off the backlog (style-risk 104). Previous entry conflated two different acreage figures, understated the removed community's size, oversimplified the incarceration sequence (omitting a forced second transfer from Tule Lake to Minidoka), and closed with generic moralizing language in place of specific facts — replaced with named actors (including local instigator Miller Freeman) and concrete postwar property sales. One mismatched book citation dropped. Verify returned 4 fixable objections (an invented specific month, an unsupported characterization, an unsupported festival-continuity claim, a notice bullet that asked visitors to imagine a vanished scene rather than pointing at something visitable today), all hand-fixed without a repair round | 2026-09-13 |
| point-no-point-lighthouse | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched pick off the backlog (style-risk 100). Previous entry stated an unsupported precise date, an unconfirmed "LED beacon" claim, a collapsed two-step ownership-transfer history into one wrong year, and an unattributed "oldest lighthouse on Puget Sound" superlative — all corrected. Both previously-cited books confirmed fabricated, including a recurring fabricated ISBN pattern already seen elsewhere in this corpus; books list intentionally empty. Verify returned 3 fixable objections (an invented claim about tribes "affirming" the treaty today, an invented sale month, an unsupported agency attribution), all hand-fixed without a repair round | 2026-09-13 |
| bowerman-airport-lanas-cafe | rewrites/ + catalogue/ (awaiting move) | closed out this session — Charles flagged this entry's open book-citation question; ran a dedicated search for a real replacement for the "Jet City Rewind" citation removed 2026-09-10. None exists (checked Arcadia Publishing's Washington aviation series, HistoryLink's full Hoquiam bibliography, Port of Grays Harbor, and Grays Harbor Historical Seaport — nothing aviation-specific to this airport found anywhere). The empty `books` list is now a confirmed, deliberate outcome rather than an open gap; `openFlags` closed 1 -> 0 and `factcheck.status` moved from `corrected` to `verified`. Body content, verified 2026-07-12, was untouched — moved here from the HAND-FIXED table below | 2026-09-13 |
| fancher-field---first-trans-pacific-landing-site | rewrites/ + catalogue/ (awaiting move) | closed out this session — Charles asked whether real books exist for the other "Jet City Rewind" cluster entries; ran a dedicated search and confirmed a real, topically direct match: "Upside-Down" Pangborn: King of the Barnstormers by Carl M. Cleveland (1978), a full Pangborn biography with the 1931 flight as its capstone chapter. `books` updated, `openFlags` closed 1 -> 0, `factcheck.status` moved from `corrected` to `verified`. Body content, verified 2026-07-12, was untouched — moved here from the HAND-FIXED table below | 2026-09-13 |
| sand-point-naval-air-station | rewrites/ + catalogue/ (awaiting move) | closed out this session — same book search as fancher-field above; confirmed a real, on-topic match: NAS Seattle - Lake Washington's Air Base by Chris Banyai-Riepl (2025), a photographic history specifically about this base, though self-published and narrowly focused on its late-1950s-mid-1960s aircraft operations (flagged as a caveat in the factcheck notes). `books` updated, `openFlags` closed 1 -> 0, `factcheck.status` moved from `corrected` to `verified`. Body content, verified 2026-07-12, was untouched — moved here from the HAND-FIXED table below | 2026-09-13 |
| bellevue-airfield | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding its 2026-09-10 hand-fix (which had only removed bad content, never added sourcing). Confirmed 51,000 average annual takeoffs/landings as the best-sourced peak-operations figure (two independent sources), correctly separated from a 1969-specific 125-aircraft/80,000-operations snapshot that the 2026-09-10 draft's own uncited framing had implied was a sustained peak. Added the full Nordhoff-family founding story, the 1976 Eastgate Safeway crash, the complete closure/land-disposition sequence, and the site's landfill/environmental-cleanup history. Verify returned 2 fixable objections (an overstated "held up close to peak" inference about a 1980 aircraft count that was actually a real decline, an unsourced "Boston-based" descriptor on the land's developer) plus a notice-field line asking visitors to imagine a runway's location rather than pointing at something visible today, all hand-fixed without a repair round. No book exists specific to this airfield; `books: []` confirmed deliberate | 2026-09-13 |
| carson-mansion | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding its 2026-09-10 hand-fix (which had only removed an unattributed superlative and a wrong-city book citation). Corrected a significant embedded error: this is NOT a National Historic Landmark and is NOT NRHP-listed (the Ingomar Club has chosen not to apply) — it was documented by HABS (CA-1911), a separate program. Reframed the "100 craftsmen kept employed" story as local tradition, not fact (per PCAD, historic-structures.com, noehill.com). Corrected "dominant" business framing to the sourced "third-largest lumber exporter in Eureka." Dropped unconfirmed "thousands of workers," hot/cold running water, steam heating, entertaining-dignitaries claims, and any labor-conflict link to Carson's own mills (the one source on labor relations describes a paternalistic, higher-wage reputation instead). Dropped the "Historic Eureka" book citation after finding no bibliographic record of it anywhere; `books: []` confirmed deliberate. Verify returned 2 fixable objections (an invented "Queen Anne" architectural-style label falsely attributed to unnamed "architectural historians," an unsupported claim that the mansion's redwood was specifically "milled from Carson's own forests"), both hand-fixed without a repair round | 2026-09-13 |
| manzanar-national-historic-site | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 93); no prior `factcheck` field existed. Corrected a real factual error: the previous draft attributed "race prejudice, war hysteria, and a failure of political leadership" to Reagan as if it were his own words — it's actually the finding of the Commission on Wartime Relocation and Internment of Civilians' report "Personal Justice Denied." Corrected the timing/context of DeWitt's "a Jap's a Jap" line (April 1943 testimony, after incarceration was underway, not the original justification), softened an unsourced "48 hours" figure, and corrected "democratic government" to an elected Community Council under WRA control. Added the December 1942 Manzanar riot (2 inmates killed by military police gunfire) and a full account of what's preserved/visitable today, both missing from the previous draft. Verify returned 4 fixable objections (an unsupported "first camp to open" claim, an invented "masked assailants" detail, an unsupported "largest forced removal" superlative, an unsourced Pearl Harbor interval), all hand-fixed without a repair round | 2026-09-14 |
| coeur-dalene-mission-of-the-sacred-heart | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 92); no prior `factcheck` field existed. This was a major reframe, not a touch-up: the previous draft's central "successful cultural collaboration" framing, closing with language about what becomes possible "when different peoples unite in common purpose," was found unsupported and removed entirely. Added the load-bearing context the draft omitted: an estimated 80-85% Coeur d'Alene population collapse from smallpox before sustained Jesuit contact, and the full multi-stage land-loss history (the 1873 reservation excluding the mission site itself, 1877 site abandonment, 1887 cession, the 1909 Allotment Act, and 1880s-on mining pollution that left the Jesuits only 23 of their original acres by 1921). Corrected the land-transfer-to-tribe story from a single 2001 event to its actual two-step history (1975 trust deed, separate 2001 outright conveyance) and corrected Louise Siuwheem's relationship to Chief Circling Raven (granddaughter, not daughter). Dropped an unconfirmed org-as-author book citation ("Coeur d'Alene Tribal Press"), replaced with a real, on-topic academic ethnography. Verify returned 6 fixable objections (an unhedged labor-count claim, fabricated interior-decoration specifics, an unsupported "log walls" detail and causal-survival claim, an over-specific Mullan Road claim, an invented memorial-location detail, an unsupported "operated by" claim), all hand-fixed without a repair round | 2026-09-14 |
| walla-walla-valley-wine-country | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 89), one of a "4 more please" batch. No prior `factcheck` field existed. Corrected an unsourced comparative claim about the wine community being unlike "corporate-dominated" regions, a wrong soil-type count (three vs. the Wine Alliance's actual four), a wrong elevation range (1,000-2,000 ft vs. actual ~400-2,000 ft), and an unverified "one of the world's major wheat-producing regions" superlative. Both cited books confirmed real and on-topic, unchanged. Verify returned 2 fixable objections (residual unattributed comparative language in the intro and closing sections), both hand-fixed without a repair round | 2026-09-17 |
| oregon-trail-interpretive-center | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 83), one of a "4 more please" batch. No prior `factcheck` field existed. Corrected a fabricated/misattributed Francis Parkman book citation, an inaccurate precise departure date/location, an overstated daily travel pace, and an unsourced mortality figure — replaced with NPS's own framing. Corrected the operator to BLM (opened 1992). Added a substantial, previously-missing Native American impact section covering the 1847 Whitman Mission epidemic, the Whitman Massacre, the Cayuse War, and the 1855 Walla Walla Treaty Council, with named actors. Removed nationalist/booster language throughout. Verify returned 2 fixable objections (an internal 400k/350k emigrant-total inconsistency, and several writer-added specifics not in the research pack — an "eleven others" death count, a precise 1836 mission-founding date, added militia-pursuit detail), all hand-fixed by deleting the unconfirmed specifics (per standing "delete, don't soften" rule) rather than a repair round | 2026-09-17 |
| craters-of-the-moon-national-monument | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 82), one of a "4 more please" batch. No prior `factcheck` field existed. Corrected a conflated size claim (618 sq mi is the lava field, not the ~750,000-acre Monument and Preserve), an overstated renewed-activity timeframe, a reversed plate-motion direction, and dropped two unsourceable figures (a 4,000-ft depth claim, a "19 cinder cones exceeding 100 feet" claim) entirely. Reframed the Apollo astronaut training from "somewhat misdirected" to valuable geological field training, naming the Apollo 14 crew and backup crew and the exact training date. Both books confirmed real/on-topic, unchanged. Verify returned 1 fixable objection (the intro still implied training happened because the terrain visually resembles the Moon, contradicting the corrected Apollo section), hand-fixed without a repair round | 2026-09-17 |
| japanese-american-exclusion-memorial | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding the 2026-07-12 partial correction pass, one of a "4 more please" batch. The 2026-07-12 pass had fixed the frontmatter figures and early sections but left "Lessons for Democracy," "Modern Relevance," and "A Sacred Trust" as uncited editorializing. Cut an unsupported "disturbing parallels to today" claim and an unsupported "classroom for democracy" metaphor, neither grounded in BIJAC/BIJAEMA/NPS's own materials. Replaced a vague "more than half returned" figure with the precise 150-of-272 count and tightened the DeWitt naval-proximity rationale to read as historians' analysis rather than DeWitt's own stated reasoning. Dropped "Hotel on the Corner of Bitter and Sweet" from the books list (real book, but about Seattle's Japantown, not this site); kept "Farewell to Manzanar." Verify caught one structural defect (a missing frontmatter closing delimiter), fixed mechanically | 2026-09-17 |
| bainbridge-island-historic-strawberry-fields | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 79), one of a "next 4 please" batch. No prior `factcheck` field existed. Removed a fabricated "finest tasting strawberry in the U.S." quote and an unconfirmed "$1,600" purchase price; narrowed "oldest continuously farmed land on Bainbridge Island" to "longest continuously farmed Japanese American family farm on the island," matching the source's actual language. Corrected the Sakuma Brothers' Burlington move from a postwar relocation to its real pre-war (1937-1941) timeline and dropped an unsupported "largest strawberry farm in Skagit Valley" claim. Reframed the removal's economic-harm timing as an effect rather than asserting deliberate government intent. Corrected "Sonoji Sakai Elementary School" to "Sonoji Sakai Intermediate School" and removed an unconfirmed "1958 Kitsap County Farmer of the Year" award. Verify returned 5 fixable objections (oversized description, missing BIJAC attribution on core stats, an unhedged "227" figure, an internal 43-farms/"close to 30 families" contradiction, a Sakuma-paragraph timeline muddle), all hand-fixed without a repair round; `books: []` confirmed deliberate, no real match found | 2026-09-22 |
| bannack-state-park | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 79), one of a "next 4 please" batch. No prior `factcheck` field existed. Corrected "over 60 original buildings" to "over 50" and an unverifiable "$5 million in gold" figure to a sourced "~$3 million in placer gold, 1862-1876." Named the researchers (Mather and Boswell) who question Henry Plummer's guilt rather than a vague "modern historians" attribution, and credited both John White and William Eads for the Grasshopper Creek discovery. Dropped an unconfirmed folk etymology and two unconfirmed building names ("Skinner's Saloon," "the Graves Hotel"). Deleted a fabricated book citation misattributed to William Kittredge (real author Krys Holmes, and off-topic regardless); kept Callaway's "Montana's Righteous Hangmen." Verify returned 1 fixable objection (oversized description), hand-fixed without a repair round | 2026-09-22 |
| jacksonville-historic-district | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding the 2026-07-12 partial correction pass, one of a "next 4 please" batch (style-risk 79). Corrected "James Poole" to "John Poole," fixed a misattribution crediting the Oregon Historical Society instead of Historic Jacksonville, Inc. for the "second-oldest financial institution" claim, corrected the U.S. Hotel's construction date and the courthouse's construction year (1883, not 1884), and rewrote the courthouse/museum sentence to stop asserting an active operating museum — it closed in 2006 and its 2026 status could not be confirmed. Replaced a fabricated "Lisa J. Bramlett" book citation (its ISBN belonged to an unrelated cemetery book) with the real "Jacksonville, Oregon" by Margaret LaPlante, and deleted a second fabricated citation with no real substitute found. Verify returned no unresolved objections after cross-checking the George Holt attribution against the research pack | 2026-09-22 |
| fort-ward | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, next-worst-untouched non-held pick off the backlog (style-risk 77), one of a "next 4 please" batch. No prior `factcheck` field existed. Softened an unconfirmed claim that Fort Ward's own guns were shipped to France as field artillery (documented for sister forts, not this one). Removed an unsourced "150th Company" unit designation, unconfirmed skeleton-crew and 1935 American Legion camp claims, an unsupported "one of only five" intercept-station superlative, an unconfirmed teletype-network claim, and two unverifiable real-estate sale figures. Corrected a wrong 1953/1956 Army-Navy transition sequencing and both book citations, which pointed to fabricated titles/ISBNs — replaced with Hansen's real "Battle Ready" and Warner's real "A History of Bainbridge Island." Confirmed all four artillery batteries (Nash, Warner, Vinton, Thornburgh) as accurate, unchanged. Verify returned 2 fixable objections (two new unsupported superlatives introduced by the rewrite itself), both hand-fixed without a repair round | 2026-09-22 |
| fort-clatsop-national-memorial | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding the 2026-07-09 partial correction pass, one of a second "4 more please" batch (style-risk 74). Corrected the Nov 24 1805 winter-site vote (not literally all 33 members — Charbonneau was excluded; the real choice was binary, not three options), the elk tally (131 per Gass, not "over 100"), and the framing of the 122-animal/178-plant scientific totals as expedition-wide rather than Fort-Clatsop-specific. Deleted an unsourced "24 tribes" figure entirely. Both book citations (Moulton, Ambrose) confirmed real and on-topic, unchanged. Verify returned 7 fixable objections (an invented deer-count workaround, an unsourced "Sergeant" rank, a notice-field misstatement of the fort's dimensions, an oversold rebuild-basis claim, unattributed editorializing, a typo, and an unsupported "hungry" in the description), all hand-fixed without a repair round | 2026-09-22 |
| clayton-beach | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, one of a second "4 more please" batch (style-risk 71). No prior `factcheck` field existed. Corrected the Samish population figures (~2,000 in 1847 to ~150 by 1855, not "1854"/"over a thousand"), the giant bird footprint's height (7 ft, not 6.5) and taxonomy (Gastornis, not the outdated Diatryma), and the 2023 trail's length (3/4 mile total, resolving an internal double-count). Removed an unconfirmed wheelchair-accessibility claim, an unconfirmed $3M/RCO funding figure, an unattributed "most beautiful" superlative, an unconfirmed trailhead name, and an unsourced 1990s-ticketing claim. Deleted a topically mismatched book citation ("Red Paint" by Sasha taqʷšəblu LaPointe — author has no documented Samish/Lummi affiliation); kept "The Salish Sea." Verify returned 6 fixable objections (invented population-collapse causes, a derived percentage not in the pack, an overstated right-of-way claim, an unsupported taxonomic-priority justification, an invented "blind curve" detail, and a nonstandard book-citation field), all hand-fixed without a repair round | 2026-09-22 |
| fort-nisqually-living-history-museum | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, superseding the 2026-07-12 partial correction pass, one of a second "4 more please" batch (style-risk 70). Attributed the "first permanent European settlement on Puget Sound" claim explicitly to the Archaeological Conservancy. Added precise Tolmie tenure dates and corrected the 1845 livestock figures to exact HistoryLink numbers (2,280 cattle, 5,872 sheep). Strengthened the Fort Steilacoom section with two new facts (its founding was prompted by a May 1849 attack on Fort Nisqually itself; the Army leased the Steilacoom site from HBC). Corrected Cecelia Svinth Carpenter's name spelling. Explicitly declined to add a widely-repeated but unconfirmable "oldest building in Washington" claim about the Granary. Verify returned 4 fixable objections (a dropped "permanent" qualifier that changed a sourced claim, a stray internal editing note left in a book citation, several unattributed interpretive flourishes, and an unsourced distance claim), all hand-fixed without a repair round | 2026-09-22 |
| shasta-state-historic-park | rewrites/ + catalogue/ (awaiting move) | this session — full research/write/verify pass, one of a second "4 more please" batch (style-risk 68). No prior `factcheck` field existed. Added the town's real founding story (Pierson B. Reading's 1848 discovery; originally "Reading Springs"), previously omitted entirely. Removed an unsupported "largest settlement" superlative and corrected a false claim that the county reached the San Francisco Bay Area (it reached only to Red Bluff). Added a previously-missing fires-explain-the-brick-ruins narrative (Dec 1852 and 1853 fires). Corrected the courthouse conversion date (hedged "around 1861-62") and the state acquisition date (1937, not an unsupported "1946"). Deleted both book citations as fabricated (neither Boessenecker's nor Varney's real bibliography contains the cited titles); `books: []` confirmed deliberate. Verify returned 2 fixable objections (an invented additional source attribution and an unsourced "builder" descriptor), both hand-fixed without a repair round | 2026-09-22 |

## HAND-FIXED (discipline board corrections, 2026-09-10) — NOT the full pipeline

The Mode 3 discipline board (8 reviewers, each with its own adversarial checker; 0 fabricated findings across 207 quotes) reviewed a 9-entry sample: the top-5 error-count list from the same-day verification backlog triage, plus the 4 other aviation entries sharing a suspect book citation. Charles asked for the identified corrections to be made and logged. These are hand-fixes responding to specific board findings — deletions of unsupported/false/romanticizing content and one neutrality rewrite — **not** a research/write/verify pass. `factcheck.status` on each is `flagged` (previously-untouched entries) or `corrected` (already-`corrected` aviation entries that only had a book citation pulled). None of these 9 should be treated as verified.

Of the original 9, carson-mansion and bellevue-airfield have since gone through a full research/write/verify pass (2026-09-13) and moved to the DONE table above; this table now tracks 0 remaining entries at this tier — everything from the 2026-09-10 board sample has either graduated to a full pass or (for the aviation book-citation-only fixes) been closed out via the "Jet City Rewind" book search also documented above.

| slug | what changed | status | date |
|---|---|---|---|

All corrected drop-in files are in `rewrites/`, each with a `catalogue/<slug>.md` record documenting exactly what changed. None have been moved into `src/content/locations/` — same standing rule as everything else, awaiting Charles's review and push. Full board findings (all 8 reviewers, all 8 checkers, 207 findings) are in `BOARD-REVIEW-2026-09-10.md` and `BOARD-REVIEW-2026-09-10-raw.json` at the project root.

**Progress note:** this does not change the "30 of 95 fully verified" count in `VERIFICATION-BACKLOG.md` — none of these 9 went through a real research pass, so none graduate to verified. They move out of "untouched," though; see the updated backlog.

Note on astoria-column/mount-st-helens: repair round left small mechanical objections (1 unsupported claim + 3 style on astoria-column; 2 causal-precision objections on mount-st-helens), hand-fixed directly rather than spending a third paid agent round — same standing policy already used on Columbia River Gorge, etc. `openFlags: 0`, `neutrality: pass` on both. See each `catalogue/<slug>.md` for exactly what was hand-fixed.

Note on the newest 4 (mount-rainier-national-park, bonneville-dam, deception-pass-bridge, multnomah-falls): landed from the cloud session between the last tracker update and this one, discovered this session while checking on sun-valley-resort. All 4 came back `publishable` with zero verifier objections. This session only did a spot-check (read the drop-in + catalogue record, confirmed book citations were actually applied where corrected) rather than a full independent re-verify — same light-touch trust level given to the cloud session's other clean entries above.

Note on oregon-state-capitol: this closes gap #1 from the 2026-08-23 consolidation (below). The cloud session's earlier 2026-08-23 rewrite had no matching catalogue record, so rather than trust an undocumented draft, this session re-ran the full pipeline from scratch — research → write → verify → repair → re-verify. Verify came back `needs-edit` twice: the research agent's structured-output call failed mechanically on the first attempt (same bug as rajneeshpuram — malformed JSON, agent gave up with an empty placeholder instead of retrying) and had to be relaunched; the second attempt produced a full pack, but the repair round still left 2 objections, both confined to the `description` field (an invented causal claim about the 2025 re-gilding "outpacing" birds, and an uncited derived "18 months" duration) — hand-fixed directly. Also hand-added one book citation (Fuller & Van Heukelem, "Salem") that the write stage's own research had verified but omitted from its book list — a write-stage miss, not a sourcing gap. `openFlags: 0` after the hand-fix. The old `catalogue/oregon-state-capitol.md` (this session's 2026-08-18 citation-only version) stays archived in `catalogue/_superseded/`.

Note on winslow-ferry-terminal, redwood-national-and-state-parks, lava-beds-national-monument: 3 fresh full-pipeline rewrites this session, worst-first from `corpus_metrics.py`, skipping anything already done, in progress, or held. All 3 needed a repair round; all 3 landed with small mechanical objections left over that were hand-fixed rather than spending a third paid agent round. Notable this batch:
- **winslow-ferry-terminal**: repair round flagged the frontmatter `period` field as contradicting the corrected history (the assembler has no way to apply that fix automatically) — hand-corrected `period` from "Established 1951" to "Steamer service 1887; car ferries 1937".
- **redwood-national-and-state-parks**: repair's remaining style flag was a real proportionality issue, not just mechanical — the H1 title framed the whole six-section entry around a two-sentence closing item (the O Rew land-transfer news), which read as an editorial thumb on the scale. Retitled to "Among the Tallest Trees on Earth" to match what the entry actually covers.
- **lava-beds-national-monument**: this one's first full pipeline attempt failed badly — the research agent submitted an empty placeholder (same recurring structured-output bug), and this time the writer did NOT refuse to write from it — it fabricated a complete, plausible-looking Modoc War entry with invented dates, casualties, and even a fake sources list. Verify correctly rejected it outright (30 unsupported claims). Relaunched completely fresh with explicit warnings added to both the research and writer stages against this exact failure mode; the second attempt produced real, all-primary (NPS) sourced research. The initial full verify on that second attempt also came back `neutrality: fail` (dramatic "underdog"/ten-to-one framing, emotionally loaded editorializing) — the repair round fixed that to `pass`. See `catalogue/lava-beds-national-monument.md` for the full note on the failed first attempt.
`openFlags: 0`, `neutrality: pass` on all 3. See each `catalogue/<slug>.md` for exactly what was hand-fixed.

Note on oregon-caves-national-monument, skagit-valley-tulip-fields, yaquina-head-lighthouse: second batch of 3 fresh full-pipeline rewrites this session, worst-first from `corpus_metrics.py`, skipping anything already done, in progress, or held. All 3 needed a repair round; all 3 landed with small mechanical objections left over that were hand-fixed rather than spending a third paid agent round. Notable this batch:
- **oregon-caves-national-monument**: corrected a real age-conflation error in the old draft (claimed the cave itself was "over 190 million years old," conflating the parent rock's age — ~210 million years, as ancient seamount deposits — with the cave passages, which didn't start dissolving until roughly 1.7 million years ago); dropped a speculative "spiritual significance" sentence about Native use of the cave interior entirely, since NPS states plainly there's no evidence of any interior use. Both listed books were fabricated and did not survive verification — books list is intentionally empty.
- **skagit-valley-tulip-fields**: corrected a real historical error in the old draft — it credited the industry's start to Dutch immigrants "beginning in the 1940s," but HistoryLink.org documents commercial tulip growing here started in 1906 with American grower Mary Brown Stewart, nearly four decades before Dutch growers arrived and expanded it starting in 1945. Cleanest repair round of this session's six full rewrites — repair left only 2 minor objections and zero style violations. Both listed books were fabricated and did not survive verification.
- **yaquina-head-lighthouse**: first attempt hit the recurring empty-research-pack bug again; unlike lava-beds, the writer correctly refused to fabricate substantive facts, but the placeholder still failed verification by smuggling unsourced metadata (a street address, plus a sentence citing a "source ID," category, and period that appear nowhere in the empty pack) — a subtler version of the same underlying failure. Relaunched fresh with an explicit warning naming this exact sub-failure; the second attempt succeeded with strong primary BLM/OSU sourcing. See `catalogue/yaquina-head-lighthouse.md` for the full note on the failed first attempt. Both listed books were fabricated/mismatched and did not survive verification.
`openFlags: 0`, `neutrality: pass` on all 3. See each `catalogue/<slug>.md` for exactly what was hand-fixed.

## IN PROGRESS — this session (staged in rewrites/, not final-verified) — DO NOT TAKE
(none currently — see correction note below; all 6 formerly listed here are actually done)

### Correction (2026-08-23, this session): the 6 entries below were NOT actually in-progress

Charles asked this session to "run the final verify" on the 6 entries this list called
"in-review, not final-verified." On checking the actual files on disk, that was wrong —
this list was stale, left over from an earlier point in the project and never cleaned up
after these entries were finished in prior sessions (dated 2026-08-10 through 2026-07-26,
all before this session started). No new pipeline runs were needed or done for any of them
today. Corrected status:

- **barkerville-historic-town, columbia-river-gorge, neah-bay-and-cape-flattery,
  sawtooth-national-recreation-area, shasta-dam** — all 5 already have full catalogue
  records (`catalogue/<slug>.md`) from a 2026-08-10/2026-08-18 pipeline run: research →
  write → verify → repair → re-verify, each landing at 1-4 minor remaining objections
  hand-fixed rather than re-verified a third time. `openFlags: 0`, `neutrality: pass` on
  all 5 per their catalogue notes. Already correctly listed in PUSH-MANIFEST.md section 2
  with per-entry hand-fix notes — that manifest was right, this tracker list was the stale
  one. Moved into the DONE table below.
- **fort-casey** — did go through a full pipeline (2026-07-26): rebuilt from three
  contradictory prior drafts, primary-tier sourcing (Washington State Parks, NPS, National
  Register, U.S. Coast Guard), 30/30 claims cited. `openFlags: 2`, but both are genuine,
  deliberately-preserved disagreements between primary sources — the gun count (35 per
  State Parks vs. 34 per HistoryLink) and the fate of the 1861 lighthouse building
  (HistoryLink: moved and reused; USCG: demolished) — stated plainly in the text rather
  than resolved by picking a side, which is the correct behavior under the project's
  accuracy rule, not a defect needing repair. It simply never got a `catalogue/fort-casey.md`
  write-up like the other entries; one was backfilled this session
  (`catalogue/fort-casey.md`) from the existing frontmatter/body so it has the same
  documentation as everything else. Also flagged: the live `src/content/locations/fort-casey.md`
  already has a narrower, independently-audited book list (one confirmed book) from the
  2026-08-18 book-citation cleanup. `rewrites/fort-casey.md` was still carrying the older,
  unaudited 3-book list — **fixed this session**: `rewrites/fort-casey.md`'s `books:` field
  now matches the live file exactly (Umbrella Guide to Washington Lighthouses, Sharlene
  Nelson & Ted Nelson). Moved into the DONE table below.

## CLAIMED NOW — RESOLVED 2026-08-23, all 4 closed out
The cloud session that originally claimed these 4 was reporting repeated "task
interrupted" errors to Charles. No partial files existed for any of the 4 as of
the transfer (checked `rewrites/` and `rewrites/catalogue/` — nothing written
yet), so nothing was lost; this session picked them up fresh rather than
resuming/repairing anything. All 4 are now resolved: 3 done, 1 held.
- [x] mount-st-helens-national-volcanic-monument   — done, see DONE table (hand-fixed, 2 causal-precision objections)
- [x] astoria-column                               — done, see DONE table (hand-fixed, 1 unsupported claim + 3 style)
- [x] rajneeshpuram — **done, see DONE table.** First research attempt failed
      mechanically (malformed structured-output call, agent submitted an empty
      placeholder instead of retrying) — relaunched fresh with an explicit
      warning in sourceHints not to fall back to a placeholder. Second attempt
      succeeded. Came back `publishable` after repair with **zero** objections —
      no hand-fix needed, the clean outlier of the four. Repair agent also
      retitled it from "The Commune That Bought a County's Politics" to "The
      Commune That Took Over a Town" (fixing an objection about overstating the
      takeover's scope — only Antelope, pop. ~50, was taken over).
- [x] kennewick-man-discovery-site — **HELD, not run.** Category is `Indigenous
      Heritage` (checked `src/content/locations/kennewick-man-discovery-site.md`
      frontmatter). Skill non-negotiable #6 requires the not-yet-built
      third-reviewer process for this category before the standard pipeline
      runs — same rule already blocking museum-at-warm-springs,
      yakama-nation-museum, and tamástslikt-cultural-institute. The original
      claim on this one looks like an oversight; leaving it held rather than
      running it through the standard pipeline. Needs the third-reviewer process
      built before anyone takes it.

---

## Book-citation cleanup (2026-08-18, this session) — separate from content fact-check

A corpus-wide audit found the `books:` frontmatter field had never been verified
by anything. Of the 10 entries rewritten as of 2026-08-18, only 8 of 21 citations
were correct. Full detail: `book-citation-corrections-2026-08-18.md` at the repo
root. Status by entry (books only — does NOT reflect content fact-check status,
see the tables above):

| slug | books status |
|---|---|
| museum-of-flight | confirmed clean, no fix needed |
| neah-bay-and-cape-flattery | confirmed clean, no fix needed |
| shasta-dam | confirmed clean (hand-fixed earlier, before the audit existed) |
| mukilteo-lighthouse | **fixed** — patched directly in `src/content/locations/` (live, not yet pushed) |
| fort-casey | **fixed** — patched directly in `src/content/locations/` (live, not yet pushed) |
| barkerville-historic-town | **fixed** — patched directly in `src/content/locations/` (live, not yet pushed) |
| sawtooth-national-recreation-area | **fixed** — patched directly in `src/content/locations/` (live, not yet pushed) |
| oregon-state-capitol | **superseded** — entry was fully re-researched and rewritten 2026-08-23 (twice: once by the cloud session, then again by this session to fill the missing catalogue record); the 2026-08-18 citation-only patch no longer applies to current content, see DONE table |
| fort-worden-battery-kinzie | **fixed** — patched directly in `rewrites/fort-worden-battery-kinzie.md` |
| columbia-river-gorge | **fixed** — patched directly in `rewrites/columbia-river-gorge.md` |

The pipeline itself (`rewrite-one.js` + `catalogue.py`/`catalogue-repaired.py`) was
also fixed so every future rewrite verifies its book citations automatically —
delivered as an updated `.skill` package, save status unconfirmed.

**Push status:** the 4 live-entry book fixes above are sitting in
`src/content/locations/` on Charles's machine, corrected but **not yet
pushed/deployed**. Whoever pushes next should include them.

## Repo-hygiene flag (2026-08-23, this session)

`git status` currently shows ~308 files modified in the working tree that neither
session intentionally touched — text files with every line rewritten plus a mode
change (100644 -> 100755), and binary files (audio/images) flagged as changed at
identical file size. This has the signature of the device-mount rewriting files on
read (permission bits, likely line-ending handling), not real content edits.
**Nothing is staged** (`git diff --cached` is empty), so this hasn't been
committed, but a blind `git add -A` would sweep it in. Recommend Charles diff a
couple of the flagged binaries locally before any push that includes files
neither session meant to change. Also: git-mount lock files
(`.git/index.lock`, `.git/objects/maintenance.lock`) keep reappearing because the
mount can create them but not delete them — known issue, see `pnw-deploy-notes.md`
in project memory. They get moved (not deleted) into `_to_delete/` at the repo
root when found; safe to delete that folder locally any time.

## Staging consolidated 2026-08-23 (this session) — see PUSH-MANIFEST.md
Both sessions' work has been merged into one staging area, ready for Charles to
review and push. Full detail, organized by what's ready to push vs. needs
review vs. held, is in **`PUSH-MANIFEST.md`** at the repo root — read that file
first when you're ready to push. Summary of what changed:
- **Catalogue folders consolidated.** The two locations in play
  (`catalogue/` and `rewrites/catalogue/`) are now one: `catalogue/` at the
  repo root is canonical. `rewrites/catalogue/` is deprecated (see its
  `README-MOVED.md`); its former contents were copied into `catalogue/` and the
  originals moved (not deleted — device_bash can't delete) to
  `_to_delete/rewrites-catalogue-duplicates/`, safe for Charles to delete locally.
- **New `catalogue/_superseded/` folder** holds before/after records whose
  matching `rewrites/` drop-in was later fully replaced by a different run, so
  they no longer describe the current content. Two entries there so far:
  `fort-worden-battery-kinzie.2026-08-18-superseded.md` and
  `oregon-state-capitol.2026-08-18-superseded.md` (both superseded by the
  cloud session's from-scratch 2026-08-23 redo of those two entries — a
  redo neither session coordinated on, discovered during this consolidation).
- **3 gaps found; all 3 now closed:**
  (1) ~~`oregon-state-capitol`'s current draft has no matching catalogue
  record~~ — **CLOSED 2026-08-23.** Re-ran the full pipeline from scratch
  rather than reverse-engineer a record for the cloud session's undocumented
  draft; the entry is now fully re-verified, hand-fixed, and has a matching
  catalogue record. See DONE table.
  (2) ~~`sun-valley-resort` has no catalogue record at all~~ — **CLOSED
  2026-08-23**, but not by this session — the cloud session added the missing
  `catalogue/sun-valley-resort.md` on its own sometime after this gap was
  first flagged. Confirmed the file now exists and matches the drop-in.
  (3) ~~`fort-worden-battery-kinzie` was independently redone twice, worth a
  diff-check before push~~ — **CLOSED 2026-08-23.** Ran the diff-check:
  compared the live `verified`/`publishable` entry fact-by-fact against the
  archived 2026-08-18 research pass. Everything matched or was complementary
  except one real issue — the live entry stated Brig. Gen. David H. Kinzie's
  death date (July 5, 1904) as flat fact, sourced only to Coast Defense Study
  Group, a source the earlier, more rigorous pass had explicitly found does
  not meet any of the project's graded tiers and had recommended dropping
  entirely (per the standing rule: unconfirmed claims are deleted, not
  softened). Hand-fixed — removed the date from the body and the matching
  sources-list line. `openFlags` stays 0; this was a sourcing-tier correction,
  not a newly discovered unsupported claim. See
  `catalogue/fort-worden-battery-kinzie.md` for the full note. Book citations
  on both redone entries (`oregon-state-capitol`, `fort-worden-battery-kinzie`)
  were spot-checked against my earlier independent research and are correct.

## Notes
- Drop-ins land in `rewrites/`. Charles moves them into `src/content/locations/` after review, then pushes.
- Each finished entry also gets a `catalogue/<slug>.md` before/after metrics record — see the consolidation note above, `catalogue/` is now the single canonical location.
- "corrected"-status entries (Aug-18 citation pass) still need the FULL board review; treat them as not-yet-done.
- Non-entry files in rewrites/ to ignore: APPLY-home-design.md, catalogue-museum-of-flight.md, *.patch, pnw-explorer-board.skill, REVIEW-TRACKER.md (this file).
- Progress: 61 of 95 in the DONE table (verified/hand-fixed-clean, per-slug detail above). 2026-09-22 (later same session): Charles asked for "4 more please" a second time — fort-clatsop-national-memorial, clayton-beach, fort-nisqually-living-history-museum, and shasta-state-historic-park (style-risk 74, 71, 70, 68; fay-bainbridge-park at 68 skipped as Held/Indigenous Heritage) — all 4 completed a full research/write/verify pass and moved to DONE. Fort Clatsop and Fort Nisqually both superseded earlier partial passes (2026-07-09 and 2026-07-12 respectively). 34 remain untouched; 1 further held (kennewick-man-discovery-site, for the not-yet-built Indigenous Heritage third-reviewer process). Earlier the same day: Charles asked for "next 4 please" — bainbridge-island-historic-strawberry-fields, bannack-state-park, jacksonville-historic-district, and fort-ward (style-risk 79, 79, 79, 77; mashel-prairie at 88 and treaty-rock at 83 skipped as Held/Indigenous Heritage) — all 4 completed a full research/write/verify pass and moved to DONE. Jacksonville Historic District superseded its 2026-07-12 partial pass. Up from 38 — columbia-river-maritime-museum, virginia-city-historic-district, historic-strawberry-fields, and point-no-point-lighthouse (style-risk 106, 106, 104, 100) completed a full research/write/verify/hand-fix pass 2026-09-13, and bowerman-airport-lanas-cafe's previously-open book-citation question was closed out the same day (its body was already verified 2026-07-12; no real replacement book exists, confirmed by dedicated search, so its empty books list is now a settled outcome rather than an open flag). Same day, Charles asked whether real books exist for the rest of the "Jet City Rewind" cluster: fancher-field---first-trans-pacific-landing-site and sand-point-naval-air-station both got confirmed real, on-topic replacement books and moved to verified/DONE; bellevue-airfield's book search came up empty (no real match confirmed), and Charles then asked for both bellevue-airfield and carson-mansion to be run through a full research/write/verify pass — both completed the same day and moved to DONE, closing out the last two entries in the 2026-09-10 discipline-board HAND-FIXED tier. 2026-09-14: manzanar-national-historic-site and coeur-dalene-mission-of-the-sacred-heart (style-risk 93 and 92) — the next two worst-scoring non-held entries — completed a full research/write/verify pass and moved to DONE; the Coeur d'Alene entry required a major reframe away from an unsupported "successful cultural collaboration" narrative. 2026-09-17: Charles asked for "4 more please" — walla-walla-valley-wine-country, oregon-trail-interpretive-center, craters-of-the-moon-national-monument, and japanese-american-exclusion-memorial (style-risk 89, 83, 82, 81; mashel-prairie at 88 and treaty-rock at 83 skipped as Held/Indigenous Heritage) — all 4 completed a full research/write/verify pass and moved to DONE. Oregon Trail needed a substantial new Native American impact section (Whitman Mission epidemic, Whitman Massacre, Cayuse War, 1855 Walla Walla Treaty Council); Japanese American Exclusion Memorial superseded its 2026-07-12 partial pass, which had left later sections as uncited editorializing. 42 remain untouched; 1 further held (kennewick-man-discovery-site, for the not-yet-built Indigenous Heritage third-reviewer process). Corrected 2026-08-23: the 6 entries previously listed as "in progress, not final-verified" were actually already done in prior sessions — see the correction note above the DONE table.
