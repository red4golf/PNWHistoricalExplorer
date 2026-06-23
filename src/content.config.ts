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
  }),
});

export const collections = { locations };
