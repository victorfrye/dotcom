import { Image, Link, makeStyles, shorthands, tokens } from "@fluentui/react-components";

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
        ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorNeutralForeground1),
        ...shorthands.transition('all', tokens.durationSlow),
        ':hover': {
            outlineOffset: tokens.strokeWidthThicker,
            ...shorthands.transition('all', tokens.durationSlow),
        },
        ' img': {
            ...shorthands.transition('all', tokens.durationSlow),
        },
        ':hover img': {
            transform: 'scale(1.15)',
            ...shorthands.transition('all', tokens.durationSlow),
        },
        ':hover:nth-child(1)': {
            backgroundColor: '#000000',
        },
        ':hover:nth-child(2)': {
            backgroundColor: '#0077B5',
        },
        ':hover:nth-child(3)': {
            backgroundColor: '#333333',
        },
        ':hover:nth-child(4)': {
            backgroundColor: '#127CD6',
        },
    },
});

const Socials = () => {
    const styles = useStyles();

    const socialDetails: ISocial[] = [
        {
            href: "https://threads.net/@thevictorfryeadventure",
            image: <Image src="/images/threads.svg" alt="Threads" height={20} width={20} />
        },
        {
            href: "https://linkedin.com/in/victorfrye",
            image: <Image src="/images/linkedin.svg" alt="LinkedIn" height={20} width={20} />
        },
        {
            href: "https://github.com/victorfrye",
            image: <Image src="/images/github.svg" alt="GitHub" height={20} width={20} />
        },
        {
            href: "mailto:victorfrye@outlook.com",
            image: <Image src="/images/envelope.svg" alt="Email Me" height={20} width={20} />
        }
    ];

    const renderButtons = (): JSX.Element[] => {
        return socialDetails.map((social, index) =>
            <Link href={social.href} target="_blank" rel="noreferrer noopener" className={styles.button} key={index}>
                {social.image}
            </Link>
        );
    }

    return (
        <div className={styles.container}>
            {renderButtons()}
        </div>
    )
}

export default Socials;
