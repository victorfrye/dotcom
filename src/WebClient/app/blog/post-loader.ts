import fs from 'node:fs';
import { join } from 'node:path';
import readingDuration from 'reading-duration';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

import type Post from '@/blog/post';

const mdxPostsPath = join(process.cwd(), 'app/blog/posts');

function extractFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const file = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (_tree, file) => {
      matter(file);
    })
    .processSync(raw);

  const data = (file.data.matter ?? {}) as Record<string, unknown>;
  const content = raw.replace(/^---[\s\S]*?---\s*/, '');
  return { data, content };
}

async function getMdxPostSlugs(): Promise<string[]> {
  const dirs = await fs.promises.readdir(mdxPostsPath, {
    withFileTypes: true,
  });

  return dirs
    .filter(
      (dir) =>
        dir.isDirectory() &&
        fs.existsSync(join(mdxPostsPath, dir.name, 'content.mdx')),
    )
    .map((dir) => dir.name);
}

export function getMdxReadingDuration(slug: string): string {
  const mdxPath = join(mdxPostsPath, slug, 'content.mdx');
  const raw = fs.readFileSync(mdxPath, 'utf8');
  const { content } = extractFrontmatter(raw);
  return readingDuration(content, { emoji: false });
}

async function getPostMetadata(slug: string): Promise<Post> {
  const mdxPath = join(mdxPostsPath, slug, 'content.mdx');
  const raw = await fs.promises.readFile(mdxPath, 'utf8');
  const { data, content } = extractFrontmatter(raw);

  const date = data.date ? new Date(data.date as string) : undefined;
  date?.setMinutes(date.getMinutes() + 300);

  return {
    slug,
    ...data,
    date,
    lastModified: data.lastModified
      ? new Date(data.lastModified as string)
      : undefined,
    readingDuration: readingDuration(content, { emoji: false }),
  } as Post;
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await getMdxPostSlugs();
  const posts = await Promise.all(slugs.map(getPostMetadata));

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
