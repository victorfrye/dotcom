'use client';

import {
  Image,
  Link,
  makeStyles,
  mergeClasses,
  Text,
  tokens,
} from '@fluentui/react-components';
import type { ComponentPropsWithoutRef, JSX } from 'react';

const useStyles = makeStyles({
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
  p: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
  },
  a: {
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: 'none',
    ':hover': {
      color: tokens.colorBrandForegroundLinkHover,
      textDecorationLine: 'underline',
    },
    ':active': {
      color: tokens.colorBrandForegroundLinkPressed,
      textDecorationLine: 'underline',
    },
  },
  img: {
    maxWidth: 'min(100%, 1080px)',
    maxHeight: '608px',
    height: 'auto',
    borderRadius: tokens.borderRadiusMedium,
  },
  imgCaption: {
    display: 'block',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
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
  ul: {
    margin: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalNone}`,
  },
  ol: {
    margin: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalNone}`,
  },
  li: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  blockquote: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
    paddingLeft: tokens.spacingHorizontalL,
    borderLeft: `${tokens.strokeWidthThick} solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    fontStyle: 'italic',
    lineHeight: tokens.lineHeightBase500,
  },
  table: {
    borderCollapse: 'collapse',
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
  tr: {
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  th: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  td: {
    height: tokens.spacingVerticalXXXL,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
  },
});

function MdxH2(props: ComponentPropsWithoutRef<'h2'>): JSX.Element {
  const styles = useStyles();
  return <h2 {...props} className={mergeClasses(styles.h2, props.className)} />;
}

function MdxH3(props: ComponentPropsWithoutRef<'h3'>): JSX.Element {
  const styles = useStyles();
  return <h3 {...props} className={mergeClasses(styles.h3, props.className)} />;
}

function MdxP(props: ComponentPropsWithoutRef<'p'>): JSX.Element {
  const styles = useStyles();
  return <p {...props} className={mergeClasses(styles.p, props.className)} />;
}

function MdxA(props: ComponentPropsWithoutRef<'a'>): JSX.Element {
  const styles = useStyles();
  return (
    <Link
      href={props.href ?? ''}
      className={mergeClasses(styles.a, props.className)}
    >
      {props.children}
    </Link>
  );
}

function MdxImg(props: ComponentPropsWithoutRef<'img'>): JSX.Element {
  const styles = useStyles();
  return (
    <Image
      src={props.src ?? ''}
      alt={props.alt ?? ''}
      shape="rounded"
      className={mergeClasses(styles.img, props.className)}
    />
  );
}

function MdxEm(props: ComponentPropsWithoutRef<'em'>): JSX.Element {
  const styles = useStyles();

  // Image captions: <em> immediately after <img> is rendered as a caption
  return (
    <Text as="em" className={styles.imgCaption}>
      {props.children}
    </Text>
  );
}

function MdxPre(props: ComponentPropsWithoutRef<'pre'>): JSX.Element {
  const styles = useStyles();
  return (
    <pre {...props} className={mergeClasses(styles.pre, props.className)} />
  );
}

function MdxCode(props: ComponentPropsWithoutRef<'code'>): JSX.Element {
  const styles = useStyles();
  return (
    <code {...props} className={mergeClasses(styles.code, props.className)} />
  );
}

function MdxUl(props: ComponentPropsWithoutRef<'ul'>): JSX.Element {
  const styles = useStyles();
  return <ul {...props} className={mergeClasses(styles.ul, props.className)} />;
}

function MdxOl(props: ComponentPropsWithoutRef<'ol'>): JSX.Element {
  const styles = useStyles();
  return <ol {...props} className={mergeClasses(styles.ol, props.className)} />;
}

function MdxLi(props: ComponentPropsWithoutRef<'li'>): JSX.Element {
  const styles = useStyles();
  return <li {...props} className={mergeClasses(styles.li, props.className)} />;
}

function MdxBlockquote(
  props: ComponentPropsWithoutRef<'blockquote'>,
): JSX.Element {
  const styles = useStyles();
  return (
    <blockquote
      {...props}
      className={mergeClasses(styles.blockquote, props.className)}
    />
  );
}

function MdxTable(props: ComponentPropsWithoutRef<'table'>): JSX.Element {
  const styles = useStyles();
  return (
    <table {...props} className={mergeClasses(styles.table, props.className)} />
  );
}

function MdxTr(props: ComponentPropsWithoutRef<'tr'>): JSX.Element {
  const styles = useStyles();
  return <tr {...props} className={mergeClasses(styles.tr, props.className)} />;
}

function MdxTh(props: ComponentPropsWithoutRef<'th'>): JSX.Element {
  const styles = useStyles();
  return <th {...props} className={mergeClasses(styles.th, props.className)} />;
}

function MdxTd(props: ComponentPropsWithoutRef<'td'>): JSX.Element {
  const styles = useStyles();
  return <td {...props} className={mergeClasses(styles.td, props.className)} />;
}

export {
  MdxH2,
  MdxH3,
  MdxP,
  MdxA,
  MdxImg,
  MdxEm,
  MdxPre,
  MdxCode,
  MdxUl,
  MdxOl,
  MdxLi,
  MdxBlockquote,
  MdxTable,
  MdxTr,
  MdxTh,
  MdxTd,
};
