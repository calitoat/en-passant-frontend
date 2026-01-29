import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Modal, Button } from '../ui';
import RookIcon from '../icons/RookIcon';
import api from '../../lib/api';

export default function GenerateRankGuardModal({ isOpen, onClose, onSuccess, trustScore }) {
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await api.badges.generate();
            setGenerated(result.badge);
            toast.success('Rank Guard deployed successfully!');
            onSuccess?.();
        } catch (err) {
            toast.error(err.message || 'Failed to deploy Rank Guard');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setGenerated(null);
        onClose();
    };

    const copyRankGuard = async () => {
        if (!generated) return;

        const rankGuardData = JSON.stringify({
            badge_token: generated.badge_token,
            payload: generated.payload,
            signature: generated.signature,
        }, null, 2);

        try {
            await navigator.clipboard.writeText(rankGuardData);
            toast.success('Rank Guard copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy Rank Guard');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Deploy Rank Guard">
            {!generated ? (
                <div className="space-y-6">
                    {/* Preview */}
                    <div className="text-center py-6">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-20 h-20 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-4"
                        >
                            <RookIcon className="w-10 h-10 text-primary-400" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Deploy New Rank Guard
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Your Rank Guard will include your current EP Score of{' '}
                            <span className="text-success font-semibold">{trustScore || 0}</span>
                        </p>
                    </div>

                    {/* Rank Guard info */}
                    <div className="space-y-3 p-4 rounded-lg bg-surface-600/50">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">EP Score</span>
                            <span className="text-white font-medium">{trustScore || 0}/100</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Valid For</span>
                            <span className="text-white font-medium">7 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Signature</span>
                            <span className="text-white font-medium">Ed25519</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={handleClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleGenerate}
                            isLoading={loading}
                            className="flex-1"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Deploy Rank Guard
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Success animation */}
                    <div className="text-center py-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <RookIcon className="w-10 h-10 text-success" />
                            </motion.div>
                        </motion.div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Rank Guard Deployed!
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Your Rank Guard is ready. Copy it to use with your AI agents.
                        </p>
                    </div>

                    {/* Rank Guard preview */}
                    <div className="p-4 rounded-lg bg-surface-600/50 font-mono text-xs text-slate-400 overflow-x-auto">
                        <pre>{JSON.stringify({
                            badge_token: generated.badge_token?.slice(0, 20) + '...',
                            trust_score: generated.payload?.trust_score,
                            expires_at: generated.expires_at,
                        }, null, 2)}</pre>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={handleClose} className="flex-1">
                            Close
                        </Button>
                        <Button onClick={copyRankGuard} className="flex-1">
                            Copy Rank Guard
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
}
