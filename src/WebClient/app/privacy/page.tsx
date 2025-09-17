import Policy from '@dotcom/privacy/policy';
import { getPrivacyPolicy } from '@dotcom/privacy/policy-utils';

export default async function PrivacyPage() {
  const policy = await getPrivacyPolicy();

  return <Policy content={policy.content} date={policy.date} />;
}
