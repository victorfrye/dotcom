import type { Config as PrettierConfig } from 'prettier';

const prettierConfig: PrettierConfig = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: ['^react$|^react-dom', '<THIRD_PARTY_MODULES>', '^@dotcom/'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default prettierConfig;
