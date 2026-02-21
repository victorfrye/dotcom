'use client';

import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { HomeColor } from '@fluentui/react-icons';

import type { ArticlePost } from '@/blog/article';
import { getLink } from '@/blog/post-utils';

const useStyles = makeStyles({
  breadcrumb: {
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalM}`,
  },
});

interface BlogBreadcrumbProps {
  post?: ArticlePost;
}

export default function BlogBreadcrumb(props: Readonly<BlogBreadcrumbProps>) {
  const styles = useStyles();
  const { post } = props;

  return (
    <Breadcrumb size="medium" className={styles.breadcrumb}>
      <BreadcrumbItem>
        <BreadcrumbButton href="/blog" icon={<HomeColor />} current={!post}>
          Home
        </BreadcrumbButton>
      </BreadcrumbItem>

      {post && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href="/blog">Posts</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={getLink(post)} current={!!post}>
              {post.title}
            </BreadcrumbButton>
          </BreadcrumbItem>
        </>
      )}
    </Breadcrumb>
  );
}
