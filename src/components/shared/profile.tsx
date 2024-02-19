'use client';

import { Avatar, Card, CardFooter, CardHeader, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import Socials from "./socials";

const useStyles = makeStyles({
    frame: {
        display: "flex",
        minHeight: "calc(100vh - (var(--spacingVerticalXXXL) * 2))",
        '@media screen and (max-width: 576px)': {
            minHeight: "100vh",
            ...shorthands.padding(tokens.spacingVerticalNone),
        },
        ...shorthands.padding(tokens.spacingVerticalXXXL),
    },
    profileCard: {
        display: "flex",
        flexDirection: "column",
        boxShadow: tokens.shadow64,
        ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    },
    header: {
        alignItems: 'center',
        ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXXL, tokens.spacingVerticalNone),
    },
    name: {
        fontSize: tokens.fontSizeHero800,
        lineHeight: tokens.lineHeightHero800,
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
    copyright: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        '@media screen and (max-width: 576px)': {
            marginRight: 'auto',
            ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL, tokens.spacingVerticalNone),

        },
        flexWrap: 'wrap',
        ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalL),
    }
});

const Profile = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const styles = useStyles();

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
                    header={<Text as="h1" weight="bold" wrap={false} className={styles.name}>Victor Frye</Text>}
                    description={<Text as="em" className={styles.tagline}>Your friendly neighborhood developer</Text>}
                />

                {children}

                <CardFooter className={styles.footer}>
                    <Socials />
                    <Text as="p" align="end" block className={styles.copyright}>© Victor Frye {new Date().getFullYear()}</Text>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile;
