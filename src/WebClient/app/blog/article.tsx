'use client';

import { useCallback } from 'react';

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

import BlogBreadcrumb from '@dotcom/blog/blog-breadcrumb';
import usePost from '@dotcom/blog/use-post';
import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  banner: {
    maxWidth: 'calc(1080px)',
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

const useMarkdownStyles = makeStaticStyles({
  ul: {
    margin: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalNone}`,
  },
  li: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  a: {
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: 'none',
  },
  'a:hover': {
    color: tokens.colorBrandForegroundLinkHover,
    textDecorationLine: 'underline',
  },
  'a:active': {
    color: tokens.colorBrandForegroundLinkPressed,
    textDecorationLine: 'underline',
  },
  p: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
  },
  h2: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero700,
  },
  h3: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
  },
  img: {
    width: '100%',
    maxWidth: '1080px',
    borderRadius: tokens.borderRadiusMedium,
  },
  pre: {
    marginLeft: `calc(-${tokens.fontSizeBase300} + -${tokens.lineHeightBase300})`,
    marginRight: `calc(-${tokens.fontSizeBase300} + -${tokens.lineHeightBase300})`,
    overflow: 'auto',
    padding: `calc((${tokens.fontSizeBase300} + ${tokens.lineHeightBase300}) / 2)`,
    wordWrap: 'normal',
    backgroundColor: tokens.colorNeutralBackgroundAlpha2,
    borderRadius: tokens.borderRadiusMedium,
  },
  code: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
});

interface ArticleProps {
  post: Post;
}

export default function Article({ post }: Readonly<ArticleProps>) {
  const styles = useStyles();
  useMarkdownStyles();

  const { getDate } = usePost(post);

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
        <em>
          {getDate()} • {post.readingDuration}
        </em>
      </div>

      <TagGroup className={styles.tags}>{renderTags()}</TagGroup>

      <div dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />
    </main>
  );
}
