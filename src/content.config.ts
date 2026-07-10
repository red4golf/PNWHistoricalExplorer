import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum([
      'Aviation and Transportation',
      'Culture and Community',
      'Indigenous Heritage',
      'Industry and Agriculture',
      'Landmarks and Memorials',
      'Maritime',
      'Military and Conflict',
      'Natural Wonders',
      'Towns and Settlements',
    ]),
    legacyCategory: z.string().nullable().optional(),
    period: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    description: z.string(),
    heroImage: z.string().nullable(),
    audio: z.string().nullable(),
    // Editorial pipeline. Absent == published now.
    //  draft: true      → excluded from the public site build (still visible in /admin).
    //  publishDate      → informational "go-live" date; shows as "scheduled" in the
    //                     pipeline board when in the future. Does NOT auto-hide the
    //                     entry (a static build only refreshes on deploy).
    draft: z.boolean().default(false),
    publishDate: z.string().nullable().optional(),
    books: z
      .array(
        z.object({
          title: z.string(),
          author: z.string().nullable().optional(),
          url: z.string().nullable().optional(),
        })
      )
      .default([]),
    sourceId: z.number(),
    mergedFrom: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          legacyCategory: z.string().nullable().optional(),
        })
      )
      .optional(),
    // Fact-check / verification record. All optional; absence == "unverified".
    // Populated by the academic-standard sourcing pass (see location-factcheck-standard).
    factcheck: z
      .object({
        status: z
          .enum(['unverified', 'in-review', 'verified', 'corrected', 'flagged'])
          .default('unverified'),
        lastChecked: z.string().nullable().default(null), // ISO date, e.g. 2026-07-09
        reviewer: z.string().nullable().default(null),
        sourceTier: z
          .enum(['primary', 'peer-reviewed', 'secondary', 'none'])
          .default('none'),
        claimsTotal: z.number().default(0),
        claimsCited: z.number().default(0),
        openFlags: z.number().default(0),
        neutrality: z.enum(['pass', 'fail', 'n/a']).default('n/a'),
        // Content hash captured at check time; a later edit changes the live
        // hash and flips the entry to "stale / re-review" automatically.
        checkedHash: z.string().nullable().default(null),
        notes: z.string().nullable().default(null),
      })
      .default({}),
  }),
});

export const collections = { locations };
