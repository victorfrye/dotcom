'use client';

import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  makeStyles,
  tokens,
  truncateBreadcrumbLongName,
} from '@fluentui/react-components';
import { HomeColor } from '@fluentui/react-icons';

import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  breadcrumb: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalNone} ${tokens.spacingHorizontalM}`,
  },
});

interface BlogBreadcrumbProps {
  post?: Post;
}

export default function BlogBreadcrumb(props: Readonly<BlogBreadcrumbProps>) {
  const styles = useStyles();
  const { post } = props;

  return (
    <Breadcrumb size="large" className={styles.breadcrumb}>
      <BreadcrumbItem>
        <BreadcrumbButton href="/" icon={<HomeColor />}>
          Home
        </BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href="/blog" current={!post}>
          Blog
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
            <BreadcrumbButton
              href={`/blog/posts/${post.slug}`}
              current={!!post}
            >
              {truncateBreadcrumbLongName(post.title)}
            </BreadcrumbButton>
          </BreadcrumbItem>
        </>
      )}
    </Breadcrumb>
  );
}
