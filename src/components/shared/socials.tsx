import {
  Image,
  Link,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { useDarkMode } from '../providers/darkMode';

interface ISocial {
  href: string;
  image: JSX.Element;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  button: {
    display: 'grid',
    width: '40px',
    height: '40px',
    backgroundColor: tokens.colorTransparentBackground,
    alignItems: 'center',
    justifyContent: 'center',
    textDecorationLine: 'none',
    ...shorthands.border('none'),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.outline(
      tokens.strokeWidthThick,
      'solid',
      tokens.colorNeutralForeground1,
    ),
    ...shorthands.transition('all', tokens.durationFaster),
    ':hover': {
      outlineOffset: tokens.strokeWidthThicker,
      ...shorthands.transition('all', tokens.durationFaster),
    },
    ':focus': {
      outlineOffset: tokens.strokeWidthThicker,
      ...shorthands.transition('all', tokens.durationFaster),
    },
    '& img': {
      ...shorthands.transition('all', tokens.durationFaster),
    },
    ':hover img': {
      transform: 'scale(1.15)',
      ...shorthands.transition('all', tokens.durationFaster),
    },
    ':focus img': {
      transform: 'scale(1.5)',
    },
  },
});

const Socials = () => {
  const styles = useStyles();
  const { isDark } = useDarkMode();

  const socialDetails: ISocial[] = [
    {
      href: 'https://threads.net/@thevictorfryeadventure',
      image: (
        <Image
          src={isDark ? '/images/threads.svg' : '/images/threads_dark.svg'}
          alt='Threads'
          height={20}
          width={20}
        />
      ),
    },
    {
      href: 'https://linkedin.com/in/victorfrye',
      image: (
        <Image
          src={isDark ? '/images/linkedin.svg' : '/images/linkedin_dark.svg'}
          alt='LinkedIn'
          height={20}
          width={20}
        />
      ),
    },
    {
      href: 'https://github.com/victorfrye',
      image: (
        <Image
          src={isDark ? '/images/github.svg' : '/images/github_dark.svg'}
          alt='GitHub'
          height={20}
          width={20}
        />
      ),
    },
    {
      href: 'mailto:victorfrye@outlook.com',
      image: (
        <Image
          src={isDark ? '/images/envelope.svg' : '/images/envelope_dark.svg'}
          alt='Email Me'
          height={20}
          width={20}
        />
      ),
    },
  ];

  const renderButtons = (): JSX.Element[] => {
    return socialDetails.map((social, index) => (
      <Link
        href={social.href}
        target='_blank'
        rel='noreferrer noopener'
        className={styles.button}
        key={index}
      >
        {social.image}
      </Link>
    ));
  };

  return <div className={styles.container}>{renderButtons()}</div>;
};

export default Socials;
