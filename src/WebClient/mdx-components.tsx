import type { MDXComponents } from 'mdx/types';

import {
  MdxA,
  MdxBlockquote,
  MdxCode,
  MdxEm,
  MdxH2,
  MdxH3,
  MdxImg,
  MdxLi,
  MdxOl,
  MdxP,
  MdxPre,
  MdxTable,
  MdxTd,
  MdxTh,
  MdxTr,
  MdxUl,
} from '@/blog/mdx-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: MdxH2,
    h3: MdxH3,
    p: MdxP,
    a: MdxA,
    img: MdxImg,
    em: MdxEm,
    pre: MdxPre,
    code: MdxCode,
    ul: MdxUl,
    ol: MdxOl,
    li: MdxLi,
    blockquote: MdxBlockquote,
    table: MdxTable,
    tr: MdxTr,
    th: MdxTh,
    td: MdxTd,
    ...components,
  };
}
