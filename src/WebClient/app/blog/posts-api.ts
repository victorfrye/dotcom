import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import readingDuration from 'reading-duration';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { Post } from '@dotcom/types';

const postsDirectory = join(process.cwd(), 'content/posts');

async function getPostSlugs(): Promise<string[]> {
  return await fs.promises.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = join(postsDirectory, slug, 'index.md');
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const date = data.date ? new Date(data.date) : undefined;

  // Tell the date to be EST
  date?.setMinutes(date.getMinutes() + 300);

  const html = await getPostHtmlContent(content);

  return {
    slug,
    ...data,
    date: date,
    lastModified: data.lastModified ? new Date(data.lastModified) : undefined,
    readingDuration: readingDuration(html, { emoji: false }),
    content: html,
  } as Post;
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

async function getPostHtmlContent(markdown: string): Promise<string> {
  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(markdown);

  return content.toString();
}
