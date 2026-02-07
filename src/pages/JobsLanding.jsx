import { Briefcase } from 'lucide-react';
import LinearLandingTemplate from '../components/LinearLandingTemplate';

const painPoints = [
    {
        icon: "📧",
        title: "Application Black Hole",
        description: "Recruiters receive 1,000+ applications per job. 70% are AI-generated or mass-applied."
    },
    {
        icon: "🚫",
        title: "Auto-Rejected",
        description: "ATS systems flag anything automated—even real humans get caught in the filter."
    },
    {
        icon: "💼",
        title: "No Response",
        description: "Unverified applicants get ignored. Recruiters only respond to verified humans."
    }
];

const howItWorks = [
    {
        icon: "🔗",
        title: "Verify Your Professional Identity",
        description: "Connect Gmail, LinkedIn, and .edu email to prove your professional history."
    },
    {
        icon: "🛡️",
        title: "Deploy Your Rank Guard",
        description: "Receive a cryptographic Rank Guard that proves you're a real human professional."
    },
    {
        icon: "🎯",
        title: "Recruiters Notice You",
        description: "Your verified Rank Guard displays on LinkedIn, job boards, and applications."
    }
];

export default function JobsLanding() {
    return (
        <LinearLandingTemplate
            vertical="jobs"
            verticalName="Jobs"
            icon={Briefcase}
            accentColor="#A5B4FC"

            badge="HUMAN TALENT BOARD"
            headline="Human Applicants"
            headlineAccent="Only"
            subheadline="Recruiters are drowning in AI-generated applications. Prove there's a real person behind yours."

            painPoints={painPoints}
            painPointsTitle="The Problem"
            painPointsSubtitle="Why Recruiters Ignore You"

            howItWorks={howItWorks}
            howItWorksTitle="How It Works"
            howItWorksSubtitle="Three Steps to Verified Professional Status"

            ctaText="GET VERIFIED FOR JOBS"
            formSubtitle="Recruiters see you're a real professional. Stand out from AI spam."
            ctaSubtitle="Ready to stand out from AI resume spam"
        />
    );
}
