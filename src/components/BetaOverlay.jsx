/**
 * Beta Overlay Component
 *
 * Fixed overlay modal for invite-only beta access.
 * Accepts initialCode (from URL params) and onAccessGranted callback.
 * Used by AccessGate to block content for users without beta access.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button, Input } from './ui';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

export default function BetaOverlay({ initialCode = '', onAccessGranted }) {
    const navigate = useNavigate();
    const { isAuthenticated, fetchBetaStatus, redeemInviteCode } = useAuthStore();
    const [inviteCode, setInviteCode] = useState(initialCode);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialCode) {
            setInviteCode(initialCode);
        }
    }, [initialCode]);

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        if (!inviteCode.trim()) {
            setError('Please enter an invite code');
            return;
        }

        setIsValidating(true);
        setError('');

        try {
            const validation = await api.invites.validate(inviteCode);

            if (!validation.valid) {
                setError(validation.error || 'Invalid invite code');
                setIsValidating(false);
                return;
            }

            if (isAuthenticated) {
                const result = await redeemInviteCode(inviteCode);
                if (result.success) {
                    toast.success('Welcome to the En Passant beta!');
                    await fetchBetaStatus();
                    onAccessGranted?.();
                }
            } else {
                navigate(`/register?code=${encodeURIComponent(inviteCode)}`);
            }
        } catch (err) {
            setError(err.message || 'Failed to validate code');
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-md w-full mx-4 p-8 bg-slate-900 border border-primary-500/30 rounded-2xl shadow-2xl"
                >
                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <span className="text-3xl">&#9822;</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center text-white mb-2">
                        Taking Signups for Open Beta
                    </h2>
                    <p className="text-slate-400 text-center mb-6">
                        En Passant is currently in private beta. Enter your invite code to get access.
                    </p>

                    {/* Early adopter badge */}
                    <div className="flex justify-center mb-6">
                        <span className="px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-xs font-medium">
                            3 months free for early adopters
                        </span>
                    </div>

                    {/* Invite Code Form */}
                    <form onSubmit={handleSubmitCode} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-slate-400 text-sm mb-2">Have an invite code?</label>
                            <Input
                                placeholder="EP-XXXXX-XXXXX"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                className="text-center text-lg tracking-wider font-mono"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isValidating}
                        >
                            {isAuthenticated ? 'Unlock Beta Access' : 'Continue with Code'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-slate-700" />
                        <span className="px-4 text-slate-500 text-sm">or</span>
                        <div className="flex-1 border-t border-slate-700" />
                    </div>

                    {/* Waitlist Option */}
                    <div className="text-center">
                        <p className="text-slate-400 text-sm mb-3">
                            Don't have a code? Join the waitlist.
                        </p>
                        <Link
                            to="/join"
                            className="text-primary-400 hover:text-primary-300 font-medium text-sm"
                        >
                            Join Waitlist &rarr;
                        </Link>
                    </div>

                    {/* Auth Links */}
                    {!isAuthenticated && (
                        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                            <p className="text-slate-400 text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-primary-400 hover:text-primary-300 font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    )}

                    {/* Get Verified CTA */}
                    <div className="mt-4 text-center">
                        <a
                            href="https://enpassantapi.io"
                            className="text-primary-400 hover:text-primary-300 text-sm font-medium inline-flex items-center gap-1"
                        >
                            Get Verified Early <span>&rarr;</span>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
