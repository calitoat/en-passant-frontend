import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowRight, Briefcase, Users, Ban } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import BotDefenseSignal from '../components/BotDefenseSignal';
import EnlistForm from '../components/EnlistForm';

export default function JobsLanding() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: { jobs: 625 } });

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
            title: "Verify Your Professional Identity",
            description: "Connect Gmail, LinkedIn, and .edu email to prove your professional history."
        },
        {
            title: "Get Your Pawn Pass",
            description: "Receive a cryptographic Pawn Pass that proves you're a real human professional."
        },
        {
            title: "Recruiters Notice You",
            description: "Your verified Pawn Pass displays on LinkedIn, job boards, and applications."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-200 to-indigo-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block text-slate-600 hover:text-slate-900 font-medium">
                            Sign In
                        </Link>
                        <Link to="/register?source=jobs" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
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
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 border border-indigo-300 rounded-full mb-6"
                    >
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-700">HUMAN TALENT BOARD</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
                    >
                        Real Talent vs.{' '}
                        <span className="text-indigo-600">AI Resume Spam</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto"
                    >
                        Your application gets lost in a flood of AI-generated resumes.
                        <span className="font-bold"> Prove you're a real human. Get the interview.</span>
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
                            vertical="jobs"
                            source={source}
                            ctaText="GET VERIFIED FOR JOBS"
                            subtitle="Recruiters see you're a real professional. Stand out from AI spam."
                            theme="dark"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 px-4 md:px-6 bg-indigo-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        Why Recruiters Ignore You
                    </h2>
                    <p className="text-indigo-200 text-center mb-12 text-lg">The job market is flooded with bots</p>

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
                                <p className="text-indigo-100">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-indigo-900 to-indigo-950">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        How En Passant Works
                    </h2>
                    <p className="text-indigo-200 text-center mb-12 text-lg">Three steps to verified professional status</p>

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
                                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-indigo-200">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 md:px-6 bg-indigo-950">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-5xl mb-6">🎯</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join {stats.byVertical?.jobs?.toLocaleString() || '625'} Job Seekers
                    </h2>
                    <p className="text-xl text-indigo-200 mb-8">
                        Ready to stand out from AI resume spam
                    </p>
                    <EnlistForm
                        vertical="jobs"
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
                        Powered by <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-semibold">En Passant</Link>
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
