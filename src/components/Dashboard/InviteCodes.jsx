/**
 * Invite Codes Component
 *
 * Shows user's invite codes with copy-to-clipboard functionality.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '../ui';
import api from '../../lib/api';

export default function InviteCodes() {
    const [codes, setCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, available: 0, used: 0 });

    useEffect(() => {
        fetchCodes();
    }, []);

    const fetchCodes = async () => {
        try {
            const data = await api.invites.getMyCodes();
            setCodes(data.codes || []);
            setStats({
                total: data.totalCodes || 0,
                available: data.availableCodes || 0,
                used: data.usedCodes || 0,
            });
        } catch (err) {
            console.error('Failed to fetch invite codes:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async (text, label = 'Link') => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${label} copied to clipboard!`);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    if (isLoading) {
        return (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-slate-700 rounded w-1/3 mb-4" />
                    <div className="h-20 bg-slate-700 rounded" />
                </div>
            </div>
        );
    }

    if (codes.length === 0) {
        return null; // Don't show if user has no codes
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span>&#127881;</span> Your Invite Codes
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Share these with friends to give them beta access
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-primary-400">{stats.available}</p>
                    <p className="text-xs text-slate-500">available</p>
                </div>
            </div>

            {/* Codes List */}
            <div className="space-y-3">
                {codes.map((code, index) => (
                    <div
                        key={code.code}
                        className={`p-4 rounded-lg border ${
                            code.isAvailable
                                ? 'bg-slate-900/50 border-primary-500/30'
                                : 'bg-slate-900/30 border-slate-700 opacity-60'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-mono text-lg tracking-wider text-white">
                                    {code.code}
                                </p>
                                {code.isAvailable ? (
                                    <p className="text-xs text-green-400 mt-1">Available</p>
                                ) : (
                                    <p className="text-xs text-slate-500 mt-1">
                                        Used by {code.used_by_email || 'someone'}
                                    </p>
                                )}
                            </div>

                            {code.isAvailable && (
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => copyToClipboard(code.code, 'Code')}
                                    >
                                        Copy Code
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => copyToClipboard(code.shareUrl, 'Link')}
                                    >
                                        Copy Link
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats */}
            {stats.used > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400">
                        <span className="text-green-400">{stats.used}</span> of your invites have been used
                    </p>
                </div>
            )}
        </motion.div>
    );
}
