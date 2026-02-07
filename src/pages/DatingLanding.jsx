import { Heart } from 'lucide-react';
import LinearLandingTemplate from '../components/LinearLandingTemplate';

const painPoints = [
    {
        icon: "🎣",
        title: "Catfish Everywhere",
        description: "Fake profiles using stolen photos waste your time, emotions, and sometimes money."
    },
    {
        icon: "🤖",
        title: "Bot Matches",
        description: "Half your matches are bots promoting scams, OnlyFans, or phishing links."
    },
    {
        icon: "💔",
        title: "Trust Issues",
        description: "You can't trust anyone is who they say they are. Everyone is skeptical of everyone."
    }
];

const howItWorks = [
    {
        icon: "🔗",
        title: "Verify Your Real Identity",
        description: "Connect your Gmail and LinkedIn to prove you're a real person with a history."
    },
    {
        icon: "🛡️",
        title: "Deploy Your Rank Guard",
        description: "Receive a cryptographic Rank Guard that proves you're not a catfish or bot."
    },
    {
        icon: "💕",
        title: "Match with Real Humans",
        description: "Display your Rank Guard on Tinder, Hinge, Bumble. Filter for verified users only."
    }
];

export default function DatingLanding() {
    return (
        <LinearLandingTemplate
            vertical="dating"
            verticalName="Dating"
            icon={Heart}
            accentColor="#FDA4AF"

            badge="THE VERIFIED HEART"
            headline="Verified"
            headlineAccent="Hearts"
            subheadline="Date real people, not bots or catfish. Every profile backed by cryptographic proof."

            painPoints={painPoints}
            painPointsTitle="The Problem"
            painPointsSubtitle="The Dating App Problem"

            howItWorks={howItWorks}
            howItWorksTitle="How It Works"
            howItWorksSubtitle="Three Steps to Verified Dating Profile"

            ctaText="GET VERIFIED FOR DATING"
            formSubtitle="Show you're a real human. Match with verified people only."
            ctaSubtitle="Ready for catfish-free dating"
        />
    );
}
