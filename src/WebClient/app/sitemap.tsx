import { MetadataRoute } from 'next';

import { getPosts } from '@dotcom/lib/api';

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
      url: 'https://victorfrye.com/blog',
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
  ];

  posts.forEach((post) => {
    sitemap.push({
      url: `https://victorfrye.com/blog/posts/${post.slug}`,
      lastModified: post.lastMod,
      priority: 0.7,
      changeFrequency: 'weekly',
    });
  });

  return sitemap;
}
