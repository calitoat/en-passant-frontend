import { motion } from 'framer-motion';
import { Shield, BarChart3, Zap, Bot, UserCheck } from 'lucide-react';

// Chess pawn icon
function PawnIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C10.34 2 9 3.34 9 5C9 6.04 9.5 6.94 10.25 7.5C9.5 8.11 9 8.97 9 9.97C9 10.5 9.13 11 9.37 11.44C7.97 12.5 7 14.12 7 16H17C17 14.12 16.03 12.5 14.63 11.44C14.87 11 15 10.5 15 9.97C15 8.97 14.5 8.11 13.75 7.5C14.5 6.94 15 6.04 15 5C15 3.34 13.66 2 12 2ZM6 18V19H18V18H6ZM5 20V22H19V20H5Z"/>
        </svg>
    );
}

const features = [
    {
        icon: UserCheck,
        title: 'Human Verification',
        description: 'Connect Gmail, LinkedIn, and .edu accounts to prove you\'re a real person. Your EP Score reflects your verified identity.',
    },
    {
        icon: Bot,
        title: 'Agent Authorization',
        description: 'Generate Pawn Passes for your AI agents. Cryptographically signed credentials that prove they\'re operating on your behalf.',
    },
    {
        icon: Shield,
        title: 'Bot Blocking',
        description: 'Platforms use En Passant to filter out imposters. Verified humans and authorized agents get through. Bots don\'t.',
    },
];

export default function Features() {
    return (
        <section className="py-24 px-6 bg-chess-dark">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <PawnIcon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-cream-300 mb-4">
                        How En Passant Works
                    </h2>
                    <p className="text-cream-600 max-w-2xl mx-auto">
                        Captured in passing. Verify your identity, authorize your agents, and let platforms know you're legitimate.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-chess-black/50 border border-primary-500/20 rounded-2xl p-6 hover:border-primary-500/40 transition-all"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-primary-400" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-cream-300 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-cream-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* EP Score explanation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-primary-500/10 border border-primary-500/30 rounded-full">
                        <span className="text-cream-400">EP Score: </span>
                        <span className="text-primary-400 font-bold">30</span>
                        <span className="text-cream-600">base</span>
                        <span className="text-cream-600">+</span>
                        <span className="text-primary-400 font-bold">30</span>
                        <span className="text-cream-600">Gmail</span>
                        <span className="text-cream-600">+</span>
                        <span className="text-primary-400 font-bold">40</span>
                        <span className="text-cream-600">LinkedIn</span>
                        <span className="text-cream-600">+</span>
                        <span className="text-primary-400 font-bold">15</span>
                        <span className="text-cream-600">.edu</span>
                        <span className="text-cream-600">=</span>
                        <span className="text-chess-green font-bold text-lg">115</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
