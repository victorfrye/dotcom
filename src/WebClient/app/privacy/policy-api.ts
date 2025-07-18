import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import LegalDocument from '@dotcom/types/legal-document';

const privacyDirectory = join(process.cwd(), 'app/privacy');

export async function getPrivacyPolicy(): Promise<LegalDocument> {
  const fullPath = join(privacyDirectory, 'policy.md');
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const date = data.date ? new Date(data.date) : undefined;

  return {
    name: data.title,
    date: date,
    html: await getPolicyHtmlContent(content),
  } as LegalDocument;
}

async function getPolicyHtmlContent(markdown: string): Promise<string> {
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
