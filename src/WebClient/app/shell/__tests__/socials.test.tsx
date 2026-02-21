import { renderWithProviders } from '../../../test-utils';
import SocialButtons from '../socials';

jest.mock('@/assets', () => ({
  BlueskyIcon: (props: Record<string, unknown>) => <svg {...props} />,
  GitHubIcon: (props: Record<string, unknown>) => <svg {...props} />,
  LinkedInIcon: (props: Record<string, unknown>) => <svg {...props} />,
  ThreadsIcon: (props: Record<string, unknown>) => <svg {...props} />,
  XboxIcon: (props: Record<string, unknown>) => <svg {...props} />,
}));

describe('SocialButtons', () => {
  it('renders social link buttons', () => {
    const { container } = renderWithProviders(<SocialButtons />);
    const links = container.querySelectorAll('a');
    expect(links.length).toBeGreaterThanOrEqual(7);
  });

  it('renders LinkedIn link', () => {
    const { container } = renderWithProviders(<SocialButtons />);
    const linkedinLink = container.querySelector(
      'a[href="https://www.linkedin.com/in/victorfrye"]',
    );
    expect(linkedinLink).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    const { container } = renderWithProviders(<SocialButtons />);
    const githubLink = container.querySelector(
      'a[href="https://github.com/victorfrye"]',
    );
    expect(githubLink).toBeInTheDocument();
  });
});
