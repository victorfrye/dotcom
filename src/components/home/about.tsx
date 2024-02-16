import { Link, Text } from "@fluentui/react-components";

export default function About() {
    const _today: Date = new Date();
    const _start: Date = new Date(2019, 5, 6);

    const getYearsOfExperience = (): number => {
        if (_today.getMonth() < _start.getMonth() || (_today.getMonth() === _start.getMonth() && _today.getDay() < _start.getDay())) {
            return _today.getFullYear() - _start.getFullYear() - 1;
        }

        return _today.getFullYear() - _start.getFullYear();
    }

    return (
        <section id="about" className="d-flex flex-column flex-wrap">
            <Text as="h2" className="text-primary pt-4 pb-3">_About</Text>

            <Text as="p">
                Hello from Grand Rapids! <Text weight="bold">I&#x27;m Victor, a software engineer powered by coffee</Text>.
                With {`${getYearsOfExperience()}`} years of experience in the industry, I&#x27;ve worked with a variety of technologies and platforms.
                My current focuses are on web development with <Text weight="bold">React.js</Text>, the <Text weight="bold">.NET</Text> ecosystem, <Text weight="bold">Azure</Text> cloud services, and <Text weight="bold">DevOps</Text> automation and processes.
            </Text>
            <Text as="p">
                I&#x27;m passionate about <Text weight="bold">digital transformation</Text>, the <Text weight="bold">developer experience</Text>, and constructing solutions that help people <Text weight="bold">achieve more</Text>.
            </Text>
            <Text as="p">
                I&#x27;m currently working as a <Text weight="bold">Senior Software Engineer</Text> at <Link as="a" inline href="https://leadingedje.com" target="_blank" rel="noreferrer noopener">Leading EDJE</Link>, a software consultancy based in Columbus, Ohio.
                In my downtime, I enjoy <Text weight="bold">gaming</Text>, <Text weight="bold">reading</Text>, and quality time with <Text weight="bold">my wife and our two dogs</Text>.
            </Text>
        </section>
    )
}
