# Push-readiness manifest — 2026-08-23

Built after consolidating both sessions' work into one staging area. This is a
push-focused view of `REVIEW-TRACKER.md` — that file is still the live
work-claim log; this one groups the same entries by what actually needs to
happen for a push, in one place, so nothing gets missed or double-shipped.

## 1. Ready to push now — book-citation fixes only, on already-live entries

These 4 files are sitting in `src/content/locations/` with a corrected `books:`
block and nothing else changed. No review needed — just push.

- `src/content/locations/mukilteo-lighthouse.md`
- `src/content/locations/fort-casey.md`
- `src/content/locations/barkerville-historic-town.md`
- `src/content/locations/sawtooth-national-recreation-area.md`

Detail: `book-citation-corrections-2026-08-18.md` at the repo root.

## 2. Ready to push after your review — full rewrites, verdict clean (openFlags 0)

Each has a drop-in file in `rewrites/` and a before/after record in
`catalogue/`. Move into `src/content/locations/` after you've read it, then push.

| slug | verdict | neutrality | notes |
|---|---|---|---|
| rajneeshpuram | publishable | pass | zero objections after repair, no hand-fix needed |
| fort-worden-battery-kinzie | publishable | pass | zero objections after repair (2026-07-26 run); hand-fixed 2026-08-23 during diff-check — dropped an unattributed death date sourced only to a non-graded specialist site, see gap #3 |
| mount-st-helens-national-volcanic-monument | needs-edit → hand-fixed | pass | 2 causal-precision objections hand-fixed after repair |
| astoria-column | needs-edit → hand-fixed | pass | 1 unsupported claim + 3 style objections hand-fixed after repair |
| oregon-state-capitol | needs-edit → hand-fixed | pass | Re-researched from scratch again 2026-08-23 (this session) to close gap #1 — the current `rewrites/oregon-state-capitol.md` and `catalogue/oregon-state-capitol.md` are this newest version, fully verified and hand-fixed. Two prior versions exist in `catalogue/_superseded/`. |
| columbia-river-gorge | needs-edit → hand-fixed | pass | 1 objection hand-fixed (11,000-years wording) |
| shasta-dam | needs-edit → hand-fixed | pass | 1 objection hand-fixed (invented visitor-center detail) |
| neah-bay-and-cape-flattery | needs-edit → hand-fixed | pass | 1 mechanical wording slip hand-fixed |
| barkerville-historic-town | needs-edit → hand-fixed | pass | 3 minor objections hand-fixed (2026-08-10 run) |
| sawtooth-national-recreation-area | needs-edit → hand-fixed | pass | 2 objections hand-fixed (2026-08-10 run) |
| sun-valley-resort | publishable | — | Gap #2 closed — the cloud session added the missing catalogue record on its own after this gap was first flagged; confirmed it now exists and matches the drop-in. |
| hanford-secret-city-that-changed-the-world | see catalogue/ record | — | cloud session's work; verdict is in its catalogue record |
| pike-place-market | see catalogue/ record | — | cloud session's work |
| pioneer-square---klondike-gold-rush | see catalogue/ record | — | cloud session's work |
| san-juan-island---the-pig-war | see catalogue/ record | — | cloud session's work |
| whitman-mission-national-historic-site | see catalogue/ record | — | cloud session's work |
| crater-lake-national-park | see catalogue/ record | — | cloud session's work |
| mount-rainier-national-park | publishable | pass | zero objections; spot-checked this session (not a full re-verify) — all-primary sourcing, appropriately hedges the contested Tacoma/Rainier naming and Sluiskin's tribal affiliation |
| bonneville-dam | publishable | — | zero objections; new since last manifest update, spot-checked only |
| deception-pass-bridge | publishable | — | zero objections; one fabricated book caught in research and correctly swapped for a real one in the drop-in file — verified this session |
| multnomah-falls | publishable | — | zero objections; new since last manifest update, spot-checked only |
| winslow-ferry-terminal | needs-edit → hand-fixed | pass | 3 unsupported claims + 1 style objection hand-fixed after repair, including a fictitious street name used twice; also hand-corrected the frontmatter `period` field, which repair flagged but the assembler can't fix automatically |
| redwood-national-and-state-parks | needs-edit → hand-fixed | pass | 2 objections + 2 style hand-fixed after repair; one was a real title-proportionality issue (H1 over-framed around a minor closing item) — retitled "Among the Tallest Trees on Earth" |
| lava-beds-national-monument | needs-edit → hand-fixed | pass | First pipeline attempt failed badly (empty research pack, writer fabricated a full invented Modoc War entry — verify rejected it outright, 30 unsupported claims); relaunched fresh, succeeded with all-primary NPS sourcing; repair fixed an initial neutrality fail (dramatic "underdog" framing) to pass, then 2 objections + 2 style hand-fixed after repair. See its catalogue record for the full note on the failed attempt. |
| oregon-caves-national-monument | needs-edit → hand-fixed | pass | 6 objections + 1 style hand-fixed after repair, all minor wording drift; corrected a real age-conflation error (cave passages ~1.7 million years old, not the parent rock's ~210-million-year age); both listed books fabricated, dropped |
| skagit-valley-tulip-fields | needs-edit → hand-fixed | pass | 2 objections hand-fixed after repair (cleanest repair round of the session); corrects a real historical error — commercial tulip growing here began in 1906 with American grower Mary Brown Stewart, not in the 1940s with Dutch immigrants as the old draft claimed; both listed books fabricated, dropped |
| yaquina-head-lighthouse | needs-edit → hand-fixed | pass | First attempt hit the recurring empty-research-pack bug; writer correctly refused to fabricate facts but smuggled unsourced metadata (address, source ID, category, period) into the placeholder — verify caught it. Relaunched fresh, succeeded with primary BLM/OSU sourcing; 2 objections + 1 style hand-fixed after repair. See its catalogue record for the full note on the failed attempt. Both listed books fabricated/mismatched, dropped |
| fort-casey | corrected, openFlags: 2 (deliberate) | pass | 2026-07-26 run, rebuilt from three contradictory drafts, primary-tier sourcing. The 2 open flags are genuine source disagreements stated plainly in the text (gun count 35 vs. 34; 1861 lighthouse demolished vs. moved-and-reused) — correct behavior under the accuracy rule, not a defect. No catalogue record existed until this session backfilled one. Book list also fixed this session: `rewrites/fort-casey.md` was still carrying an older, unaudited 3-book list; updated to match the live file's already-audited single book (Umbrella Guide to Washington Lighthouses) so the swap doesn't get missed on push |

## 3. Held — do not push

- `kennewick-man-discovery-site` — category is Indigenous Heritage; the skill's own rule requires a not-yet-built third-reviewer process before this runs through the standard pipeline. Nothing was written for it. Same hold as museum-at-warm-springs, yakama-nation-museum, tamástslikt-cultural-institute.

## Gaps found while consolidating (all 3 closed)

1. ~~**`oregon-state-capitol` has no current catalogue record.**~~ — **CLOSED 2026-08-23.**
   The cloud session had re-researched and rewritten this entry from scratch on 2026-08-23 (different sources — SAH Archipedia, Kimberly Jensen/Oregon Encyclopedia, the 1993 Scotts Mills earthquake — than the 2026-08-18 version), but never produced a matching catalogue record, so its sourcing and verdict couldn't be confirmed. Rather than reverse-engineer a record for an undocumented draft, this session re-ran the full pipeline (research → write → verify → repair → re-verify) from scratch. The research agent's structured-output call failed mechanically on the first attempt (same bug hit on rajneeshpuram earlier — malformed JSON, agent gave up with an empty placeholder instead of retrying) and had to be relaunched; the second attempt produced a full, well-sourced pack. Repair left 2 objections, both confined to the `description` field (an invented causal claim about the 2025 statue re-gilding "outpacing" birds, and an uncited derived "18 months" construction duration) — hand-fixed directly. Also caught and hand-added one book citation the write stage's own research had verified but left out of its books list. `openFlags: 0`, neutrality `pass`. Both prior versions (2026-08-18 citation-only, and the cloud session's undocumented 2026-08-23 draft) are effectively superseded — the old `catalogue/oregon-state-capitol.md` is archived in `catalogue/_superseded/`.
