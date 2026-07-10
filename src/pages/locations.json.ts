import { slugForCategory } from '../lib/categories';
import { href } from '../lib/url';
import { publishedLocations } from '../lib/publish';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const locations = await publishedLocations();
  const payload = locations
    .map((l) => ({
      slug: l.data.slug,
      title: l.data.title,
      category: l.data.category,
      categorySlug: slugForCategory(l.data.category),
      period: l.data.period ?? null,
      lat: l.data.coordinates.lat,
      lng: l.data.coordinates.lng,
      description: l.data.description.slice(0, 180),
      heroImage: l.data.heroImage ? href(l.data.heroImage) : null,
      hasAudio: Boolean(l.data.audio),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
};
