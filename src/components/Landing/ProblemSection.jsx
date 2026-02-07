import { motion } from 'framer-motion';
import { Ticket, Home, Briefcase, Heart } from 'lucide-react';

const problems = [
    {
        icon: Ticket,
        title: 'Scalper Bots',
        description: 'Bots buy tickets in milliseconds. Real fans never stood a chance.',
        color: '#7DD3FC'
    },
    {
        icon: Home,
        title: 'Fake Apartments',
        description: 'Landlords drowning in AI-generated rental applications.',
        color: '#6EE7B7'
    },
    {
        icon: Heart,
        title: 'Catfish Profiles',
        description: 'Dating apps flooded with fake profiles and romance scams.',
        color: '#FDA4AF'
    },
    {
        icon: Briefcase,
        title: 'Spam Applications',
        description: 'Recruiters can\'t find real candidates in the AI resume flood.',
        color: '#A5B4FC'
    }
];

export default function ProblemSection() {
    return (
        <section className="py-24 px-6 bg-dark-surface relative overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4 block">
                        The Problem
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        The Internet Has a Trust Crisis
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Bots and imposters are everywhere. Real humans are getting filtered out.
                    </p>
                </motion.div>

                {/* Problem cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={problem.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="premium-card-hover p-6 group"
                        >
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${problem.color}15` }}
                            >
                                <problem.icon
                                    className="w-6 h-6"
                                    style={{ color: problem.color }}
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {problem.title}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
