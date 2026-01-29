import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowRight, Check, Ticket, Users, Ban, Sparkles } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import BotDefenseSignal from '../components/BotDefenseSignal';
import EnlistForm from '../components/EnlistForm';

export default function TicketsLanding() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: { tickets: 875 } });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

    const handleCTA = () => {
        navigate(`/register?source=tickets-${source}`);
    };

    const painPoints = [
        {
            icon: "🤖",
            title: "Scalper Bots",
            description: "Bots snatch tickets in milliseconds, leaving real fans empty-handed and frustrated."
        },
        {
            icon: "💸",
            title: "Insane Markups",
            description: "Resellers flip tickets at 5-10x face value. Real fans can't afford to see their favorite artists."
        },
        {
            icon: "🎭",
            title: "Fake Tickets",
            description: "Scammers sell counterfeit tickets. You show up and get turned away at the door."
        }
    ];

    const howItWorks = [
        {
            title: "Get Verified",
            description: "Connect Gmail + LinkedIn to prove you're a real human, not a scalper bot."
        },
        {
            title: "2 Ticket Limit",
            description: "Each verified user can only list or buy 2 tickets per event. Real fans only."
        },
        {
            title: "Safe Exchange",
            description: "Trade tickets at fair prices with other verified fans. No bots, no scams."
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#89CFF0' }}>
            {/* Pop Art Pattern Overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle, #FF69B4 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-white/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center border-3 border-black"
                            style={{
                                backgroundColor: '#FF69B4',
                                boxShadow: '3px 3px 0px #000'
                            }}
                        >
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-black tracking-tight">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block">
                            <button className="px-4 py-2 font-bold text-black hover:text-pink-500 transition-colors">
                                Sign In
                            </button>
                        </Link>
                        <button
                            onClick={handleCTA}
                            className="px-4 md:px-6 py-2 font-bold text-white border-3 border-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-sm md:text-base"
                            style={{
                                backgroundColor: '#FF69B4',
                                boxShadow: '4px 4px 0px #000'
                            }}
                        >
                            Get Verified
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-6">
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Pop Art Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-6 py-3 mb-8 border-4 border-black bg-yellow-300"
                        style={{ boxShadow: '6px 6px 0px #000' }}
                    >
                        <Sparkles className="w-5 h-5 text-black" />
                        <span className="font-black text-black uppercase tracking-wide">Real Fans Only</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6 leading-tight"
                        style={{
                            textShadow: '4px 4px 0px #FF69B4, 8px 8px 0px #FFD700',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        TICKETS FOR{' '}
                        <span
                            className="relative inline-block px-4 py-1"
                            style={{
                                backgroundColor: '#FF69B4',
                                transform: 'rotate(-2deg)',
                                display: 'inline-block'
                            }}
                        >
                            <span className="text-white">REAL FANS</span>
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-2xl text-black/80 mb-8 max-w-2xl mx-auto font-medium"
                    >
                        No bots. No scalpers. Just verified humans trading tickets at fair prices.
                        <span className="font-black text-pink-500"> 2 ticket limit per event.</span>
                    </motion.p>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-8"
                    >
                        <CountdownTimer
                            targetDate="2026-02-08T19:00:00-08:00"
                            theme="dark"
                            size="large"
                        />
                    </motion.div>

                    {/* Bot Defense Signal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-8"
                    >
                        <BotDefenseSignal
                            initialVerifiedHumans={stats.total}
                            initialBotsBlocked={stats.total * 8}
                            realtime={true}
                        />
                    </motion.div>

                    {/* Enlist Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="max-w-lg mx-auto"
                    >
                        <EnlistForm
                            vertical="tickets"
                            source={source}
                            ctaText="JOIN THE FAN QUEUE"
                            subtitle="Get priority access when we launch Feb 8"
                            theme="dark"
                        />
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-4"
                    >
                        {[
                            { icon: Shield, text: 'Verified Humans' },
                            { icon: Ticket, text: '2 Ticket Limit' },
                            { icon: Ban, text: 'No Scalpers' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 bg-white border-3 border-black"
                                style={{ boxShadow: '3px 3px 0px #000' }}
                            >
                                <item.icon className="w-5 h-5 text-pink-500" />
                                <span className="font-bold text-black text-sm">{item.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-16 md:py-20 px-4 md:px-6 bg-white border-y-4 border-black">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-black text-center mb-4"
                        style={{ textShadow: '3px 3px 0px #89CFF0' }}
                    >
                        THE PROBLEM
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-black/70 text-center mb-12 font-medium"
                    >
                        Ticket buying is broken. Here's why:
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -2 : 2 }}
                                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="p-6 bg-yellow-300 border-4 border-black"
                                style={{ boxShadow: '6px 6px 0px #000' }}
                            >
                                <div className="text-5xl mb-4">{point.icon}</div>
                                <h3 className="text-2xl font-black text-black mb-2">{point.title}</h3>
                                <p className="text-black/80 font-medium">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 md:py-20 px-4 md:px-6" style={{ backgroundColor: '#89CFF0' }}>
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-black text-center mb-4"
                        style={{ textShadow: '3px 3px 0px #FF69B4' }}
                    >
                        HOW IT WORKS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-black/70 text-center mb-12 font-medium"
                    >
                        Three steps to fair ticket trading
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {howItWorks.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="text-center"
                            >
                                <div
                                    className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-4xl font-black text-white border-4 border-black"
                                    style={{
                                        backgroundColor: '#FF69B4',
                                        boxShadow: '5px 5px 0px #000',
                                        borderRadius: '50%'
                                    }}
                                >
                                    {i + 1}
                                </div>
                                <h3 className="text-2xl font-black text-black mb-2">{step.title}</h3>
                                <p className="text-black/80 font-medium">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2 Ticket Limit Callout */}
            <section className="py-12 md:py-16 px-4 md:px-6 bg-pink-500 border-y-4 border-black">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <div
                            className="px-8 py-6 bg-white border-4 border-black inline-block"
                            style={{
                                boxShadow: '8px 8px 0px #000',
                                transform: 'rotate(-1deg)'
                            }}
                        >
                            <div className="flex items-center justify-center gap-4 mb-2">
                                <Ticket className="w-10 h-10 text-pink-500" />
                                <span className="text-6xl font-black text-black">2</span>
                                <Ticket className="w-10 h-10 text-pink-500" />
                            </div>
                            <p className="text-2xl font-black text-black uppercase">Ticket Limit Per Event</p>
                            <p className="text-black/70 font-medium mt-2">
                                One for you, one for a friend. That's it. No hoarding, no scalping.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-20 px-4 md:px-6 bg-black">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-5xl mb-6">⚡</div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Join {stats.byVertical?.tickets?.toLocaleString() || '875'} Real Fans
                    </h2>
                    <p className="text-xl text-white/70 mb-8">
                        Already waiting for the bot-free ticket queue
                    </p>

                    <EnlistForm
                        vertical="tickets"
                        source={`${source}-footer`}
                        ctaText="RESERVE MY SPOT"
                        subtitle="Launch day priority access"
                        theme="dark"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 md:px-6 bg-black border-t-4 border-pink-500">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: '#FF69B4' }}
                        >
                            <Ticket className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-white">En Passant Tickets</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <Link to="/privacy" className="text-white/60 hover:text-pink-400 transition-colors">Privacy</Link>
                        <Link to="/terms" className="text-white/60 hover:text-pink-400 transition-colors">Terms</Link>
                        <Link to="/" className="text-white/60 hover:text-pink-400 transition-colors">En Passant Home</Link>
                    </div>
                    <p className="text-white/40 text-sm">© 2026 En Passant. Real fans only.</p>
                </div>
            </footer>
        </div>
    );
}
