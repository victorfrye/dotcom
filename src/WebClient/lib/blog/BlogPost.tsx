'use client';

import { useCallback } from 'react';

import usePost from './usePost';
import {
  Image,
  Tag,
  TagGroup,
  Title1,
  makeStaticStyles,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { CalendarRegular } from '@fluentui/react-icons';

import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  container: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
  banner: {
    maxWidth: 'calc(1080px)',
    height: 'auto',
  },
  title: {
    display: 'flex',
    color: tokens.colorBrandForeground2,
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalM}`,
  },
  postDate: {
    display: 'flex',
    alignItems: 'center',
    text: typographyStyles.caption1,
    gap: tokens.spacingHorizontalSNudge,
  },
  tags: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
  },
});

const useStaticStyles = makeStaticStyles({
  ul: {
    listStyleType: 'disc !important',
    marginBlockStart: `${tokens.spacingHorizontalL} !important`,
    marginBlockEnd: `${tokens.spacingHorizontalL} !important`,
    marginInlineStart: `${tokens.spacingHorizontalXL} !important`,
  },
  a: {
    color: tokens.colorBrandForegroundLink,
    textDecoration: 'none',
    ':hover': {
      color: `${tokens.colorBrandForegroundLinkHover} !important`,
      textDecoration: 'underline !important',
    },
    ':hover:active': {
      color: `${tokens.colorBrandForegroundLinkPressed} !important`,
      textDecoration: 'underline !important',
    },
  },
});

interface BlogPostProps {
  post: Post;
}

export default function BlogPost(props: BlogPostProps) {
  const styles = useStyles();
  useStaticStyles();

  const { post } = props;

  const { getDate } = usePost(post);

  const renderTags = useCallback((): JSX.Element[] => {
    if (!post.tags) {
      return [];
    }

    return post.tags
      .sort((a, b) => (a > b ? 1 : -1))
      .map((tag) => {
        return (
          <Tag role="listitem" size="medium" shape="circular" key={tag}>
            {tag}
          </Tag>
        );
      });
  }, [post.tags]);

  return (
    <div className={styles.container}>
      <Image
        src={`/${post.preview}`}
        alt={post.title}
        shape="rounded"
        block
        className={styles.banner}
      />

      <Title1 as="h1" className={styles.title}>
        {post.title}
      </Title1>

      <div className={styles.postDate}>
        <CalendarRegular />
        <em>{getDate()}</em>
      </div>

      <TagGroup className={styles.tags}>{renderTags()}</TagGroup>

      <div dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />
    </div>
  );
}
