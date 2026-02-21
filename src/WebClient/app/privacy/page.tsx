import Policy from '@/privacy/policy';
import Content, { frontmatter } from './content.mdx';

export default function PrivacyPage() {
  return (
    <Policy date={frontmatter.date}>
      <Content />
    </Policy>
  );
}
