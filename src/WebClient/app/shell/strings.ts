const ShellText = {
  header: {
    title: 'Victor Frye',
    tagline: 'Your friendly neighborhood developer',
  },
  navigation: {
    about: 'About',
    resume: 'Resume',
    blog: 'Blog',
  },
  footer: {
    socials: {
      linkedin: 'Victor Frye | LinkedIn',
      github: 'victorfrye | GitHub',
      threads: '@thevictorfryeadventure | Threads',
      bluesky: 'victorfrye.com | Bluesky',
      xbox: 'FrenchFrye6173 | Xbox',
      email: 'victorfrye@outlook.com | Email',
      rss: 'Blog RSS feed | Victor Frye',
    },
    toggleColor(mode: string) {
      return `Toggle ${mode} mode`;
    },
    privacy: 'Privacy',
    copyright(year: number) {
      return `© Victor Frye ${year}`;
    },
  },
};

export default ShellText;
