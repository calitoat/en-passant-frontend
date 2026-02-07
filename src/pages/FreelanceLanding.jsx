import { Award } from 'lucide-react';
import LinearLandingTemplate from '../components/LinearLandingTemplate';

const painPoints = [
    {
        icon: "⚠️",
        title: "Scammer Reputation",
        description: "Clients are wary of freelancers due to rampant fake profiles and AI-generated portfolios."
    },
    {
        icon: "💰",
        title: "Race to the Bottom",
        description: "Unverified freelancers undercut each other because trust is missing from the equation."
    },
    {
        icon: "🔍",
        title: "Lost Bids",
        description: "Verified freelancers win bids over you, even with the same skills. Trust is the tiebreaker."
    }
];

const howItWorks = [
    {
        icon: "🔗",
        title: "Link Your Accounts",
        description: "Connect Gmail, LinkedIn, and optionally your .edu email for maximum credibility."
    },
    {
        icon: "🛡️",
        title: "Deploy Your Rank Guard",
        description: "Add En Passant verification to your Upwork, Fiverr, or freelance profiles."
    },
    {
        icon: "🏆",
        title: "Charge What You're Worth",
        description: "Verified Rank Guard = higher trust = better rates. Stop competing on price alone."
    }
];

export default function FreelanceLanding() {
    return (
        <LinearLandingTemplate
            vertical="freelance"
            verticalName="Freelance"
            icon={Award}
            accentColor="#FDBA74"

            badge="FREELANCER FORTRESS"
            headline="Verified"
            headlineAccent="Professionals"
            subheadline="Clients can't tell real freelancers from fake profiles. Prove you're legitimate. Win more bids."

            painPoints={painPoints}
            painPointsTitle="The Problem"
            painPointsSubtitle="Why Clients Skip Your Profile"

            howItWorks={howItWorks}
            howItWorksTitle="How It Works"
            howItWorksSubtitle="Three Steps to Verified Professional Status"

            ctaText="GET VERIFIED AS A FREELANCER"
            formSubtitle="Clients see you're a real professional. Win more bids."
            ctaSubtitle="Ready to stand out from fake profiles and win more bids"
        />
    );
}
