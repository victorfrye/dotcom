import CookieText from './strings';

describe('CookieText', () => {
  it('has consent dialog title', () => {
    expect(CookieText.consentDialog.title).toBe('We value your privacy');
  });

  it('has manager dialog title', () => {
    expect(CookieText.managerDialog.title).toBe('Manage your cookie settings');
  });

  it('has consent row titles', () => {
    expect(CookieText.consentRow.necessary.title).toBe('Necessary');
    expect(CookieText.consentRow.analytics.title).toBe('Analytics');
    expect(CookieText.consentRow.advertising.title).toBe('Advertising');
  });

  it('has button labels', () => {
    expect(CookieText.buttons.accept).toBe('Accept all');
    expect(CookieText.buttons.reject).toBe('Reject unnecessary');
    expect(CookieText.buttons.manage).toBe('Manage cookies');
    expect(CookieText.buttons.save).toBe('Save settings');
  });
});
