import Policy from '@dotcom/privacy/policy';
import { getPrivacyPolicy } from '@dotcom/privacy/policy-api';

export default async function PrivacyPage() {
  const privacyPolicy = await getPrivacyPolicy();

  return <Policy html={privacyPolicy.html} date={privacyPolicy.date} />;
}
