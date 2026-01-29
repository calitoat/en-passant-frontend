import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowRight, Check, Home, Users, Ban } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import BotDefenseSignal from '../components/BotDefenseSignal';
import EnlistForm from '../components/EnlistForm';

export default function ApartmentsLanding() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: { apartments: 625 } });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

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
            title: "Connect Your Accounts",
            description: "Link Gmail, LinkedIn, and optionally your .edu email to build trust."
        },
        {
            title: "Deploy Your Rank Guard",
            description: "Receive a cryptographic Rank Guard that proves you're a real human with a verifiable identity."
        },
        {
            title: "Landlords See You First",
            description: "Your verified Rank Guard displays on Zillow, Craigslist, and rental platforms."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-200 bg-white/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-emerald-900">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block text-emerald-700 hover:text-emerald-900 font-medium">
                            Sign In
                        </Link>
                        <Link to="/register?source=apartments" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
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
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-full mb-6"
                    >
                        <Home className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-700">THE RENTAL FORTRESS</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-emerald-950 mb-6"
                    >
                        Verified Renters{' '}
                        <span className="text-emerald-600">Only</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-emerald-800 mb-10 max-w-2xl mx-auto"
                    >
                        Stand out to landlords drowning in bot-generated applications.
                        <span className="font-bold"> Prove you're real. Get the apartment.</span>
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
                            vertical="apartments"
                            source={source}
                            ctaText="GET VERIFIED FOR RENTALS"
                            subtitle="Landlords see you're a real human. Stand out from bot spam."
                            theme="dark"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 px-4 md:px-6 bg-emerald-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        Why Landlords Ignore You
                    </h2>
                    <p className="text-emerald-200 text-center mb-12 text-lg">The rental market is broken</p>

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
                                <p className="text-emerald-100">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-emerald-900 to-emerald-950">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        How En Passant Works
                    </h2>
                    <p className="text-emerald-200 text-center mb-12 text-lg">Three steps to verified renter status</p>

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
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-emerald-200">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-6 bg-emerald-950">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-5xl mb-6">🏡</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join {stats.byVertical?.apartments?.toLocaleString() || '625'} Apartment Hunters
                    </h2>
                    <p className="text-xl text-emerald-200 mb-8">
                        Ready to skip the bot spam and get noticed by landlords
                    </p>
                    <EnlistForm
                        vertical="apartments"
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
                        Powered by <Link to="/" className="text-emerald-400 hover:text-emerald-300 font-semibold">En Passant</Link>
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
