import matter from 'gray-matter';
import fs from 'node:fs';
import { join } from 'node:path';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { Post } from '@dotcom/types';

const postsDirectory = join(process.cwd(), 'content/posts');

export async function getPostSlugs(): Promise<string[]> {
  return await fs.promises.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = join(postsDirectory, slug, 'index.md');
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const date = data.date ? new Date(data.date) : undefined;

  const html = await getPostHtmlContent(content);

  return { slug, ...data, date, html } as unknown as Post;
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export async function getPostHtmlContent(markdown: string): Promise<string> {
  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStarryNight)
    .use(rehypeStringify)
    .process(markdown);

  return content.toString();
}
