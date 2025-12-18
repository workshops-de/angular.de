import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig } from '../config/site';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => b.data.published_at.getTime() - a.data.published_at.getTime()
  );

  return rss({
    title: siteConfig.title,
    description: `Alles rund um ${siteConfig.topic}/JavaScript auf deutsch - Tutorials · Artikel · News · Workshops.`,
    site: context.site?.toString() || siteConfig.url,
    items: sortedPosts.slice(0, 20).map((post) => {
      // Extract slug from post id (e.g., "2025-06-09-angular-tutorial-deutsch/index" -> "angular-tutorial-deutsch")
      const folderName = post.id.split('/')[0];
      const slug = folderName.replace(/^\d{4}-\d{2}-\d{2}-/, '');

      return {
        title: post.data.title,
        pubDate: post.data.published_at,
        description: post.data.description || '',
        link: `/artikel/${slug}/`,
        author: post.data.author,
        categories: post.data.categories?.split(' ').filter(Boolean) || [],
      };
    }),
    customData: `<language>${siteConfig.language}-${siteConfig.language}</language>`,
  });
}
