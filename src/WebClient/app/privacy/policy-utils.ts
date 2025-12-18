import fs from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

interface PolicyDocument {
  name: string;
  date: Date;
  content: string;
}

const policyFilePath = join(process.cwd(), 'content/legal/policy.md');

export async function getPrivacyPolicy(): Promise<PolicyDocument> {
  const fileContents = await fs.promises.readFile(policyFilePath, 'utf8');
  const { data, content } = matter(fileContents);

  const date = data.date ? new Date(data.date) : undefined;

  return {
    name: data.title,
    date: date,
    content: await convertToHtml(content),
  } as PolicyDocument;
}

async function convertToHtml(markdown: string): Promise<string> {
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
