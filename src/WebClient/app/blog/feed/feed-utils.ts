import { Feed } from 'feed';
import fs from 'fs';
import { join } from 'path';

import { getPosts } from '@dotcom/blog/content-utils';

const feedDirPath = join(process.cwd(), 'public/blog/feed');

async function getFeed(): Promise<Feed> {
  const posts = await getPosts();
  const today = new Date();

  const feed = new Feed({
    title: 'Victor Frye Blog',
    description:
      'The personal blog of your friendly neighborhood developer, Victor Frye.',
    id: 'https://victorfrye.com/blog',
    link: 'https://victorfrye.com/blog',
    image: 'https://victorfrye.com/assets/profile.png',
    author: {
      name: 'Victor Frye',
      email: 'victorfrye@outlook.com',
      link: 'https://victorfrye.com',
      avatar: 'https://victorfrye.com/assets/profile.png',
    },
    language: 'en-US',
    updated: today,
    ttl: 60,
    copyright: `© Victor Frye ${today.getFullYear()}`,
    feedLinks: { rss2: 'https://victorfrye.com/blog/feed/rss.xml' },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      description: post.description,
      id: `https://victorfrye.com/blog/posts/${post.slug}`,
      link: `https://victorfrye.com/blog/posts/${post.slug}`,
      image: `https://victorfrye.com/${post.image}`,
      date: post.date,
      content: post.content,
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return feed;
}

export async function buildFeed() {
  const feed = await getFeed();

  fs.mkdirSync(feedDirPath, { recursive: true });
  fs.writeFileSync(join(feedDirPath, 'rss.xml'), feed.rss2());
}