2. ~~**`sun-valley-resort` has no catalogue record at all.**~~ — **CLOSED 2026-08-23.** Not fixed by this session — the cloud session added the missing `catalogue/sun-valley-resort.md` on its own, sometime after this gap was first flagged. Confirmed the file now exists and matches the drop-in.
3. ~~**fort-worden-battery-kinzie has two catalogue records in its history now.**~~ — **CLOSED 2026-08-23.** Diff-checked the live `verified`/`publishable` entry against the archived 2026-08-18 research pass, fact-by-fact. Everything matched or was complementary except one real issue: the live entry stated Brig. Gen. David H. Kinzie's death date (July 5, 1904) as flat, unattributed fact, sourced only to Coast Defense Study Group — a source the earlier, more rigorous pass had explicitly found does not meet any of the project's graded tiers, and had recommended dropping the date entirely (unconfirmed claims are deleted, not softened, per the project's standing rule). Hand-fixed: removed the date from the body paragraph and the matching sources-list entry. `openFlags` stays 0 — a sourcing-tier correction, not a newly discovered unsupported claim. See `catalogue/fort-worden-battery-kinzie.md` for the full note.

## Repo-hygiene reminder (still unresolved, see REVIEW-TRACKER.md for full detail)

`git status` shows ~308 files modified in the working tree that neither session
intentionally touched (mode-bit and line-ending noise from the device mount, not
real edits). Nothing is staged. Recommend spot-checking a couple of the flagged
files locally before any `git add -A` that would sweep this content-staging work
into the same commit.

## Folder layout after consolidation

- `rewrites/` — every drop-in `.md`, one canonical location (both sessions used this already).
- `catalogue/` — every before/after record, now the single canonical location. `rewrites/catalogue/` is deprecated (see its `README-MOVED.md`); its former contents were moved to `_to_delete/rewrites-catalogue-duplicates/` after being copied into `catalogue/`, not deleted.
- `catalogue/_superseded/` — new folder holding catalogue records whose matching drop-in file was later fully replaced by a different run, so they no longer describe the current `rewrites/` content. Kept for history, not for pushing.
- `src/content/locations/` — 4 files with book-citation-only fixes applied directly, ready to push independent of everything else here.
