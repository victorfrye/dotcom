
import '../../styles/App.css';

const AboutSection = (): JSX.Element => {
    const today: Date = new Date();
    const start: Date = new Date(2019, 5, 6);
    const wedding: Date = new Date(2024, 1, 6);

    const MARRIED: string = "wife";
    const ENGAGED: string = "fiancée";

    const getYearsOfExperience = (): number => {
        if (today.getMonth < start.getMonth || (today.getMonth === start.getMonth && today.getDate < start.getDate)) {
            return today.getFullYear() - start.getFullYear() - 1;
        }

        return today.getFullYear() - start.getFullYear();
    };

    const getRelationshipStatus = (): string => {
        return today > wedding ? MARRIED : ENGAGED;
    };

    return (
        <section id="about">
            <div className="d-flex flex-wrap text-light">
                <h5 className="text-primary pt-3 pb-2">_About</h5>

                <p>
                    Hello from Grand Rapids! <strong>I'm Victor, a software engineer powered by coffee</strong>.
                    With {getYearsOfExperience()} years of professional experience, I've worked with a variety of technologies and platforms.
                    My current focuses are the <strong>.NET</strong> ecosystem, <strong>Azure</strong> cloud services, and <strong>DevOps</strong> automation.
                </p>
                <p>
                    I'm passionate about <strong>digital transformation</strong>, the <strong>developer experience</strong>,
                    and constructing solutions that help people <strong>achieve more</strong>.
                </p>
                <p>
                    I'm currently working as a <strong>Senior Solutions Developer at <a href="https://leadingedje.com/">Leading EDJE</a></strong>,
                    a software consultancy based in Columbus, Ohio.
                    In my downtime, I enjoy <strong>gaming</strong>, <strong>reading</strong>, and quality time with <strong>my {getRelationshipStatus()} and our two dogs</strong>.
                </p>
            </div>
        </section>
    )
};

export default AboutSection;