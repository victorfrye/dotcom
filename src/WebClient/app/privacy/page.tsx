import { getPrivacyPolicy } from '@dotcom/privacy/policy-api';
import PrivacyPolicy from '@dotcom/privacy/privacy-policy';

export default async function PrivacyPage() {
  const privacyPolicy = await getPrivacyPolicy();

  return <PrivacyPolicy html={privacyPolicy} />;
}
