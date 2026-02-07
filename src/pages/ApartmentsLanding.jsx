import { Home } from 'lucide-react';
import LinearLandingTemplate from '../components/LinearLandingTemplate';

const painPoints = [
    {
        icon: "📧",
        title: "Application Spam",
        description: "Landlords receive 100+ applications per listing. 80% are AI-generated fake profiles."
    },
    {
        icon: "⏱️",
        title: "Lost Before You Apply",
        description: "By the time you submit, the apartment is already rented to someone verified."
    },
    {
        icon: "🔒",
        title: "No Trust Signal",
        description: "Landlords can't tell real applicants from scammers, so they ignore everyone equally."
    }
];

const howItWorks = [
    {
        icon: "🔗",
        title: "Connect Your Accounts",
        description: "Link Gmail, LinkedIn, and optionally your .edu email to build trust."
    },
    {
        icon: "🛡️",
        title: "Deploy Your Rank Guard",
        description: "Receive a cryptographic Rank Guard that proves you're a real human with a verifiable identity."
    },
    {
        icon: "🏡",
        title: "Landlords See You First",
        description: "Your verified Rank Guard displays on Zillow, Craigslist, and rental platforms."
    }
];

export default function ApartmentsLanding() {
    return (
        <LinearLandingTemplate
            vertical="apartments"
            verticalName="Apartments"
            icon={Home}
            accentColor="#6EE7B7"

            badge="THE RENTAL FORTRESS"
            headline="Verified Renters"
            headlineAccent="Only"
            subheadline="Stand out to landlords drowning in bot-generated applications. Prove you're real. Get the apartment."

            painPoints={painPoints}
            painPointsTitle="The Problem"
            painPointsSubtitle="Why Landlords Ignore You"

            howItWorks={howItWorks}
            howItWorksTitle="How It Works"
            howItWorksSubtitle="Three Steps to Verified Renter Status"

            ctaText="GET VERIFIED FOR RENTALS"
            formSubtitle="Landlords see you're a real human. Stand out from bot spam."
            ctaSubtitle="Ready to skip the bot spam and get noticed by landlords"
        />
    );
}
