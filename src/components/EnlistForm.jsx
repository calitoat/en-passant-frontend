import { useState } from 'react';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';

export default function EnlistForm({
    vertical,
    source = 'organic',
    ctaText = 'JOIN THE RESISTANCE',
    subtitle = 'Be notified when we launch',
    onSuccess,
    theme = 'dark'
}) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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

            setSuccess(true);
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

    const isDark = theme === 'dark';

    if (success) {
        return (
            <div className={`${isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'} border rounded-2xl p-8 text-center`}>
                <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    You're In!
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Check your email for confirmation. We'll notify you when we launch on Feb 8.
                </p>
            </div>
        );
    }

    return (
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-white border-gray-200 shadow-xl'} rounded-2xl p-6 md:p-8 border`}>
            <div className="text-center mb-6">
                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {ctaText}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                            isDark
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 border'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 border'
                        }`}
                    />
                </div>

                <div>
                    <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Phone <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>(optional, for SMS updates)</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                            isDark
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 border'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 border'
                        }`}
                    />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg flex items-center justify-center gap-2"
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
                </button>

                <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    By joining, you agree to receive launch updates. Unsubscribe anytime.
                </p>
            </form>
        </div>
    );
}
