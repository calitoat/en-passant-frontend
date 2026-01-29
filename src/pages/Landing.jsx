import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import Footer from '../components/Landing/Footer';

export default function Landing() {
    return (
        <div className="min-h-screen">
            <Hero />
            <Features />
            <Footer />
        </div>
    );
}
