import { Card, CardHeader, Link, Text, makeStyles, tokens } from "@fluentui/react-components";
import { Person32Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        // ...shorthands.margin(tokens.spacingVerticalL, tokens.spacingHorizontalNone, tokens.spacingVerticalM, tokens.spacingHorizontalNone),
    },
    header: {
        fontSize: tokens.fontSizeBase600,
        color: tokens.colorBrandForeground2,
        // ...shorthands.margin(tokens.spacingVerticalNone, tokens.spacingHorizontalNone, tokens.spacingVerticalXL, tokens.spacingHorizontalNone),
    },
    bold: {
        fontWeight: 'bold',
    }
});

export default function About() {
    const styles = useStyles();
    const _today: Date = new Date();
    const _start: Date = new Date(2019, 5, 6);

    const getYearsOfExperience = (): number => {
        if (_today.getMonth() < _start.getMonth() || (_today.getMonth() === _start.getMonth() && _today.getDay() < _start.getDay())) {
            return _today.getFullYear() - _start.getFullYear() - 1;
        }

        return _today.getFullYear() - _start.getFullYear();
    }

    return (
        <Card id="about" appearance="subtle" className={styles.container}>
            <CardHeader className={styles.header}
                image={<Person32Regular />}
                header={<Text as="h2" className={styles.header}>About</Text>}
            />

            <Text as="p">
                Hello from Grand Rapids! <Text weight="bold">I&#x27;m Victor, a software engineer powered by coffee</Text>.
                With {`${getYearsOfExperience()}`} years of experience in the industry, I&#x27;ve worked with a variety of technologies and platforms.
                My current focuses are on web development with <Text weight="bold">React.js</Text>, the <Text weight="bold">.NET</Text> ecosystem, <Text weight="bold">Azure</Text> cloud services, and <Text weight="bold">DevOps</Text> automation and processes.
            </Text>
            <Text as="p">
                I&#x27;m passionate about <Text weight="bold">digital transformation</Text>, the <Text weight="bold">developer experience</Text>, and constructing solutions that help people <Text weight="bold">achieve more</Text>.
            </Text>
            <Text as="p">
                I&#x27;m currently working as a <Text weight="bold">Senior Software Engineer at <Link as="a" inline href="https://leadingedje.com" target="_blank" rel="noreferrer noopener" className={styles.bold}>Leading EDJE</Link></Text>, a software consultancy based in Columbus, Ohio.
                In my downtime, I enjoy <Text weight="bold">gaming</Text>, <Text weight="bold">reading</Text>, and quality time with <Text weight="bold">my wife and our two dogs</Text>.
            </Text>
        </Card>
    )
}
