'use client';

import { useRef } from 'react';

import {
  Card,
  CardHeader,
  CardPreview,
  Image,
  Link,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import usePost from '@dotcom/lib/blog/usePost';
import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: tokens.fontSizeBase600,
    color: tokens.colorBrandForeground2,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalSNudge}`,
  },
});

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const styles = useStyles();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { getDate, getLink } = usePost(post);

  return (
    <Card>
      <CardPreview>
        <Image src={`/${post.preview}`} alt={post.title} block />
      </CardPreview>

      <CardHeader
        header={
          <Link href={getLink()} ref={linkRef}>
            {post.title}
          </Link>
        }
        description={getDate()}
      />

      <p>{post.description}</p>
    </Card>
  );
}
