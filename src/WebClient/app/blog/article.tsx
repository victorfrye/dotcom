'use client';

import {
  Image,
  makeStyles,
  Tag,
  TagGroup,
  Title1,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { CalendarRegular } from '@fluentui/react-icons';
import { type JSX, type ReactNode, useCallback } from 'react';

import BlogBreadcrumb from '@/blog/breadcrumb';
import { formatDate, formatTitle } from '@/blog/post-formatters';

const useStyles = makeStyles({
  banner: {
    maxWidth: '1080px',
    height: 'auto',
  },
  title: {
    display: 'flex',
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalM}`,
  },
  postDate: {
    display: 'flex',
    alignItems: 'center',
    text: typographyStyles.caption1,
    color: tokens.colorNeutralForeground2,
    gap: tokens.spacingHorizontalSNudge,
  },
  tags: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
  },
});

export interface ArticlePost {
  title: string;
  subtitle?: string;
  date: Date | string;
  readingDuration: string;
  image: string;
  tags: string[];
  slug: string;
}

interface ArticleProps {
  post: ArticlePost;
  children: ReactNode;
}

export default function Article({ post, children }: Readonly<ArticleProps>) {
  const styles = useStyles();

  const renderTags = useCallback((): JSX.Element[] => {
    if (!post.tags) {
      return [];
    }

    return post.tags
      .toSorted((a, b) => (a > b ? 1 : -1))
      .map((tag) => {
        return (
          <Tag size="medium" shape="circular" appearance="filled" key={tag}>
            {tag}
          </Tag>
        );
      });
  }, [post.tags]);

  return (
    <main>
      <BlogBreadcrumb post={post} />

      <Image
        src={`/${post.image}`}
        alt={post.title}
        shape="rounded"
        block
        className={styles.banner}
      />

      <Title1 as="h1" className={styles.title}>
        {formatTitle(post)}
      </Title1>

      <div className={styles.postDate}>
        <CalendarRegular />
        <em>
          {formatDate(post.date)} • {post.readingDuration}
        </em>
      </div>

      <TagGroup className={styles.tags}>{renderTags()}</TagGroup>

      {children}
    </main>
  );
}
