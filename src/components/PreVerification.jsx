import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, X, Shield, Sparkles } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const EduIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
    </svg>
);

export default function PreVerification({
    onComplete,
    onSkip,
    initialScore = 20,
    accentColor = '#D4A853'
}) {
    const [score, setScore] = useState(initialScore);
    const [connectedProviders, setConnectedProviders] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const providers = [
        {
            id: 'google',
            name: 'Google',
            icon: GoogleIcon,
            points: 25,
            url: `${apiUrl}/auth/google`,
            available: true,
            description: 'Verify your Gmail account'
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            icon: LinkedInIcon,
            points: 30,
            url: `${apiUrl}/auth/linkedin`,
            available: true,
            description: 'Verify your professional identity'
        },
        {
            id: 'edu',
            name: '.edu Email',
            icon: EduIcon,
            points: 25,
            url: null,
            available: false,
            comingSoon: true,
            description: 'Verify student/alumni status'
        }
    ];

    const maxScore = 100;
    const scorePercentage = (score / maxScore) * 100;

    const handleConnect = (provider) => {
        if (!provider.available || provider.comingSoon) return;

        // Open OAuth in new window
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            provider.url,
            `${provider.name} Sign In`,
            `width=${width},height=${height},left=${left},top=${top}`
        );

        // Listen for OAuth completion message
        const handleMessage = (event) => {
            if (event.data?.type === 'oauth-success' && event.data?.provider === provider.id) {
                setConnectedProviders(prev => [...prev, provider.id]);
                setIsAnimating(true);
                setTimeout(() => {
                    setScore(prev => Math.min(prev + provider.points, maxScore));
                    setIsAnimating(false);
                }, 300);
                window.removeEventListener('message', handleMessage);
                popup?.close();
            }
        };

        window.addEventListener('message', handleMessage);
    };

    const handleComplete = () => {
        if (onComplete) {
            onComplete({ score, connectedProviders });
        }
    };

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="premium-card p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                        style={{ backgroundColor: `${accentColor}20` }}
                    >
                        <Sparkles className="w-8 h-8" style={{ color: accentColor }} />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Want to Skip the Line?
                    </h2>
                    <p className="text-zinc-400">
                        Boost your EP Score to get priority access
                    </p>
                </div>

                {/* EP Score Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-zinc-400">EP Score</span>
                        <motion.span
                            key={score}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold"
                            style={{ color: accentColor }}
                        >
                            {score}
                        </motion.span>
                    </div>
                    <div className="progress-bar h-3">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor})`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${scorePercentage}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-zinc-500">
                        <span>0</span>
                        <span>100</span>
                    </div>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                    {providers.map((provider) => {
                        const isConnected = connectedProviders.includes(provider.id);
                        const Icon = provider.icon;

                        return (
                            <motion.button
                                key={provider.id}
                                onClick={() => handleConnect(provider)}
                                disabled={!provider.available || isConnected}
                                className={`oauth-btn relative ${
                                    isConnected ? 'border-green-500/50 bg-green-500/10' : ''
                                } ${provider.comingSoon ? 'opacity-60' : ''}`}
                                whileHover={provider.available && !isConnected ? { scale: 1.02 } : {}}
                                whileTap={provider.available && !isConnected ? { scale: 0.98 } : {}}
                            >
                                <Icon />
                                <span className="flex-1 text-left">
                                    {provider.name}
                                </span>
                                {isConnected ? (
                                    <Check className="w-5 h-5 text-green-400" />
                                ) : provider.comingSoon ? (
                                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-700 text-zinc-400">
                                        Coming Soon
                                    </span>
                                ) : (
                                    <span
                                        className="text-sm font-semibold"
                                        style={{ color: accentColor }}
                                    >
                                        +{provider.points}
                                    </span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Beta Notice */}
                <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-400/80 text-center">
                        <Shield className="w-3 h-3 inline mr-1" />
                        OAuth verification is in beta. Your data is secure and never shared.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <motion.button
                        onClick={handleComplete}
                        className="btn-amber w-full group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <button
                        onClick={handleSkip}
                        className="w-full py-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
