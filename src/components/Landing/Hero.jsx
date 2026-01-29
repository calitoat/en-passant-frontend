import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown } from 'lucide-react';
import { Button } from '../ui';

// Chess pawn SVG component
function PawnIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C10.34 2 9 3.34 9 5C9 6.04 9.5 6.94 10.25 7.5C9.5 8.11 9 8.97 9 9.97C9 10.5 9.13 11 9.37 11.44C7.97 12.5 7 14.12 7 16H17C17 14.12 16.03 12.5 14.63 11.44C14.87 11 15 10.5 15 9.97C15 8.97 14.5 8.11 13.75 7.5C14.5 6.94 15 6.04 15 5C15 3.34 13.66 2 12 2ZM6 18V19H18V18H6ZM5 20V22H19V20H5Z"/>
        </svg>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Chess board pattern background */}
            <div className="absolute inset-0 bg-chess-black">
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #d4af37 1px, transparent 1px),
                            linear-gradient(to bottom, #d4af37 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Floating golden orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/40 mb-8"
                >
                    <PawnIcon className="w-4 h-4 text-primary-400" />
                    <span className="text-sm text-primary-300 font-medium">The move they didn't see coming</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-cream-300 mb-6 leading-tight"
                >
                    Verify Humans.{' '}
                    <span className="text-primary-400">Block Imposters.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-cream-500 mb-10 max-w-2xl mx-auto"
                >
                    En Passant captures bots trying to slip past verification.
                    Prove you're human. Authorize your AI agents. Take control.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/register">
                        <Button size="lg" className="group bg-primary-500 hover:bg-primary-600 text-chess-black font-bold">
                            Get Verified
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" size="lg" className="border-cream-600 text-cream-300 hover:bg-cream-300/10">
                            Sign In
                        </Button>
                    </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 text-cream-600"
                >
                    <div className="flex items-center gap-2">
                        <PawnIcon className="w-4 h-4 text-primary-500" />
                        <span className="text-sm">Human Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-chess-green" />
                        <span className="text-sm">Ed25519 Signed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-chess-green" />
                        <span className="text-sm">Agent Authorization</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
