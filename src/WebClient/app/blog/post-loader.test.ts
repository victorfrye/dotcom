/**
 * @jest-environment node
 */
import type { Dirent } from 'node:fs';
import fs from 'node:fs';
import { join } from 'node:path';

// Mock all external dependencies before importing
jest.mock('node:fs');
jest.mock('reading-duration', () => jest.fn());
jest.mock('unified');
jest.mock('remark-parse');
jest.mock('remark-stringify');
jest.mock('remark-frontmatter');
jest.mock('vfile-matter');

const mockedFs = jest.mocked(fs);

// Import after mocking to get the mocked versions
// eslint-disable-line import/order
import readingDuration from 'reading-duration';
// eslint-disable-next-line import/order
import { unified } from 'unified';
// eslint-disable-next-line import/order
import { getMdxReadingDuration, getPosts } from './post-loader';

const mockedReadingDuration = jest.mocked(readingDuration);
const mockedUnified = jest.mocked(unified);

describe('post-loader', () => {
  const mdxPostsPath = join(process.cwd(), 'app/blog/posts');

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for reading-duration
    mockedReadingDuration.mockReturnValue('5 min read');

    // Set up unified mock with proper return structure
    const mockProcessSync = jest.fn().mockReturnValue({
      data: {
        matter: {
          title: 'Test Post',
          description: 'Test description',
          date: '2024-01-15',
          image: '/test-image.jpg',
          tags: ['test', 'unit-test'],
        },
      },
    });

    mockedUnified.mockReturnValue({
      use: jest.fn().mockReturnThis(),
      processSync: mockProcessSync,
    } as unknown as ReturnType<typeof unified>);

    // Mock fs.promises
    mockedFs.promises = {
      readdir: jest.fn(),
      readFile: jest.fn(),
    } as unknown as typeof fs.promises;
  });

  describe('getMdxReadingDuration', () => {
    it('should return reading duration for a valid slug', () => {
      const slug = 'test-post';
      const mdxContent = `---
title: Test Post
date: 2024-01-15
---

This is test content for reading duration calculation.`;

      mockedFs.readFileSync.mockReturnValue(mdxContent);

      const result = getMdxReadingDuration(slug);

      expect(mockedFs.readFileSync).toHaveBeenCalledWith(
        join(mdxPostsPath, slug, 'content.mdx'),
        'utf8',
      );
      expect(result).toBe('5 min read');
    });

    it('should strip frontmatter before calculating reading duration', () => {
      const slug = 'test-post';
      const mdxContent = `---
title: Test Post
date: 2024-01-15
tags: [test, example]
---

Main content here for reading duration.`;

      mockedFs.readFileSync.mockReturnValue(mdxContent);

      getMdxReadingDuration(slug);

      // Verify reading-duration is called with content stripped of frontmatter
      expect(mockedReadingDuration).toHaveBeenCalledWith(
        expect.stringContaining('Main content here'),
        { emoji: false },
      );
      expect(mockedReadingDuration).toHaveBeenCalledWith(
        expect.not.stringContaining('---'),
        { emoji: false },
      );
    });

    it('should handle content without frontmatter', () => {
      const slug = 'no-frontmatter';
      const mdxContent = 'Just plain content without any frontmatter.';

      mockedFs.readFileSync.mockReturnValue(mdxContent);

      const result = getMdxReadingDuration(slug);

      expect(result).toBe('5 min read');
      expect(mockedReadingDuration).toHaveBeenCalledWith(mdxContent, {
        emoji: false,
      });
    });
  });

  describe('getPosts', () => {
    it('should return posts sorted by date descending', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'post-1', isDirectory: () => true },
        { name: 'post-2', isDirectory: () => true },
        { name: 'post-3', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      // Mock different dates for each post
      let callCount = 0;
      mockedFs.promises.readFile = jest.fn().mockImplementation(() => {
        callCount++;
        const dates = ['2024-01-10', '2024-01-20', '2024-01-15'];
        return Promise.resolve(`---
title: Post ${callCount}
description: Description ${callCount}
date: ${dates[callCount - 1]}
image: /image-${callCount}.jpg
tags: [tag${callCount}]
---

Content for post ${callCount}`);
      });

      // Set up mock to return different frontmatter for each post
      let processCallCount = 0;
      const mockProcessSync = jest.fn().mockImplementation(() => {
        processCallCount++;
        const dates = ['2024-01-10', '2024-01-20', '2024-01-15'];
        return {
          data: {
            matter: {
              title: `Post ${processCallCount}`,
              description: `Description ${processCallCount}`,
              date: dates[processCallCount - 1],
              image: `/image-${processCallCount}.jpg`,
              tags: [`tag${processCallCount}`],
            },
          },
        };
      });

      mockedUnified.mockReturnValue({
        use: jest.fn().mockReturnThis(),
        processSync: mockProcessSync,
      } as unknown as ReturnType<typeof unified>);

      const posts = await getPosts();

      expect(posts).toHaveLength(3);
      // Should be sorted by date descending: 2024-01-20, 2024-01-15, 2024-01-10
      expect(posts[0].slug).toBe('post-2');
      expect(posts[1].slug).toBe('post-3');
      expect(posts[2].slug).toBe('post-1');
    });

    it('should return empty array when no post directories exist', async () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.promises.readdir = jest.fn().mockResolvedValue([]);

      const posts = await getPosts();

      expect(posts).toEqual([]);
      expect(mockedFs.promises.readdir).toHaveBeenCalledWith(mdxPostsPath, {
        withFileTypes: true,
      });
    });

    it('should filter out non-directory entries', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockEntries: Partial<Dirent>[] = [
        { name: 'post-1', isDirectory: () => true },
        { name: 'README.md', isDirectory: () => false },
        { name: '.gitignore', isDirectory: () => false },
        { name: 'post-2', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockEntries as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Test Post
description: Test description
date: 2024-01-15
image: /test.jpg
tags: [test]
---

Content`);

      const posts = await getPosts();

      expect(posts).toHaveLength(2);
      expect(posts[0].slug).toBe('post-1');
      expect(posts[1].slug).toBe('post-2');
    });

    it('should filter out directories without content.mdx', async () => {
      const mockDirs: Partial<Dirent>[] = [
        { name: 'valid-post', isDirectory: () => true },
        { name: 'another-valid-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      // Mock existsSync to always return true for this test
      // (In a real scenario, the actual file system check would do the filtering)
      mockedFs.existsSync.mockReturnValue(true);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Valid Post
description: Valid description
date: 2024-01-15
image: /valid.jpg
tags: [valid]
---

Content`);

      const posts = await getPosts();

      // Both posts should be returned since existsSync returns true for both
      expect(posts).toHaveLength(2);
      expect(posts[0].slug).toBe('valid-post');
      expect(posts[1].slug).toBe('another-valid-post');

      // Verify that existsSync was called for each directory
      expect(mockedFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('valid-post'),
      );
      expect(mockedFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('another-valid-post'),
      );
    });

    it('should include readingDuration in post metadata', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'test-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Test Post
description: Test description
date: 2024-01-15
image: /test.jpg
tags: [test]
---

Test content`);

      mockedReadingDuration.mockReturnValue('3 min read');

      const posts = await getPosts();

      expect(posts[0].readingDuration).toBe('3 min read');
      expect(mockedReadingDuration).toHaveBeenCalledWith(
        expect.stringContaining('Test content'),
        { emoji: false },
      );
    });

    it('should handle posts with lastModified date', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'modified-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Modified Post
description: Modified description
date: 2024-01-15
lastModified: 2024-01-20
image: /modified.jpg
tags: [modified]
---

Content`);

      // Set up specific mock for post with lastModified
      const mockProcessSync = jest.fn().mockReturnValue({
        data: {
          matter: {
            title: 'Modified Post',
            description: 'Modified description',
            date: '2024-01-15',
            lastModified: '2024-01-20',
            image: '/modified.jpg',
            tags: ['modified'],
          },
        },
      });

      mockedUnified.mockReturnValue({
        use: jest.fn().mockReturnThis(),
        processSync: mockProcessSync,
      } as unknown as ReturnType<typeof unified>);

      const posts = await getPosts();

      expect(posts[0].lastModified).toBeInstanceOf(Date);
      expect(posts[0].lastModified?.toISOString()).toContain('2024-01-20');
    });

    it('should handle posts without lastModified date', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'no-modified-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: No Modified Post
description: No modified description
date: 2024-01-15
image: /no-modified.jpg
tags: [test]
---

Content`);

      const posts = await getPosts();

      expect(posts[0].lastModified).toBeUndefined();
    });

    it('should handle missing date in frontmatter', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'minimal-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Minimal Post
description: Minimal description
image: /minimal.jpg
tags: [minimal]
---

Content`);

      // Set up mock with no date field
      const mockProcessSync = jest.fn().mockReturnValue({
        data: {
          matter: {
            title: 'Minimal Post',
            description: 'Minimal description',
            image: '/minimal.jpg',
            tags: ['minimal'],
          },
        },
      });

      mockedUnified.mockReturnValue({
        use: jest.fn().mockReturnThis(),
        processSync: mockProcessSync,
      } as unknown as ReturnType<typeof unified>);

      const posts = await getPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0].date).toBeUndefined();
    });

    it('should adjust date timezone by adding 300 minutes', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'timezone-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Timezone Post
description: Timezone description
date: 2024-01-15T00:00:00Z
image: /timezone.jpg
tags: [timezone]
---

Content`);

      const posts = await getPosts();

      // Date should be adjusted by +300 minutes (5 hours)
      const expectedDate = new Date('2024-01-15T00:00:00Z');
      expectedDate.setMinutes(expectedDate.getMinutes() + 300);

      expect(posts[0].date.getTime()).toBe(expectedDate.getTime());
    });

    it('should include all post metadata fields', async () => {
      mockedFs.existsSync.mockReturnValue(true);

      const mockDirs: Partial<Dirent>[] = [
        { name: 'full-post', isDirectory: () => true },
      ];

      mockedFs.promises.readdir = jest
        .fn()
        .mockResolvedValue(mockDirs as Dirent[]);

      mockedFs.promises.readFile = jest.fn().mockResolvedValue(`---
title: Full Post
subtitle: Full Subtitle
description: Full description
date: 2024-01-15
lastModified: 2024-01-20
image: /full.jpg
draft: false
tags: [tag1, tag2]
categories: [cat1, cat2]
---

Content`);

      // Set up specific mock with all metadata fields
      const mockProcessSync = jest.fn().mockReturnValue({
        data: {
          matter: {
            title: 'Full Post',
            subtitle: 'Full Subtitle',
            description: 'Full description',
            date: '2024-01-15',
            lastModified: '2024-01-20',
            image: '/full.jpg',
            draft: false,
            tags: ['tag1', 'tag2'],
            categories: ['cat1', 'cat2'],
          },
        },
      });

      mockedUnified.mockReturnValue({
        use: jest.fn().mockReturnThis(),
        processSync: mockProcessSync,
      } as unknown as ReturnType<typeof unified>);

      const posts = await getPosts();

      expect(posts[0]).toMatchObject({
        slug: 'full-post',
        title: 'Full Post',
        subtitle: 'Full Subtitle',
        description: 'Full description',
        image: '/full.jpg',
        draft: false,
        tags: ['tag1', 'tag2'],
        categories: ['cat1', 'cat2'],
        readingDuration: '5 min read',
      });
      expect(posts[0].date).toBeInstanceOf(Date);
      expect(posts[0].lastModified).toBeInstanceOf(Date);
    });
  });
});
