'use client';

import { useCallback } from 'react';

import BlogBreadcrumb from './blog-breadcrumb';
import { makeStyles, tokens } from '@fluentui/react-components';

import PostPreview from '@dotcom/blog/post-preview';
import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
    marginBottom: 'auto',
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

export default function Blog({ posts }: Readonly<BlogProps>) {
  const styles = useStyles();

  const renderPosts = useCallback(
    (): JSX.Element[] =>
      posts.map((post) => (
        <li key={post.slug} className={styles.container}>
          <PostPreview post={post} />
        </li>
      )),
    [posts, styles]
  );

  return (
    <main className={styles.container}>
      <BlogBreadcrumb />

      <ul className={styles.list}>{renderPosts()}</ul>
    </main>
  );
}
