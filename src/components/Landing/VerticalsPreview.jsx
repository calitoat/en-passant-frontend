import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ticket, Home, Briefcase, Heart, Award, ArrowRight } from 'lucide-react';

const verticals = [
    {
        id: 'tickets',
        icon: Ticket,
        title: 'Tickets',
        description: 'Fair ticket trading for real fans. No bots, no scalpers.',
        color: '#7DD3FC',
        href: '/tickets',
        stats: '2 ticket limit'
    },
    {
        id: 'apartments',
        icon: Home,
        title: 'Apartments',
        description: 'Verified renters get noticed by landlords first.',
        color: '#6EE7B7',
        href: '/apartments',
        stats: 'Priority access'
    },
    {
        id: 'jobs',
        icon: Briefcase,
        title: 'Jobs',
        description: 'Stand out from AI-generated applications.',
        color: '#A5B4FC',
        href: '/jobs',
        stats: 'Recruiter verified'
    },
    {
        id: 'dating',
        icon: Heart,
        title: 'Dating',
        description: 'Match with verified humans, not catfish.',
        color: '#FDA4AF',
        href: '/dating',
        stats: 'Real profiles only'
    },
    {
        id: 'freelance',
        icon: Award,
        title: 'Freelance',
        description: 'Build trust with clients. Win more bids.',
        color: '#FDBA74',
        href: '/freelance',
        stats: 'Verified pro'
    }
];

export default function VerticalsPreview() {
    return (
        <section className="py-24 px-6 bg-dark-surface relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4 block">
                        Verticals
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Verification for Every Platform
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        One verification, access to trusted marketplaces across the internet.
                    </p>
                </motion.div>

                {/* Vertical cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {verticals.map((vertical, index) => (
                        <motion.div
                            key={vertical.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={vertical.href}>
                                <div className="premium-card-hover p-6 h-full group cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        {/* Icon */}
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: `${vertical.color}15` }}
                                        >
                                            <vertical.icon
                                                className="w-6 h-6"
                                                style={{ color: vertical.color }}
                                            />
                                        </div>
                                        <ArrowRight
                                            className="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                                        />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                        {vertical.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                                        {vertical.description}
                                    </p>

                                    {/* Stats badge */}
                                    <div
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: `${vertical.color}10`,
                                            color: vertical.color
                                        }}
                                    >
                                        {vertical.stats}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
