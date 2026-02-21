import { permanentRedirect } from 'next/navigation';

import { buildFeed } from '@/blog/feed/feed-builder';

export default async function FeedPage() {
  await buildFeed();

  permanentRedirect('/blog/feed/rss.xml');
}
