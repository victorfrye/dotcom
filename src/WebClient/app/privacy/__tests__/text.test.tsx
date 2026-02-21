import PrivacyText from '../text';

describe('PrivacyText', () => {
  it('has a policy title', () => {
    expect(PrivacyText.policy.title).toBe('Privacy Policy');
  });

  it('has a last updated prefix', () => {
    expect(PrivacyText.policy.lastUpdated).toBe('Last updated: ');
  });
});
