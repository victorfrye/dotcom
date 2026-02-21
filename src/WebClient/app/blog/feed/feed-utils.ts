import fs from 'node:fs';
import { join } from 'node:path';
import { Feed } from 'feed';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { getPosts } from '@/blog/content-utils';

const feedDirPath = join(process.cwd(), 'public/blog/feed');
const mdxPostsPath = join(process.cwd(), 'app/blog/posts');

async function getMdxHtmlContent(slug: string): Promise<string> {
  const mdxPath = join(mdxPostsPath, slug, 'content.mdx');
  const source = await fs.promises.readFile(mdxPath, 'utf8');
  const content = source.replace(/^---[\s\S]*?---\s*/, '');

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}

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

  for (const post of posts) {
    const content = await getMdxHtmlContent(post.slug);

    feed.addItem({
      title: post.title,
      description: post.description,
      id: `https://victorfrye.com/blog/posts/${post.slug}`,
      link: `https://victorfrye.com/blog/posts/${post.slug}`,
      image: `https://victorfrye.com/${post.image}`,
      date: post.date,
      content,
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return feed;
}

export async function buildFeed() {
  const feed = await getFeed();

  fs.mkdirSync(feedDirPath, { recursive: true });
  fs.writeFileSync(join(feedDirPath, 'rss.xml'), feed.rss2());
}
