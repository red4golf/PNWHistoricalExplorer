# Catalogue — fort-casey

**Pipeline:** rebuilt from three contradictory prior drafts, cross-checked against primary sources (Washington State Parks, NPS, National Register of Historic Places, U.S. Coast Guard historical summary) plus attributed secondary sources (HistoryLink.org, The Daily Herald, KIRO Newsradio/Feliks Banel).

**Final status: `corrected`, openFlags: 2, neutrality: pass** — run 2026-07-26, predates this session. No separate catalogue record was produced at the time; this file backfills one from the frontmatter notes and body so fort-casey has the same documentation as every other entry.

This is not a fresh pipeline run — no new research, writing, or verification was done today. This record exists to close a documentation gap: `rewrites/fort-casey.md` already carries real pipeline output (30/30 claims cited, primary source tier), it just never got written up.

## The two open flags — deliberately left unresolved, not defects

Both are genuine disagreements between primary/near-primary sources, recorded in the text rather than resolved by picking a side, consistent with the project's standing rule that unconfirmed claims are deleted or flagged, never silently smoothed over:

1. **Gun count at peak operation.** Washington State Parks counts 35 pieces (seven 10-inch disappearing guns, six 6-inch, two 5-inch, four 3-inch, sixteen 12-inch mortars). HistoryLink counts 34, with six 10-inch guns instead of seven — every other figure identical. Both are published, neither withdrawn. The body states both counts explicitly, attributed to each source, in the "Thirty-Four Guns, or Thirty-Five" section.
2. **Fate of the 1861 lighthouse building.** HistoryLink says it was moved several hundred feet north, used first as an Army medical center then as NCO barracks, taken down in 1928, its lumber built into a house on south Whidbey Island. The U.S. Coast Guard's own historical summary says the 1861 light was demolished. Both accounts are in print and contradict each other; the body states both, attributed, in "The Pearsons at Red Bluff, 1864-1878."

Given the project's accuracy rule, this is the correct final state for these two claims — invent no resolution, state the disagreement plainly — not a call for further repair work.

## Books

**Corrected 2026-08-23.** `rewrites/fort-casey.md` originally still carried the older, unaudited 3-book list ("Whidbey Island: Images of America" by the Langley Centennial Committee; "Forts of Washington: Historical and Archaeological Perspectives" by Dennis E. Lewarch, no URL on file; "Lighthouses of Washington: A Guide to Pacific Northwest Beacons" by Sharlene Nelson) even though the **live**, already-pushed `src/content/locations/fort-casey.md` had been narrowed to a single confirmed book by the 2026-08-18 book-citation audit. Rather than leave that swap for Charles to catch by hand, `rewrites/fort-casey.md`'s `books:` field was updated in place to match the live file exactly:

- **Umbrella Guide to Washington Lighthouses** — Sharlene Nelson & Ted Nelson — https://www.amazon.com/Washington-Lighthouses-Umbrella-Guides-Sharlene/dp/0945092547

The other three books were dropped from the rewrites copy, not because they were newly found to be fabricated (they weren't independently re-checked this session), but to keep the drop-in file consistent with the narrower list the live file already carries.

## Sources used

| Source | Tier |
|---|---|
| Washington State Parks, Fort Casey Historical State Park | primary-official |
| National Park Service, Ebey's Landing National Historical Reserve | primary-official |
| National Register of Historic Places, Admiralty Head Lighthouse (listed Dec 12, 1973) | primary-official |
| U.S. Coast Guard historical summary, Admiralty Head Light | primary-official |
| HistoryLink.org, Fort Casey and Admiralty Head essays | editorial-secondary (attributed in text) |
| The Daily Herald (Everett), Fort Casey test-firing coverage | editorial-secondary (attributed in text) |
| Feliks Banel, KIRO Newsradio, interview with Matthew Bell (WA State Parks) | editorial-secondary (attributed in text) |
