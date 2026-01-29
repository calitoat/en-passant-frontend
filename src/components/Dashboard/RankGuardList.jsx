import { motion } from 'framer-motion';
import { Shield, Copy, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui';
import RookIcon from '../icons/RookIcon';

export default function RankGuardList({ badges, onRevoke, loading }) {
    const copyRankGuard = async (badge) => {
        const rankGuardData = JSON.stringify({
            badge_token: badge.badge_token,
            payload: {
                sub: badge.user_id,
                iss: 'enpassant.io',
                trust_score: badge.trust_score,
                badge_token: badge.badge_token,
            },
            signature: badge.signature || 'signature-here',
        }, null, 2);

        try {
            await navigator.clipboard.writeText(rankGuardData);
            toast.success('Rank Guard copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy Rank Guard');
        }
    };

    const formatExpiry = (dateStr) => {
        const expiry = new Date(dateStr);
        const now = new Date();
        const days = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

        if (days < 0) return 'Expired';
        if (days === 0) return 'Expires today';
        if (days === 1) return 'Expires tomorrow';
        return `Expires in ${days} days`;
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="card animate-pulse">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-surface-600" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-surface-600 rounded w-1/3" />
                                <div className="h-3 bg-surface-600 rounded w-1/2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!badges || badges.length === 0) {
        return (
            <div className="card text-center py-8">
                <RookIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No active Rank Guards</p>
                <p className="text-sm text-slate-500 mt-1">Deploy a Rank Guard to give your AI agents verified credentials</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {badges.map((badge, index) => (
                <motion.div
                    key={badge.badge_token}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:border-white/20 transition-all"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Rank Guard icon */}
                            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                                <RookIcon className="w-5 h-5 text-primary-400" />
                            </div>

                            {/* Rank Guard info */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">Rank Guard</span>
                                    <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                                        EP: {badge.trust_score}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatExpiry(badge.expires_at)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyRankGuard(badge)}
                                title="Copy Rank Guard"
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRevoke(badge.badge_token)}
                                title="Revoke Rank Guard"
                                className="text-danger hover:text-danger"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Rank Guard token preview */}
                    <div className="mt-4 p-3 rounded-lg bg-surface-600/50 font-mono text-xs text-slate-400 truncate">
                        {badge.badge_token}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
