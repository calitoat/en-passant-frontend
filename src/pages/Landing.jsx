import Hero from '../components/Landing/Hero';
import ProblemSection from '../components/Landing/ProblemSection';
import HowItWorks from '../components/Landing/HowItWorks';
import VerticalsPreview from '../components/Landing/VerticalsPreview';
import FooterCTA from '../components/Landing/FooterCTA';

export default function Landing() {
    return (
        <div className="min-h-screen bg-dark-bg">
            <Hero />
            <ProblemSection />
            <HowItWorks />
            <VerticalsPreview />
            <FooterCTA />
        </div>
    );
}
