'use client';

import { useCallback } from 'react';

import { Post } from '@dotcom/types';

export default function usePost(post: Post) {
  const getDate = useCallback(
    (): string =>
      new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    [post]
  );

  const getLink = useCallback((): string => {
    return `/blog/posts/${post.slug}`;
  }, [post]);

  return {
    post,
    getDate,
    getLink,
  };
}
