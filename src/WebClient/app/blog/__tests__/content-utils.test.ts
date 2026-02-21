/**
 * @jest-environment node
 */
import fs from 'node:fs';
import path from 'node:path';

describe('content-utils', () => {
  const postsDir = path.join(process.cwd(), 'app/blog/posts');

  it('has blog post directories with content.mdx files', () => {
    const dirs = fs.readdirSync(postsDir, { withFileTypes: true });
    const postDirs = dirs.filter((d) => d.isDirectory());

    expect(postDirs.length).toBeGreaterThan(0);

    for (const dir of postDirs) {
      const mdxPath = path.join(postsDir, dir.name, 'content.mdx');
      expect(fs.existsSync(mdxPath)).toBe(true);
    }
  });

  it('each content.mdx has valid YAML frontmatter', () => {
    const dirs = fs.readdirSync(postsDir, { withFileTypes: true });
    const postDirs = dirs.filter((d) => d.isDirectory());

    for (const dir of postDirs) {
      const mdxPath = path.join(postsDir, dir.name, 'content.mdx');
      const content = fs.readFileSync(mdxPath, 'utf8');

      expect(content.startsWith('---')).toBe(true);

      const frontmatterEnd = content.indexOf('---', 3);
      expect(frontmatterEnd).toBeGreaterThan(3);

      const frontmatter = content.slice(3, frontmatterEnd);
      expect(frontmatter).toContain('title:');
      expect(frontmatter).toContain('date:');
      expect(frontmatter).toContain('slug:');
    }
  });

  it('each post directory has a page.tsx wrapper', () => {
    const dirs = fs.readdirSync(postsDir, { withFileTypes: true });
    const postDirs = dirs.filter((d) => d.isDirectory());

    for (const dir of postDirs) {
      const pagePath = path.join(postsDir, dir.name, 'page.tsx');
      expect(fs.existsSync(pagePath)).toBe(true);
    }
  });
});
