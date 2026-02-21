import ShellText from '../text';

describe('ShellText', () => {
  it('has header with title and tagline', () => {
    expect(ShellText.header.title).toBe('Victor Frye');
    expect(ShellText.header.tagline).toBe(
      'Your friendly neighborhood developer',
    );
  });

  it('has navigation entries', () => {
    expect(ShellText.navigation.about).toBe('About');
    expect(ShellText.navigation.resume).toBe('Resume');
    expect(ShellText.navigation.blog).toBe('Blog');
  });

  it('has footer socials', () => {
    expect(ShellText.footer.socials.linkedin).toBeDefined();
    expect(ShellText.footer.socials.github).toBeDefined();
    expect(ShellText.footer.socials.threads).toBeDefined();
    expect(ShellText.footer.socials.bluesky).toBeDefined();
    expect(ShellText.footer.socials.xbox).toBeDefined();
    expect(ShellText.footer.socials.email).toBeDefined();
    expect(ShellText.footer.socials.rss).toBeDefined();
  });

  it('toggleColor returns formatted toggle string', () => {
    expect(ShellText.footer.toggleColor('dark')).toBe('Toggle dark mode');
    expect(ShellText.footer.toggleColor('light')).toBe('Toggle light mode');
  });

  it('has privacy text', () => {
    expect(ShellText.footer.privacy).toBe('Privacy');
  });

  it('copyright returns formatted copyright string', () => {
    expect(ShellText.footer.copyright(2025)).toBe('© Victor Frye 2025');
    expect(ShellText.footer.copyright(2000)).toBe('© Victor Frye 2000');
  });
});
