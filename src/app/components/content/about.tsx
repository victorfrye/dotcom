import { Link } from "@fluentui/react-components";

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
        <section id="about" className="d-flex flex-column flex-wrap text-primary pt-3 pb-2">
            <h2 className="text-primary pt-3 pb-2">_About</h2>
                
                <p>
                    Hello from Grand Rapids! <b>I&#x27;m Victor, a software engineer powered by coffee</b>.
                    With {`${getYearsOfExperience()}`} years of experience in the industry, I&#x27;ve worked with a variety of technologies and platforms.
                    My current focuses are on web development with <strong>React.js</strong>, the <strong>.NET</strong> ecosystem, <strong>Azure</strong> cloud services, and <strong>DevOps</strong> automation and processes.
                </p>
                <p>
                    I&#x27;m passionate about <strong>digital transformation</strong>, the <strong>developer experience</strong>, and constructing solutions that help people <strong>achieve more</strong>.
                </p>
                <p>
                    I&#x27;m currently working as a <strong>Senior Software Engineer at <Link href="https://leadingedje.com" target="_blank" rel="noreferrer"><strong>Leading EDJE</strong></Link></strong>, a software consultancy based in Columbus, Ohio.
                    In my downtime, I enjoy <b>gaming</b>, <b>reading</b>, and quality time with <b>my wife and our two dogs</b>.
                </p>
        </section>
    )
}
