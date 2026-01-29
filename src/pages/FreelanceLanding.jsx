import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowRight, Briefcase, Users, Ban, Award } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import BotDefenseSignal from '../components/BotDefenseSignal';
import EnlistForm from '../components/EnlistForm';

export default function FreelanceLanding() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: { freelance: 500 } });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

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
            title: "Link Your Accounts",
            description: "Connect Gmail, LinkedIn, and optionally your .edu email for maximum credibility."
        },
        {
            title: "Deploy Your Rank Guard",
            description: "Add En Passant verification to your Upwork, Fiverr, or freelance profiles."
        },
        {
            title: "Charge What You're Worth",
            description: "Verified Rank Guard = higher trust = better rates. Stop competing on price alone."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-100 to-orange-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-amber-200 bg-white/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-orange-900">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block text-orange-700 hover:text-orange-900 font-medium">
                            Sign In
                        </Link>
                        <Link to="/register?source=freelance" className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                            Get Verified
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-28 pb-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border border-orange-300 rounded-full mb-6"
                    >
                        <Award className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-semibold text-orange-700">FREELANCER FORTRESS</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-orange-950 mb-6"
                    >
                        Verified{' '}
                        <span className="text-orange-600">Professionals</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-orange-800 mb-10 max-w-2xl mx-auto"
                    >
                        Clients can't tell real freelancers from fake profiles.
                        <span className="font-bold"> Prove you're legitimate. Win more bids.</span>
                    </motion.p>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 max-w-3xl mx-auto"
                    >
                        <CountdownTimer targetDate="2026-02-08T19:00:00-08:00" theme="dark" size="large" />
                    </motion.div>

                    {/* Bot Defense */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8 max-w-3xl mx-auto"
                    >
                        <BotDefenseSignal initialVerifiedHumans={stats.total} initialBotsBlocked={stats.total * 8} realtime={true} />
                    </motion.div>

                    {/* Enlist Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-lg mx-auto"
                    >
                        <EnlistForm
                            vertical="freelance"
                            source={source}
                            ctaText="GET VERIFIED AS A FREELANCER"
                            subtitle="Clients see you're a real professional. Win more bids."
                            theme="dark"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 px-4 md:px-6 bg-orange-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        Why Clients Skip Your Profile
                    </h2>
                    <p className="text-orange-200 text-center mb-12 text-lg">The freelance market is flooded with fakes</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                            >
                                <div className="text-5xl mb-4">{point.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                                <p className="text-orange-100">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-orange-900 to-orange-950">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        How En Passant Works
                    </h2>
                    <p className="text-orange-200 text-center mb-12 text-lg">Three steps to verified professional status</p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {howItWorks.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-orange-200">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-6 bg-orange-950">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-5xl mb-6">🏆</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join {stats.byVertical?.freelance?.toLocaleString() || '500'} Verified Freelancers
                    </h2>
                    <p className="text-xl text-orange-200 mb-8">
                        Ready to stand out from fake profiles and win more bids
                    </p>
                    <EnlistForm
                        vertical="freelance"
                        source={`${source}-footer`}
                        ctaText="RESERVE MY VERIFICATION"
                        subtitle="Launch day priority access"
                        theme="dark"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 md:px-6 bg-black text-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-gray-400 text-sm">
                        Powered by <Link to="/" className="text-orange-400 hover:text-orange-300 font-semibold">En Passant</Link>
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <Link to="/privacy" className="hover:text-white">Privacy</Link>
                        <Link to="/terms" className="hover:text-white">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
