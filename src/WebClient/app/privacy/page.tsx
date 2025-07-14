import { Policy, getPrivacyPolicy } from '@dotcom/privacy';

export default async function PrivacyPage() {
  const privacyPolicy = await getPrivacyPolicy();

  return <Policy html={privacyPolicy} />;
}
