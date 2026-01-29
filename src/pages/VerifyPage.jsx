import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Mail, Linkedin, GraduationCap, Clock, Shield, ExternalLink } from 'lucide-react';
import RookIcon from '../components/icons/RookIcon';

export default function VerifyPage() {
    const { username } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const response = await fetch(`${apiUrl}/api/verify/${username}`);
                const result = await response.json();

                if (!result.valid) {
                    setError(result.error || 'User not found');
                } else {
                    setData(result);
                }
            } catch (err) {
                setError('Failed to load verification data');
            } finally {
                setLoading(false);
            }
        };

        fetchVerification();
    }, [username]);

    const getClearanceStyle = (level) => {
        switch (level) {
            case 4: return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' };
            case 3: return { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400' };
            case 2: return { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' };
            default: return { bg: 'bg-gray-500/20', border: 'border-gray-500/50', text: 'text-gray-400' };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
                <div className="text-center">
                    <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Verification Not Found</h1>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-black rounded-lg font-medium hover:bg-[#c4a030] transition-colors"
                    >
                        Go to En Passant
                    </Link>
                </div>
            </div>
        );
    }

    const { verification } = data;
    const clearanceStyle = getClearanceStyle(verification.clearance.level);

    return (
        <div className="min-h-screen bg-[#1a1a1a]">
            {/* Header */}
            <header className="border-b border-[#d4af37]/20 bg-[#1a1a1a]/90 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center">
                            <RookIcon className="w-5 h-5 text-[#1a1a1a]" />
                        </div>
                        <span className="text-lg font-semibold text-white">En Passant</span>
                    </Link>
                    <span className="text-sm text-gray-500">Public Verification</span>
                </div>
            </header>

            {/* Certificate */}
            <main className="max-w-2xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#222] border border-[#d4af37]/30 rounded-2xl overflow-hidden"
                >
                    {/* Certificate Header */}
                    <div className="bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 border-b border-[#d4af37]/20 p-6 text-center">
                        <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                            <RookIcon className="w-10 h-10 text-[#1a1a1a]" />
                        </div>
                        <h1 className="text-sm uppercase tracking-wider text-[#d4af37] font-semibold mb-1">
                            Verified Identity
                        </h1>
                        <p className="text-3xl font-bold text-white">@{data.username}</p>
                    </div>

                    {/* EP Score Section */}
                    <div className="p-6 border-b border-[#d4af37]/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">EP Score</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-white">{verification.ep_score}</span>
                                    <span className="text-xl text-gray-500">/100</span>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-lg border ${clearanceStyle.bg} ${clearanceStyle.border}`}>
                                <p className="text-xs text-gray-400 mb-1">Clearance Level</p>
                                <p className={`text-lg font-bold ${clearanceStyle.text}`}>
                                    {verification.clearance.title}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Connected Anchors */}
                    <div className="p-6 border-b border-[#d4af37]/10">
                        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Verified Anchors</h3>
                        <div className="space-y-3">
                            {/* Gmail */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${verification.anchors.gmail.verified ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                                        <Mail className={`w-5 h-5 ${verification.anchors.gmail.verified ? 'text-green-400' : 'text-gray-500'}`} />
                                    </div>
                                    <span className="text-white">Gmail</span>
                                </div>
                                {verification.anchors.gmail.verified ? (
                                    <div className="flex items-center gap-2 text-green-400">
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <X className="w-5 h-5" />
                                        <span className="text-sm">Not connected</span>
                                    </div>
                                )}
                            </div>

                            {/* LinkedIn */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${verification.anchors.linkedin.verified ? 'bg-blue-500/20' : 'bg-gray-500/20'}`}>
                                        <Linkedin className={`w-5 h-5 ${verification.anchors.linkedin.verified ? 'text-blue-400' : 'text-gray-500'}`} />
                                    </div>
                                    <span className="text-white">LinkedIn</span>
                                </div>
                                {verification.anchors.linkedin.verified ? (
                                    <div className="flex items-center gap-2 text-blue-400">
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <X className="w-5 h-5" />
                                        <span className="text-sm">Not connected</span>
                                    </div>
                                )}
                            </div>

                            {/* .edu Email */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${verification.anchors.edu.verified ? 'bg-emerald-500/20' : 'bg-gray-500/20'}`}>
                                        <GraduationCap className={`w-5 h-5 ${verification.anchors.edu.verified ? 'text-emerald-400' : 'text-gray-500'}`} />
                                    </div>
                                    <span className="text-white">.edu Email</span>
                                </div>
                                {verification.anchors.edu.verified ? (
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <X className="w-5 h-5" />
                                        <span className="text-sm">Not verified</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Rank Guards */}
                    {verification.rank_guards && verification.rank_guards.length > 0 && (
                        <div className="p-6 border-b border-[#d4af37]/10">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Active Rank Guards</h3>
                            <div className="space-y-2">
                                {verification.rank_guards.map((guard, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-[#d4af37]" />
                                            <span className="text-white capitalize">{guard.type}</span>
                                        </div>
                                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                                            {guard.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="p-6 bg-[#1a1a1a]">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Member since {new Date(verification.member_since).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Verified by</span>
                                <span className="text-[#d4af37] font-semibold">En Passant</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Get Verified CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-400 mb-4">Want your own verification badge?</p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black rounded-lg font-bold hover:bg-[#c4a030] transition-colors"
                    >
                        Get Verified
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}
