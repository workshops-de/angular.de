import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Note: This endpoint returns a redirect to the pre-generated OG image
// For dynamic generation, you would need @vercel/og or similar in a serverless environment

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  // Find the post
  const posts = await getCollection('posts');
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  // Redirect to pre-generated OG image
  const ogImageUrl = `/og/${slug}.jpg`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': ogImageUrl,
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug }
  }));
}

