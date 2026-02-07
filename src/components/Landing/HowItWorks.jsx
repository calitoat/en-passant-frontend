import { motion } from 'framer-motion';
import { Link2, Shield, Check } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Link2,
        title: 'Connect',
        description: 'Link your Google, LinkedIn, and .edu accounts to build your EP Score.',
    },
    {
        number: '02',
        icon: Shield,
        title: 'Verify',
        description: 'Our system validates your identity and generates a cryptographic Rank Guard.',
    },
    {
        number: '03',
        icon: Check,
        title: 'Access',
        description: 'Use your verification to skip lines and access verified-only platforms.',
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-6 bg-dark-bg relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.1) 0%, transparent 70%)'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4 block">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Three Steps to Verified
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Connect your accounts, get verified, and access the web as a verified human.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connection line */}
                    <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-dark-border via-amber-500/30 to-dark-border" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="text-center relative"
                        >
                            {/* Step number badge */}
                            <div className="relative inline-flex mb-6">
                                <div className="w-24 h-24 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center relative z-10">
                                    <step.icon className="w-10 h-10 text-amber-500" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-dark-bg text-sm font-bold flex items-center justify-center z-20">
                                    {index + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-zinc-500 leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* EP Score breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-4 bg-dark-card border border-dark-border rounded-2xl">
                        <span className="text-zinc-400">EP Score:</span>
                        <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">20</span>
                            <span className="text-zinc-600">base</span>
                        </div>
                        <span className="text-zinc-600">+</span>
                        <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">25</span>
                            <span className="text-zinc-600">Gmail</span>
                        </div>
                        <span className="text-zinc-600">+</span>
                        <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">30</span>
                            <span className="text-zinc-600">LinkedIn</span>
                        </div>
                        <span className="text-zinc-600">+</span>
                        <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">25</span>
                            <span className="text-zinc-600">.edu</span>
                        </div>
                        <span className="text-zinc-600">=</span>
                        <span className="text-green-400 font-bold text-xl">100</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
