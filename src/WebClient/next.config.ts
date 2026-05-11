import { withGriffelCSSExtraction } from '@griffel/next-extraction-plugin';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],

  reactStrictMode: true,
  reactCompiler: true,

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config) => {
    // Add Griffel loader for CSS-in-JS support
    config.module.rules.unshift(
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@griffel/webpack-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx|mdx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@griffel/webpack-loader',
            options: {
              babelOptions: {
                presets: ['next/babel'],
              },
            },
          },
        ],
      },
    );

    // Configure SVG handling
    // biome-ignore lint/suspicious/noExplicitAny: Webpack config typing
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  redirects: async () => [
    {
      source: '/blog/posts/hello-aspire-breaking-down-key-features',
      destination: '/blog/posts/hello-aspire',
      permanent: true,
    },
    {
      source: '/blog/posts/real-world-aspirifying',
      destination: '/blog/posts/real-world-aspireifying',
      permanent: true,
    },
  ],
};

const withGriffel = withGriffelCSSExtraction();

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      'remark-mdx-frontmatter',
      'remark-gfm',
    ],
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
  },
});

export default withGriffel(withMDX(nextConfig));
