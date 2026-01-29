import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui';
import Footer from './Landing/Footer';

export default function LandingTemplate({
    vertical,
    heroTitle,
    heroHighlight,
    heroSubtitle,
    painPoints,
    howItWorks,
    pricing,
    ctaText = "Get Verified Now"
}) {
    const navigate = useNavigate();

    const handleCTA = () => {
        navigate(`/register?source=${vertical}`);
    };

    return (
        <div className="min-h-screen bg-[#0A0D14]">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-surface-500/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-white">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </Link>
                        <Button size="sm" onClick={handleCTA}>
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-500 via-surface-500 to-navy-500" />
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-8"
                    >
                        <Shield className="w-4 h-4 text-primary-400" />
                        <span className="text-sm text-primary-300">Verify you're human in 30 seconds</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        {heroTitle}{' '}
                        <span className="gradient-text">{heroHighlight}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
                    >
                        {heroSubtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Button size="lg" className="group" onClick={handleCTA}>
                            {ctaText}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                    >
                        The Problem
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-center mb-12 max-w-2xl mx-auto"
                    >
                        AI spam is ruining the experience for everyone
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="card hover:border-white/20 transition-colors"
                            >
                                <div className="text-4xl mb-4">{point.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
                                <p className="text-slate-400">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-surface-600/30">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-center mb-12 max-w-2xl mx-auto"
                    >
                        Get verified in under a minute
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
                                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-slate-400">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                    >
                        Simple Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-center mb-12 max-w-2xl mx-auto"
                    >
                        Start free, upgrade when you need more
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-md mx-auto"
                    >
                        <div className="card border-primary-500/50 hover:border-primary-500 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-white">{pricing.name}</h3>
                                {pricing.badge && (
                                    <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium">
                                        {pricing.badge}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-white">{pricing.price}</span>
                                {pricing.period && (
                                    <span className="text-slate-400">/{pricing.period}</span>
                                )}
                            </div>
                            <ul className="space-y-3 mb-8">
                                {pricing.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" size="lg" onClick={handleCTA}>
                                {ctaText}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-gradient-to-b from-surface-600/30 to-transparent">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                    >
                        Ready to Stand Out?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 mb-8"
                    >
                        Join thousands of verified humans who are getting ahead
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button size="lg" className="group" onClick={handleCTA}>
                            Get Verified Now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
