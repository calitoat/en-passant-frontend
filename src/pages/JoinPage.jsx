/**
 * Join Page
 *
 * Landing page for invite links: /join?code=EP-XXXXX-XXXXX
 * Validates the code and directs user to register or redeem.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '../components/ui';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

export default function JoinPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isAuthenticated, betaAccess, redeemInviteCode, fetchBetaStatus } = useAuthStore();

    const [isValidating, setIsValidating] = useState(true);
    const [codeStatus, setCodeStatus] = useState(null); // { valid, type, source, error }
    const [isRedeeming, setIsRedeeming] = useState(false);

    const code = searchParams.get('code');
    const source = searchParams.get('source');

    // Validate code on mount
    useEffect(() => {
        if (!code) {
            setIsValidating(false);
            setCodeStatus({ valid: false, error: 'No invite code provided' });
            return;
        }

        const validateCode = async () => {
            try {
                const result = await api.invites.validate(code);
                setCodeStatus(result);
            } catch (err) {
                setCodeStatus({ valid: false, error: err.message || 'Failed to validate code' });
            } finally {
                setIsValidating(false);
            }
        };

        validateCode();
    }, [code]);

    // If user already has beta access, redirect to dashboard
    useEffect(() => {
        if (betaAccess?.hasBetaAccess) {
            toast.success('You already have beta access!');
            navigate('/dashboard');
        }
    }, [betaAccess, navigate]);

    const handleRedeem = async () => {
        if (!isAuthenticated) {
            // Redirect to register with code
            navigate(`/register?code=${encodeURIComponent(code)}`);
            return;
        }

        setIsRedeeming(true);
        try {
            const result = await redeemInviteCode(code);
            if (result.success) {
                toast.success('Welcome to the En Passant beta!');
                await fetchBetaStatus();
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err.message || 'Failed to redeem code');
        } finally {
            setIsRedeeming(false);
        }
    };

    // Loading state
    if (isValidating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Validating invite code...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full"
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">&#9822;</span>
                        </div>
                        <span className="text-2xl font-bold text-white">En Passant</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                    {codeStatus?.valid ? (
                        <>
                            {/* Valid Code */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-2">
                                    You're Invited!
                                </h1>
                                <p className="text-slate-400">
                                    {codeStatus.type === 'qr'
                                        ? 'You found one of our QR codes!'
                                        : 'Someone shared their invite with you!'}
                                </p>
                            </div>

                            {/* Code Display */}
                            <div className="bg-slate-900/50 border border-primary-500/30 rounded-lg p-4 mb-6">
                                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Invite Code</p>
                                <p className="text-primary-400 font-mono text-lg tracking-wider">{code}</p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-slate-300">
                                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Instant beta access</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>2 invite codes to share with friends</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Face-value ticket marketplace</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <Button
                                onClick={handleRedeem}
                                className="w-full"
                                isLoading={isRedeeming}
                            >
                                {isAuthenticated ? 'Activate Beta Access' : 'Create Account'}
                            </Button>

                            {!isAuthenticated && (
                                <p className="text-center text-slate-400 text-sm mt-4">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary-400 hover:text-primary-300">
                                        Sign in
                                    </Link>
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Invalid Code */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-2">
                                    Invalid Invite Code
                                </h1>
                                <p className="text-slate-400">
                                    {codeStatus?.error || 'This invite code is not valid or has already been used.'}
                                </p>
                            </div>

                            {/* Alternatives */}
                            <div className="space-y-3">
                                <Link to="/tickets">
                                    <Button variant="outline" className="w-full">
                                        Join the Waitlist
                                    </Button>
                                </Link>
                                <Link to="/">
                                    <Button variant="ghost" className="w-full">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Source tracking info (for valid QR codes) */}
                {source && codeStatus?.valid && (
                    <p className="text-center text-slate-500 text-xs mt-4">
                        Source: {source}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
