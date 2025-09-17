import { MetadataRoute } from 'next';

import { getPosts } from '@dotcom/blog/content-utils';
import { getPrivacyPolicy } from '@dotcom/privacy/policy-utils';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const privacyPolicy = await getPrivacyPolicy();
  const now = new Date();

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://victorfrye.com',
      lastModified: now,
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://victorfrye.com/privacy',
      lastModified: privacyPolicy.date,
      priority: 0.1,
      changeFrequency: 'yearly',
    },
    {
      url: 'https://victorfrye.com/resume',
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://victorfrye.com/blog',
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://victorfrye.com/blog/feed/rss.xml',
      lastModified: now,
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
