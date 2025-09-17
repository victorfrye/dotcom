'use client';

import { KeyboardEvent, useCallback, useRef } from 'react';

import {
  Body1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Image,
  Subtitle1,
  Tag,
  TagGroup,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { BookOpenFilled, CalendarRegular } from '@fluentui/react-icons';

import Post from '@dotcom/blog/post';
import { formatDate, formatTitle, getLink } from '@dotcom/blog/post-utils';

const useStyles = makeStyles({
  container: {
    maxWidth: '720px',
  },
  banner: {
    height: 'auto',
  },
  title: {
    display: 'flex',
    color: tokens.colorBrandForeground2,
    margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalNone}`,
  },
  postDate: {
    display: 'flex',
    alignItems: 'center',
    text: typographyStyles.caption2,
    color: tokens.colorNeutralForeground2,
    gap: tokens.spacingHorizontalSNudge,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: tokens.spacingVerticalS,
  },
});

interface PostPreviewProps {
  post: Post;
}

export default function PostCard(props: Readonly<PostPreviewProps>) {
  const styles = useStyles();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { post } = props;

  const handleCardActionClicked = useCallback((): void => {
    linkRef.current?.click();
  }, []);

  const handleCardActionKeyDowned = useCallback(
    (event: KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleCardActionClicked();
      }
    },
    [handleCardActionClicked]
  );

  const renderTags = useCallback((): JSX.Element[] => {
    if (!post.tags) {
      return [];
    }

    return post.tags
      .toSorted((a, b) => (a > b ? 1 : -1))
      .map((tag) => {
        return (
          <Tag size="small" shape="circular" appearance="filled" key={tag}>
            {tag}
          </Tag>
        );
      });
  }, [post.tags]);

  return (
    <Card
      onClick={handleCardActionClicked}
      onKeyDown={handleCardActionKeyDowned}
      appearance="filled"
      className={styles.container}
    >
      <CardPreview>
        <Image src={`/${post.image}`} alt={post.title} block />
      </CardPreview>

      <CardHeader
        header={
          <Subtitle1 as="h2" className={styles.title}>
            {formatTitle(post)}
          </Subtitle1>
        }
        description={
          <div className={styles.postDate}>
            <CalendarRegular />
            <em>
              {formatDate(post)} • {post.readingDuration}
            </em>
          </div>
        }
      />

      <TagGroup className={styles.tags}>{renderTags()}</TagGroup>

      <Body1>{post.description}</Body1>

      <CardFooter>
        <Button
          as="a"
          href={getLink(post)}
          ref={linkRef}
          appearance="primary"
          icon={<BookOpenFilled />}
          onClick={handleCardActionClicked}
        >
          Read article
        </Button>
      </CardFooter>
    </Card>
  );
}
