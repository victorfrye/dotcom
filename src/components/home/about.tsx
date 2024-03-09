import Job from "@dotcom/types/job";
import { Body2, Subtitle2Stronger, Card, Link, makeStyles, tokens, Subtitle1, shorthands } from "@fluentui/react-components";

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
    },
    sectionTitle: {
        ...shorthands.margin(tokens.spacingVerticalXS, tokens.spacingHorizontalNone, tokens.spacingVerticalSNudge)
    },
});

interface AboutProps {
    currentJob: Job;
}

const About: React.FC<AboutProps> = ({ currentJob }) => {
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
        <Card appearance='subtle' className={styles.container} size="small">
            <Subtitle1 as="h3" className={styles.sectionTitle}>Hello from Grand Rapids!</Subtitle1>
            <Body2 as="p">
                <Subtitle2Stronger>I&#x27;m Victor, a coffee-powered developer</Subtitle2Stronger>.
                With {`${getYearsOfExperience()}`} years of experience in the industry, I&#x27;ve worked with a variety of technologies and platforms.
                My current focuses are on web development with <Subtitle2Stronger>React.js</Subtitle2Stronger>, the <Subtitle2Stronger>.NET</Subtitle2Stronger> ecosystem, <Subtitle2Stronger>Azure</Subtitle2Stronger> cloud services, and <Subtitle2Stronger>DevOps</Subtitle2Stronger> automation and processes.
            </Body2>
            <Body2 as="p">
                I&#x27;m passionate about <Subtitle2Stronger>digital transformation</Subtitle2Stronger>, the <Subtitle2Stronger>developer experience</Subtitle2Stronger>, and constructing solutions that help people <Subtitle2Stronger>achieve more</Subtitle2Stronger>.
            </Body2>
            {currentJob && currentJob.company && <Body2 as="p">
                I&#x27;m currently working as a <Subtitle2Stronger>{currentJob.title} at <Link as="a" inline href={currentJob.company?.url} target="_blank" rel="noreferrer noopener" className={styles.bold}>{currentJob.company?.name}</Link></Subtitle2Stronger>, a {currentJob.company?.description} based in {currentJob.company?.location}.
                In my downtime, I enjoy <Subtitle2Stronger>gaming</Subtitle2Stronger>, <Subtitle2Stronger>reading</Subtitle2Stronger>, and quality time with <Subtitle2Stronger>my wife and our two dogs</Subtitle2Stronger>.
            </Body2>}
        </Card>
    )
}

export default About;

export {
    About,
}
