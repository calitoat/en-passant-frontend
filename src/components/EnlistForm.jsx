import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import PreVerification from './PreVerification';

export default function EnlistForm({
    vertical,
    source = 'organic',
    ctaText = 'JOIN THE RESISTANCE',
    subtitle = 'Be notified when we launch',
    onSuccess,
    theme = 'dark',
    showPreVerification = false,
    accentColor = '#D4A853'
}) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/api/waitlist/enlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    phone: phone || null,
                    source,
                    vertical
                }),
            });

            const data = await response.json();

            if (!response.ok && response.status !== 200) {
                throw new Error(data.error || 'Failed to join waitlist');
            }

            setUserData(data);

            if (showPreVerification) {
                setShowVerification(true);
            } else {
                setSuccess(true);
            }

            setEmail('');
            setPhone('');

            if (onSuccess) {
                onSuccess(data);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationComplete = (verificationData) => {
        setShowVerification(false);
        setSuccess(true);
    };

    const handleVerificationSkip = () => {
        setShowVerification(false);
        setSuccess(true);
    };

    const isDark = theme === 'dark';

    // Show PreVerification screen
    if (showVerification) {
        return (
            <AnimatePresence mode="wait">
                <PreVerification
                    onComplete={handleVerificationComplete}
                    onSkip={handleVerificationSkip}
                    initialScore={20}
                    accentColor={accentColor}
                />
            </AnimatePresence>
        );
    }

    // Show success state
    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'} border rounded-2xl p-8 text-center`}
            >
                <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    You're In!
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Check your email for confirmation. We'll notify you when we launch.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'premium-card' : 'bg-white border-gray-200 shadow-xl border'} rounded-2xl p-6 md:p-8`}
        >
            <div className="text-center mb-6">
                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {ctaText}
                </h3>
                <p className={isDark ? 'text-zinc-400' : 'text-gray-500'}>
                    {subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className={isDark ? 'input-premium' : 'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 border'}
                    />
                </div>

                <div>
                    <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Phone <span className={isDark ? 'text-zinc-500' : 'text-gray-400'}>(optional, for SMS updates)</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className={isDark ? 'input-premium' : 'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 border'}
                    />
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
                    style={{
                        backgroundColor: accentColor,
                        color: '#050505'
                    }}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            JOINING...
                        </>
                    ) : (
                        <>
                            {ctaText}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </motion.button>

                <p className={`text-xs text-center ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                    By joining, you agree to receive launch updates. Unsubscribe anytime.
                </p>
            </form>
        </motion.div>
    );
}
