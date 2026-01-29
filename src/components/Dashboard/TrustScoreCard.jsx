import { motion } from 'framer-motion';
import { Check, Mail, Linkedin, User, GraduationCap } from 'lucide-react';

export default function TrustScoreCard({ score, breakdown, loading }) {
    if (loading) {
        return (
            <div className="card animate-pulse">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 rounded-full bg-surface-600" />
                    <div className="flex-1 space-y-4 w-full">
                        <div className="h-4 bg-surface-600 rounded w-1/3" />
                        <div className="h-8 bg-surface-600 rounded w-full" />
                        <div className="h-8 bg-surface-600 rounded w-full" />
                        <div className="h-8 bg-surface-600 rounded w-full" />
                    </div>
                </div>
            </div>
        );
    }

    // Simple scoring breakdown (100-point system)
    const scoreItems = [
        {
            key: 'base',
            label: 'En Passant Account',
            points: 20,
            earned: breakdown?.base?.score || 20,
            icon: User,
            color: 'text-primary-400'
        },
        {
            key: 'gmail',
            label: 'Gmail Connected',
            points: 25,
            earned: breakdown?.gmail?.score || 0,
            icon: Mail,
            color: 'text-red-400'
        },
        {
            key: 'linkedin',
            label: 'LinkedIn Connected',
            points: 30,
            earned: breakdown?.linkedin?.score || 0,
            icon: Linkedin,
            color: 'text-blue-400'
        },
        {
            key: 'edu_bonus',
            label: '.edu Email Verified',
            points: 25,
            earned: breakdown?.edu_bonus?.score || 0,
            icon: GraduationCap,
            color: 'text-emerald-400',
            isBonus: true
        },
    ];

    // Clearance level based on score
    const getClearance = (s) => {
        if (s >= 100) return { level: 4, title: 'Grandmaster', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
        if (s >= 75) return { level: 3, title: 'Master', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
        if (s >= 50) return { level: 2, title: 'Player', color: 'text-blue-400', bg: 'bg-blue-500/20' };
        return { level: 1, title: 'Spectator', color: 'text-gray-400', bg: 'bg-gray-500/20' };
    };

    const clearance = getClearance(score || 0);

    const getScoreColor = (score) => {
        if (score >= 100) return 'text-green-400';
        if (score >= 70) return 'text-yellow-400';
        if (score >= 50) return 'text-blue-400';
        return 'text-slate-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
        >
            <h2 className="text-lg font-semibold text-white mb-6">EP Score</h2>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Large score display */}
                <div className="flex-shrink-0 text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(score || 0)}`}>
                        {score || 0}
                    </div>
                    <p className="text-slate-400 mt-1 text-sm">out of 100</p>
                    <div className={`mt-2 px-3 py-1 rounded-full ${clearance.bg} ${clearance.color} text-xs font-semibold inline-block`}>
                        {clearance.title}
                    </div>
                </div>

                {/* Breakdown checklist */}
                <div className="flex-1 w-full space-y-3">
                    {scoreItems.map((item, index) => {
                        const Icon = item.icon;
                        const isEarned = item.earned > 0;

                        return (
                            <motion.div
                                key={item.key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                    isEarned ? 'bg-white/5' : 'bg-surface-600/30 border border-dashed border-white/10'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${isEarned ? item.color : 'text-slate-500'}`} />
                                    <span className={isEarned ? 'text-white' : 'text-slate-500'}>
                                        {item.label}
                                    </span>
                                    {item.isBonus && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">
                                            Bonus
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`font-semibold ${isEarned ? 'text-green-400' : 'text-slate-500'}`}>
                                        +{item.points}
                                    </span>
                                    {isEarned && <Check className="w-4 h-4 text-green-400" />}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Call to action if score is not maxed */}
            {(score || 0) < 100 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-slate-400">
                        {(score || 0) >= 75
                            ? 'Connect a .edu email to reach Grandmaster status!'
                            : 'Connect more accounts to increase your EP Score and unlock higher clearance levels.'}
                    </p>
                </div>
            )}
        </motion.div>
    );
}
