// Editorial publishing helpers.
//
// The public site should render only entries that are meant to be live. Admin
// views (dashboard, quality, SEO, pipeline) use the raw collection so nothing
// is hidden from the operator. Centralizing the filter here means every public
// page stays consistent — change the rule once, it applies everywhere.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Loc = CollectionEntry<'locations'>;

/** Every location, including drafts — for admin / operator views only. */
export async function allLocations(): Promise<Loc[]> {
  return getCollection('locations');
}

/**
 * Locations that belong on the public site. Drafts are excluded from the build.
 * (publishDate is intentionally NOT used to hide entries — a static build only
 * regenerates on deploy, so date-gating would silently drop a page until the
 * next push. It is surfaced as a "scheduled" label in the pipeline board only.)
 */
export async function publishedLocations(): Promise<Loc[]> {
  return (await getCollection('locations')).filter((l) => !l.data.draft);
}
