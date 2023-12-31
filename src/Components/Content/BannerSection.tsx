import profileImage from '../../assets/profile.png';
import '../../styles/App.css';

const BannerSection = (): JSX.Element => {
    return (
        <section id="banner" className="d-flex align-items-center">
            <div className="d-flex">
                <img src={profileImage} alt="a profile of Victor Frye" className="bg-gradient-circle" width="64px" height="64px" />
            </div>
            <div className="d-flex flex-column p-3">
                <div className="d-flex align-items-center">
                    <h4 className="text-primary"><strong>[Victor Frye]</strong></h4>
                </div>
                <div className="d-flex align-items-center py-1">
                    <span className="text-light">
                        Your friendly neighborhood technologist
                    </span>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;