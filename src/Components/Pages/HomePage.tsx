import AboutSection from "../Content/AboutSection";
import BannerSection from "../Content/BannerSection";
import ConnectSection from "../Content/ConnectSection";
import 'bootstrap/dist/css/bootstrap.min.css'

const HomePage = (): JSX.Element => {
    return (
        <main>
            <BannerSection />
            <AboutSection />
            <ConnectSection />
        </main>
    );
};

export default HomePage;