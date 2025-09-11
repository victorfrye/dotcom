import { permanentRedirect } from 'next/navigation';

import { buildFeed } from '@dotcom/blog/feed/feed-api';

export default async function FeedPage() {
  await buildFeed();

  permanentRedirect('/blog/feed/rss.xml');
}
