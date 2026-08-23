# Fact-Check Review Tracker

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
- `corrected`= Aug-18 citation/coordinate pass ONLY. NOT a full content fact-check. Still needs the full board.
- `—`        = untouched. Needs everything.

Last updated: 2026-08-23 by CLOUD SESSION (Claude / Cowork) — merged in the
2026-08-18 book-citation cleanup, the other session's identity, and a repo-hygiene
flag. See "Notes" at the bottom for both.

---

## DONE — verified (17) + hand-fixed (14) — see note below on the "hand-fixed" tier
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
- Progress: 29 of 95 in the DONE table (verified/hand-fixed-clean, per-slug detail above). 66 remain untouched; 1 further held (kennewick-man-discovery-site, for the not-yet-built Indigenous Heritage third-reviewer process). Corrected 2026-08-23: the 6 entries previously listed as "in progress, not final-verified" were actually already done in prior sessions — see the correction note above the DONE table.
