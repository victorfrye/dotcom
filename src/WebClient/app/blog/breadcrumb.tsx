'use client';

import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Tooltip,
  makeStyles,
  tokens,
  truncateBreadcrumbLongName,
} from '@fluentui/react-components';
import { HomeColor } from '@fluentui/react-icons';

import { Post } from '@dotcom/types';

const useStyles = makeStyles({
  breadcrumb: {
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalM}`,
  },
});

interface BlogBreadcrumbProps {
  post?: Post;
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
            <Tooltip withArrow content={post.title} relationship="label">
              <BreadcrumbButton
                href={`/blog/posts/${post.slug}`}
                current={!!post}
              >
                {truncateBreadcrumbLongName(post.title)}
              </BreadcrumbButton>
            </Tooltip>
          </BreadcrumbItem>
        </>
      )}
    </Breadcrumb>
  );
}
