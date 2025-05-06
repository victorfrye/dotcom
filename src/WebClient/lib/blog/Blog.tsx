'use client';

import { useCallback } from 'react';

import BlogBreadcrumb from './BlogBreadcrumb';
import { makeStyles, tokens } from '@fluentui/react-components';

import PostCard from '@dotcom/lib/blog/PostCard';
import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  container: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
  header: {
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalSNudge}`,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    gap: tokens.spacingVerticalXXXL,
  },
});

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  const styles = useStyles();

  const renderPosts = useCallback(
    (): JSX.Element[] =>
      posts.map((post) => (
        <li key={post.slug} className={styles.container}>
          <PostCard post={post} />
        </li>
      )),
    [posts, styles]
  );

  return (
    <div className={styles.container}>
      <BlogBreadcrumb />

      <ul className={styles.list}>{renderPosts()}</ul>
    </div>
  );
}
