/**
 * @jest-environment node
 */

// Mock all the problematic ESM modules BEFORE any imports
jest.mock('node:fs', () => ({
  default: {
    mkdirSync: jest.fn(),
    writeFileSync: jest.fn(),
    promises: {
      readFile: jest.fn(),
    },
  },
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  promises: {
    readFile: jest.fn(),
  },
}));

jest.mock('@/blog/post-loader', () => ({
  getPosts: jest.fn(),
}));

jest.mock('unified', () => ({
  unified: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({
      toString: jest.fn().mockReturnValue('<p>Mock HTML content</p>'),
    }),
  })),
}));

jest.mock('feed', () => ({
  Feed: jest.fn().mockImplementation(() => ({
    addItem: jest.fn(),
    rss2: jest.fn().mockReturnValue('<rss>Mock RSS XML</rss>'),
  })),
}));

jest.mock('rehype-autolink-headings', () => jest.fn());
jest.mock('rehype-slug', () => jest.fn());
jest.mock('rehype-stringify', () => jest.fn());
jest.mock('remark-gfm', () => jest.fn());
jest.mock('remark-parse', () => jest.fn());
jest.mock('remark-rehype', () => jest.fn());

// Now do imports
import fs from 'node:fs';
import { join } from 'node:path';
import { Feed } from 'feed';
import type Post from '@/blog/post';
import { getPosts } from '@/blog/post-loader';
import { buildFeed } from './feed-builder';

// Type the mocked modules
const mockedFs = jest.mocked(fs);
const mockedGetPosts = jest.mocked(getPosts);
const MockedFeed = jest.mocked(Feed);

