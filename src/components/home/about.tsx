import { Body1, Body1Strong, Body1Stronger, Card, CardHeader, Link, Text, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Person32Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    header: {
        fontSize: tokens.fontSizeBase600,
        color: tokens.colorBrandForeground2,
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
        // <Card id="about" appearance="subtle" className={styles.container}>
        //     <CardHeader className={styles.header}
        //         image={<Person32Regular />}
        //         header={<Text as="h2" className={styles.header}>About</Text>}
        //     />

        <Card appearance='subtle' className={styles.container}>
            <Body1 as="p">
                Hello from Grand Rapids! <Body1Stronger>I&#x27;m Victor, a software engineer powered by coffee</Body1Stronger>.
                With {`${getYearsOfExperience()}`} years of experience in the industry, I&#x27;ve worked with a variety of technologies and platforms.
                My current focuses are on web development with <Body1Stronger>React.js</Body1Stronger>, the <Body1Stronger>.NET</Body1Stronger> ecosystem, <Body1Stronger>Azure</Body1Stronger> cloud services, and <Body1Stronger>DevOps</Body1Stronger> automation and processes.
            </Body1>
            <Body1 as="p">
                I&#x27;m passionate about <Body1Stronger>digital transformation</Body1Stronger>, the <Body1Stronger>developer experience</Body1Stronger>, and constructing solutions that help people <Body1Stronger>achieve more</Body1Stronger>.
            </Body1>
            <Body1 as="p">
                I&#x27;m currently working as a <Body1Stronger>Senior Software Engineer at <Link as="a" inline href="https://leadingedje.com" target="_blank" rel="noreferrer noopener" className={styles.bold}>Leading EDJE</Link></Body1Stronger>, a software consultancy based in Columbus, Ohio.
                In my downtime, I enjoy <Body1Stronger>gaming</Body1Stronger>, <Body1Stronger>reading</Body1Stronger>, and quality time with <Body1Stronger>my wife and our two dogs</Body1Stronger>.
            </Body1>
        </Card>
        // </Card>
    )
}
