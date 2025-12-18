'use client';

import { makeStyles, tokens } from '@fluentui/react-components';
import { type JSX, useCallback } from 'react';
import type Post from '@/blog/post';
import PostCard from '@/blog/post-card';
import BlogBreadcrumb from './breadcrumb';

const useStyles = makeStyles({
  header: {
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalSNudge}`,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    gap: tokens.spacingVerticalXXXL,
    listStyleType: 'none',
    marginBlock: tokens.spacingVerticalNone,
    paddingInline: tokens.spacingHorizontalNone,
  },
  item: {
    display: 'flex',
    width: '48%',
    '@media screen and (max-width: 768px)': {
      width: '100%',
    },
    flex: '0 auto',
  },
});

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: Readonly<BlogProps>) {
  const styles = useStyles();

  const renderPosts = useCallback(
    (): JSX.Element[] =>
      posts.map((post) => (
        <li key={post.slug} className={styles.item}>
          <PostCard post={post} />
        </li>
      )),
    [posts, styles],
  );

  return (
    <>
      <BlogBreadcrumb />

      <ul className={styles.list}>{renderPosts()}</ul>
    </>
  );
}
