declare module '*.mdx' {
  import type { ComponentType } from 'react';

  const MDXComponent: ComponentType;
  export default MDXComponent;

  export const frontmatter: {
    slug: string;
    title: string;
    subtitle?: string;
    description: string;
    date: string;
    lastModified?: string;
    image: string;
    draft?: boolean;
    tags: string[];
    categories?: string[];
  };
}
