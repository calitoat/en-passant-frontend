import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowRight, Heart, Users, Ban } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import BotDefenseSignal from '../components/BotDefenseSignal';
import EnlistForm from '../components/EnlistForm';

export default function DatingLanding() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: { dating: 250 } });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

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
            title: "Verify Your Real Identity",
            description: "Connect your Gmail and LinkedIn to prove you're a real person with a history."
        },
        {
            title: "Deploy Your Rank Guard",
            description: "Receive a cryptographic Rank Guard that proves you're not a catfish or bot."
        },
        {
            title: "Match with Real Humans",
            description: "Display your Rank Guard on Tinder, Hinge, Bumble. Filter for verified users only."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-100 to-rose-600">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-pink-200 bg-white/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-rose-900">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block text-rose-600 hover:text-rose-800 font-medium">
                            Sign In
                        </Link>
                        <Link to="/register?source=dating" className="px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors">
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
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 border border-rose-300 rounded-full mb-6"
                    >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span className="text-sm font-semibold text-rose-700">THE VERIFIED HEART</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-rose-950 mb-6"
                    >
                        Verified{' '}
                        <span className="text-rose-500">Hearts</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-rose-800 mb-10 max-w-2xl mx-auto"
                    >
                        Date real people, not bots or catfish.
                        <span className="font-bold"> Every profile backed by cryptographic proof.</span>
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
                            vertical="dating"
                            source={source}
                            ctaText="GET VERIFIED FOR DATING"
                            subtitle="Show you're a real human. Match with verified people only."
                            theme="dark"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 px-4 md:px-6 bg-rose-600">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        The Dating App Problem
                    </h2>
                    <p className="text-rose-100 text-center mb-12 text-lg">Dating is broken. Here's why:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/20 backdrop-blur rounded-3xl p-6 border-2 border-white/30"
                            >
                                <div className="text-5xl mb-4">{point.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                                <p className="text-rose-50">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-rose-600 to-rose-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        How En Passant Works
                    </h2>
                    <p className="text-rose-100 text-center mb-12 text-lg">Three steps to verified dating profile</p>

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
                                <div className="w-16 h-16 bg-white text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-rose-100">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-6 bg-rose-900">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-5xl mb-6">💕</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join {stats.byVertical?.dating?.toLocaleString() || '250'} Verified Singles
                    </h2>
                    <p className="text-xl text-rose-200 mb-8">
                        Ready for catfish-free dating
                    </p>
                    <EnlistForm
                        vertical="dating"
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
                        Powered by <Link to="/" className="text-rose-400 hover:text-rose-300 font-semibold">En Passant</Link>
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
