'use client';

import { Avatar, Caption1, Card, CardFooter, CardHeader, Subtitle2, Switch, SwitchOnChangeData, Title1, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import Socials from "@dotcom/components/shared/socials";
import { useDarkMode } from "@dotcom/components/providers/darkMode";

const useStyles = makeStyles({
    frame: {
        display: "flex",
        minHeight: "calc(100dvh - (var(--spacingVerticalXXXL) * 2))",
        '@media screen and (max-width: 576px)': {
            minHeight: "100dvh",
            ...shorthands.padding(tokens.spacingVerticalNone),
        },
        ...shorthands.padding(tokens.spacingVerticalXXXL),
    },
    profileCard: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxShadow: tokens.shadow64,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    },
    header: {
        alignItems: 'center',
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXXL, tokens.spacingVerticalNone),
    },
    title: {
        ...shorthands.margin(tokens.spacingVerticalNone, tokens.spacingHorizontalSNudge),
    },
    tagline: {
        color: tokens.colorBrandForeground2,
        ...shorthands.margin(tokens.spacingVerticalNone, tokens.spacingHorizontalSNudge),
    },
    footer: {
        display: 'flex',
        '@media screen and (max-width: 576px)': {
            flexDirection: 'column',
        },
        justifyItems: 'center',
        marginTop: 'auto',
        ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalXL, tokens.spacingVerticalXL),
    },
    switch: {
        marginTop: 'auto',
        marginBottom: 'auto',
        '@media screen and (max-width: 576px)': {
            marginLeft: 'auto',
            marginRight: 'auto',
            ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalL, tokens.spacingVerticalNone),
        },
        ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalM),
    },
    copyright: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        '@media screen and (max-width: 576px)': {
            marginRight: 'auto',
            ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalL, tokens.spacingVerticalNone),

        },
        flexWrap: 'wrap',
        ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalL),
    }
});

const Profile = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const styles = useStyles();
    const { isDark, onDarkModeToggled } = useDarkMode();

    const handleDarkModeToggled = (event: React.ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
        onDarkModeToggled(data.checked);;
    };

    return (
        <div className={styles.frame}>
            <Card className={styles.profileCard}>
                <CardHeader className={styles.header}
                    image={<Avatar
                        image={{ src: "/images/profile.png", alt: "a profile picture of Victor Frye" }}
                        color="brand"
                        name="Victor Frye"
                        active="active"
                        activeAppearance="ring-shadow"
                        size={72}
                    />}
                    header={<Title1 as="h1" wrap={false} className={styles.title}>Victor Frye</Title1>}
                    description={<Subtitle2 as="em" className={styles.tagline}>Your friendly neighborhood developer</Subtitle2>}
                />

                {children}

                <CardFooter className={styles.footer}>
                    <Socials />
                    <Switch
                        checked={isDark}
                        onChange={handleDarkModeToggled}
                        label={isDark ? "Dark Mode" : "Light Mode"}
                        className={styles.switch}
                    />

                    <Caption1 as="p" align="end" block className={styles.copyright}>© Victor Frye {new Date().getFullYear()}</Caption1>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile;
