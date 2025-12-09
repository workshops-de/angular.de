import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts collection
const postsCollection = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string(),
    co_author: z.string().optional(),
    published_at: z.coerce.date(),
    categories: z.string().optional(),
    header_image: z.string().optional().default('header.jpg'),
    toc: z.boolean().optional().default(false),
    language: z.string().optional().default('de'),
    canonical_url: z.string().optional(),
    noindex: z.boolean().optional().default(false),
    tutorial_page_order: z.string().optional(),
  })
});

// Books/chapters collection
const booksCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    number: z.number().optional(),
    description: z.string().optional(),
  })
});

// Users/authors collection
const usersCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/users' }),
  schema: z.object({
    permalink: z.string().optional().nullable(),
    name: z.string(),
    gravatar_uid: z.string().optional().nullable(),
    github: z.string().optional().nullable(),
    twitter: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    team: z.boolean().optional().nullable().default(false),
    trainer: z.boolean().optional().nullable().default(false),
    intro: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
  })
});

export const collections = {
  posts: postsCollection,
  books: booksCollection,
  users: usersCollection,
};