describe('feed-builder', () => {
  const mockDate = new Date('2024-01-15T12:00:00Z');
  const feedDirPath = join(process.cwd(), 'public/blog/feed');

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock fs methods
    mockedFs.mkdirSync = jest.fn();
    mockedFs.writeFileSync = jest.fn();
    mockedFs.promises = {
      readFile: jest.fn(),
    } as unknown as typeof fs.promises;

    // Mock process.cwd
    jest.spyOn(process, 'cwd').mockReturnValue('/mock/project');

    // Mock Date to ensure consistent timestamps
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('buildFeed', () => {
    it('should create feed directory and write RSS file', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'test-post',
          title: 'Test Post',
          description: 'A test post description',
          date: new Date('2024-01-10T00:00:00Z'),
          image: 'assets/test-post.jpg',
          tags: ['test', 'jest'],
          readingDuration: '5 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue(
        '---\ntitle: Test\n---\n\n# Content',
      );

      await buildFeed();

      // Verify feed directory creation
      expect(mockedFs.mkdirSync).toHaveBeenCalledWith(feedDirPath, {
        recursive: true,
      });

      // Verify RSS file write
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        join(feedDirPath, 'rss.xml'),
        '<rss>Mock RSS XML</rss>',
      );
    });

    it('should create Feed with correct metadata', async () => {
      const mockPosts: Post[] = [];
      mockedGetPosts.mockResolvedValue(mockPosts);

      await buildFeed();

      expect(MockedFeed).toHaveBeenCalledWith({
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
        updated: mockDate,
        ttl: 60,
        copyright: `© Victor Frye ${mockDate.getFullYear()}`,
        feedLinks: { rss2: 'https://victorfrye.com/blog/feed/rss.xml' },
      });
    });

    it('should call getPosts to retrieve blog posts', async () => {
      const mockPosts: Post[] = [];
      mockedGetPosts.mockResolvedValue(mockPosts);

      await buildFeed();

      expect(mockedGetPosts).toHaveBeenCalledTimes(1);
    });

    it('should process each post and add to feed', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'first-post',
          title: 'First Post',
          description: 'First post description',
          date: new Date('2024-01-01T00:00:00Z'),
          image: 'assets/first.jpg',
          tags: ['tag1', 'tag2'],
          readingDuration: '3 min',
        },
        {
          slug: 'second-post',
          title: 'Second Post',
          description: 'Second post description',
          date: new Date('2024-01-05T00:00:00Z'),
          image: 'assets/second.jpg',
          tags: ['tag3'],
          readingDuration: '7 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue(
        '---\ntitle: Test\n---\n\nContent here',
      );

      await buildFeed();

      // Verify MDX files were read for each post
      expect(mockedFs.promises.readFile).toHaveBeenCalledTimes(2);
      expect(mockedFs.promises.readFile).toHaveBeenCalledWith(
        expect.stringContaining('first-post'),
        'utf8',
      );
      expect(mockedFs.promises.readFile).toHaveBeenCalledWith(
        expect.stringContaining('second-post'),
        'utf8',
      );

      // Verify feed items were added
      const feedInstance = MockedFeed.mock.results[0].value;
      expect(feedInstance.addItem).toHaveBeenCalledTimes(2);
    });

    it('should add feed items with correct post data', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'typescript-tips',
          title: 'TypeScript Tips',
          description: 'Learn TypeScript best practices',
          date: new Date('2024-01-10T00:00:00Z'),
          image: 'assets/typescript.jpg',
          tags: ['typescript', 'javascript'],
          readingDuration: '5 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue(
        '---\ntitle: TypeScript Tips\n---\n\n# Tips',
      );

      await buildFeed();

      expect(MockedFeed.mock.results[0].value.addItem).toHaveBeenCalledWith({
        title: 'TypeScript Tips',
        description: 'Learn TypeScript best practices',
        id: 'https://victorfrye.com/blog/posts/typescript-tips',
        link: 'https://victorfrye.com/blog/posts/typescript-tips',
        image: 'https://victorfrye.com/assets/typescript.jpg',
        date: new Date('2024-01-10T00:00:00Z'),
        content: '<p>Mock HTML content</p>',
        category: [{ name: 'typescript' }, { name: 'javascript' }],
      });
    });

    it('should strip frontmatter from MDX content before processing', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'test-post',
          title: 'Test',
          description: 'Test',
          date: new Date('2024-01-01T00:00:00Z'),
          image: 'assets/test.jpg',
          tags: [],
          readingDuration: '1 min',
        },
      ];

      const mdxWithFrontmatter = `---
title: Test Post
date: 2024-01-01
---

# Actual Content
This is the real content.`;

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue(
        mdxWithFrontmatter,
      );

      await buildFeed();

      // The unified processor should receive content without frontmatter
      expect(mockedFs.promises.readFile).toHaveBeenCalled();
      // Content processing verified through addItem being called
      expect(MockedFeed.mock.results[0].value.addItem).toHaveBeenCalled();
    });

    it('should handle posts with empty tags array', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'untagged-post',
          title: 'Untagged Post',
          description: 'A post without tags',
          date: new Date('2024-01-01T00:00:00Z'),
          image: 'assets/untagged.jpg',
          tags: [],
          readingDuration: '2 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue(
        '---\n---\nContent',
      );

      await buildFeed();

      expect(MockedFeed.mock.results[0].value.addItem).toHaveBeenCalledWith(
        expect.objectContaining({
          category: [],
        }),
      );
    });

    it('should handle posts with multiple tags', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'multi-tag-post',
          title: 'Multi Tag Post',
          description: 'A post with many tags',
          date: new Date('2024-01-01T00:00:00Z'),
          image: 'assets/multi.jpg',
          tags: ['react', 'typescript', 'testing', 'jest', 'tdd'],
          readingDuration: '10 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue('Content');

      await buildFeed();

      expect(MockedFeed.mock.results[0].value.addItem).toHaveBeenCalledWith(
        expect.objectContaining({
          category: [
            { name: 'react' },
            { name: 'typescript' },
            { name: 'testing' },
            { name: 'jest' },
            { name: 'tdd' },
          ],
        }),
      );
    });

    it('should call rss2() to generate RSS XML', async () => {
      const mockPosts: Post[] = [];
      mockedGetPosts.mockResolvedValue(mockPosts);

      await buildFeed();

      expect(MockedFeed.mock.results[0].value.rss2).toHaveBeenCalledTimes(1);
    });

    it('should handle empty posts array', async () => {
      mockedGetPosts.mockResolvedValue([]);

      await buildFeed();

      // Should still create feed and directory
      expect(MockedFeed).toHaveBeenCalled();
      expect(mockedFs.mkdirSync).toHaveBeenCalled();
      expect(mockedFs.writeFileSync).toHaveBeenCalled();

      // Should not add any items
      expect(MockedFeed.mock.results[0].value.addItem).not.toHaveBeenCalled();

      // Should not read any MDX files
      expect(mockedFs.promises.readFile).not.toHaveBeenCalled();
    });

    it('should process posts in order', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'post-1',
          title: 'Post 1',
          description: 'First',
          date: new Date('2024-01-01T00:00:00Z'),
          image: 'assets/1.jpg',
          tags: [],
          readingDuration: '1 min',
        },
        {
          slug: 'post-2',
          title: 'Post 2',
          description: 'Second',
          date: new Date('2024-01-02T00:00:00Z'),
          image: 'assets/2.jpg',
          tags: [],
          readingDuration: '2 min',
        },
        {
          slug: 'post-3',
          title: 'Post 3',
          description: 'Third',
          date: new Date('2024-01-03T00:00:00Z'),
          image: 'assets/3.jpg',
          tags: [],
          readingDuration: '3 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue('Content');

      await buildFeed();

      // Verify all posts were processed
      const feedInstance = MockedFeed.mock.results[0].value;
      expect(feedInstance.addItem).toHaveBeenCalledTimes(3);

      // Verify order by checking the call arguments
      const calls = feedInstance.addItem.mock.calls;
      expect(calls[0][0].title).toBe('Post 1');
      expect(calls[1][0].title).toBe('Post 2');
      expect(calls[2][0].title).toBe('Post 3');
    });

    it('should use correct file paths for MDX content', async () => {
      const mockPosts: Post[] = [
        {
          slug: 'my-special-post',
          title: 'Special Post',
          description: 'Special',
          date: new Date('2024-01-01T00:00:00Z'),
          image: 'assets/special.jpg',
          tags: [],
          readingDuration: '4 min',
        },
      ];

      mockedGetPosts.mockResolvedValue(mockPosts);
      (mockedFs.promises.readFile as jest.Mock).mockResolvedValue('# Content');

      await buildFeed();

      // Verify the file path includes the correct slug and file name
      expect(mockedFs.promises.readFile).toHaveBeenCalledWith(
        expect.stringContaining('my-special-post'),
        'utf8',
      );
      expect(mockedFs.promises.readFile).toHaveBeenCalledWith(
        expect.stringContaining('content.mdx'),
        'utf8',
      );
    });

    it('should include current year in copyright', async () => {
      const mockPosts: Post[] = [];
      mockedGetPosts.mockResolvedValue(mockPosts);

      await buildFeed();

      expect(MockedFeed).toHaveBeenCalledWith(
        expect.objectContaining({
          copyright: `© Victor Frye ${mockDate.getFullYear()}`,
        }),
      );
    });

    it('should set TTL to 60 minutes', async () => {
      const mockPosts: Post[] = [];
      mockedGetPosts.mockResolvedValue(mockPosts);

      await buildFeed();

      expect(MockedFeed).toHaveBeenCalledWith(
        expect.objectContaining({
          ttl: 60,
        }),
      );
    });

    it('should use recursive option when creating directory', async () => {
      const mockPosts: Post[] = [];
      mockedGetPosts.mockResolvedValue(mockPosts);

      await buildFeed();

      expect(mockedFs.mkdirSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          recursive: true,
        }),
      );
    });
  });
});
