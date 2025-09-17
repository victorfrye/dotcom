'use client';

import { useCallback } from 'react';

import BlogBreadcrumb from './breadcrumb';
import { makeStyles, tokens } from '@fluentui/react-components';

import Post from '@dotcom/blog/post';
import PostCard from '@dotcom/blog/post-card';

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
    [posts, styles]
  );

  return (
    <>
      <BlogBreadcrumb />

      <ul className={styles.list}>{renderPosts()}</ul>
    </>
  );
}
