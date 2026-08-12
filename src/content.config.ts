import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Hand-authored events. These are the fallback/archive record — the Luma embed
 * on /events is the live source organizers actually maintain.
 */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    summary: z.string(),
    speaker: z.string().optional(),
    rsvpUrl: z.string().url().optional(),
  }),
});

export const collections = { events };
