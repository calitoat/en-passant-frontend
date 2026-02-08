import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import EnlistForm from './EnlistForm';
import RookIcon from './icons/RookIcon';

export default function LinearLandingTemplate({
    // Branding
    vertical,
    verticalName,
    icon: Icon,
    accentColor,

    // Hero content
    badge,
    headline,
    headlineAccent,
    subheadline,

    // Pain points
    painPoints = [],
    painPointsTitle = 'The Problem',
    painPointsSubtitle,

    // How it works
    howItWorks = [],
    howItWorksTitle = 'How It Works',
    howItWorksSubtitle,

    // CTA
    ctaTitle,
    ctaSubtitle,
    ctaText = 'GET VERIFIED',
    formSubtitle = 'Join the waitlist for early access'
}) {
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source') || 'organic';
    const [stats, setStats] = useState({ total: 2500, byVertical: {} });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

    const verticalCount = stats.byVertical?.[vertical] || 500;

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-lg">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: accentColor }}
                        >
                            <Icon className="w-6 h-6 text-dark-bg" />
                        </div>
                        <span className="text-xl font-semibold text-white">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <a
                            href="#waitlist"
                            className="px-4 py-2 rounded-lg font-medium text-dark-bg transition-colors"
                            style={{ backgroundColor: accentColor }}
                        >
                            Join Waitlist
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-4 md:px-6 overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 grid-pattern" />

                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30"
                        style={{
                            background: `radial-gradient(ellipse at center, ${accentColor}20 0%, transparent 70%)`
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
                        style={{
                            backgroundColor: `${accentColor}10`,
                            borderColor: `${accentColor}30`
                        }}
                    >
                        <Icon className="w-4 h-4" style={{ color: accentColor }} />
                        <span className="text-sm font-medium" style={{ color: accentColor }}>
                            {badge}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight"
                    >
                        {headline}{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
                            }}
                        >
                            {headlineAccent}
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        {subheadline}
                    </motion.p>

                    {/* Enlist Form */}
                    <motion.div
                        id="waitlist"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-lg mx-auto scroll-mt-24"
                    >
                        <EnlistForm
                            vertical={vertical}
                            source={source}
                            ctaText={ctaText}
                            subtitle={formSubtitle}
                            theme="dark"
                            showPreVerification={false}
                            accentColor={accentColor}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Pain Points Section */}
            <section className="py-24 px-4 md:px-6 bg-dark-surface relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-50" />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span
                            className="text-sm font-medium uppercase tracking-wider mb-4 block"
                            style={{ color: accentColor }}
                        >
                            {painPointsTitle}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {painPointsSubtitle}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {painPoints.map((point, index) => (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="premium-card-hover p-6"
                            >
                                <div className="text-4xl mb-4">{point.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {point.title}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed">
                                    {point.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-4 md:px-6 bg-dark-bg relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 70%)`
                    }}
                />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span
                            className="text-sm font-medium uppercase tracking-wider mb-4 block"
                            style={{ color: accentColor }}
                        >
                            {howItWorksTitle}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {howItWorksSubtitle}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connection line */}
                        <div
                            className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px"
                            style={{
                                background: `linear-gradient(to right, transparent, ${accentColor}30, transparent)`
                            }}
                        />

                        {howItWorks.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="text-center relative"
                            >
                                <div className="relative inline-flex mb-6">
                                    <div className="w-24 h-24 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center relative z-10">
                                        <span className="text-3xl">{step.icon}</span>
                                    </div>
                                    <span
                                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-dark-bg text-sm font-bold flex items-center justify-center z-20"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {index + 1}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 px-4 md:px-6 bg-dark-surface relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border"
                            style={{
                                backgroundColor: `${accentColor}10`,
                                borderColor: `${accentColor}20`
                            }}
                        >
                            <Icon className="w-8 h-8" style={{ color: accentColor }} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {ctaTitle || `Join ${verticalCount.toLocaleString()} Verified Users`}
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8">
                            {ctaSubtitle || 'Get verified and access trusted platforms.'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <EnlistForm
                            vertical={vertical}
                            source={`${source}-footer`}
                            ctaText="RESERVE MY SPOT"
                            subtitle="Launch day priority access"
                            theme="dark"
                            showPreVerification={false}
                            accentColor={accentColor}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 md:px-6 bg-dark-bg border-t border-dark-border">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: accentColor }}
                        >
                            <RookIcon className="w-5 h-5 text-dark-bg" />
                        </div>
                        <span className="font-semibold text-white">En Passant {verticalName}</span>
                    </Link>
                    <div className="flex items-center gap-6 text-sm text-zinc-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/" className="hover:text-white transition-colors">En Passant Home</Link>
                    </div>
                    <p className="text-zinc-600 text-sm">© 2026 En Passant</p>
                </div>
            </footer>
        </div>
    );
}
