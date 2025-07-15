import { MetadataRoute } from 'next';

import { getPosts } from '@dotcom/blog/posts-api';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://victorfrye.com',
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://victorfrye.com/privacy',
      lastModified: new Date(2025, 5, 14),
      priority: 0.1,
      changeFrequency: 'yearly',
    },
    {
      url: 'https://victorfrye.com/resume',
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://victorfrye.com/blog',
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
  ];

  posts.forEach((post) => {
    sitemap.push({
      url: `https://victorfrye.com/blog/posts/${post.slug}`,
      lastModified: post.lastModified ?? post.date,
      priority: 0.7,
      changeFrequency: 'weekly',
    });
  });

  return sitemap;
}
