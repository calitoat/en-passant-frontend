import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import RookIcon from '../icons/RookIcon';
import EnlistForm from '../EnlistForm';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 grid-pattern" />

            {/* Ambient amber glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.15) 0%, transparent 70%)'
                    }}
                />
            </div>

            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8"
                >
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-amber-400 font-medium">Human Verification Protocol</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
                >
                    Prove You're{' '}
                    <span className="gradient-text-amber">Real</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    The internet is flooded with bots, scammers, and AI imposters.
                    En Passant verifies you're human so platforms can trust you.
                </motion.p>

                {/* Waitlist Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-md mx-auto"
                >
                    <EnlistForm
                        vertical="general"
                        source="homepage"
                        ctaText="JOIN THE WAITLIST"
                        subtitle="Be first to get verified when we launch"
                        theme="dark"
                        showPreVerification={false}
                        accentColor="#D4A853"
                    />
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-500"
                >
                    <div className="flex items-center gap-2">
                        <RookIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">Human Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">Ed25519 Signed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">Agent Authorization</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />
        </section>
    );
}
