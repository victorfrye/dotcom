import threadsIcon from '../../assets/threads.svg';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';
import envelopeIcon from '../../assets/envelope.svg';

const ConnectSection = (): JSX.Element => {
    return (
        <section id="connect">
            <div className="d-flex flex-column flex-wrap">
                <h5 className="text-primary pt-3 pb-2">_Connect</h5>

                <div className="d-flex flex-row">
                    <a href="https://threads.net/@@thevictorfryeadventure" target="_blank" className="btn-link">
                        <img src={threadsIcon} alt="Threads" className="social-icon m-1" />
                    </a>
                    <a href="https://linkedin.com/in/victorfrye" target="_blank" className="btn-link">
                        <img src={linkedinIcon} alt="LinkedIn" className="social-icon m-1" />
                    </a>
                    <a href="https://github.com/victorfrye" target="_blank" className="btn-link">
                        <img src={githubIcon} alt="GitHub" className="social-icon m-1" />
                    </a>
                    <a href="mailto:victorfrye@outlook.com" target="_blank" className="btn-link">
                        <img src={envelopeIcon} alt="Email Me" className="social-icon m-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ConnectSection;