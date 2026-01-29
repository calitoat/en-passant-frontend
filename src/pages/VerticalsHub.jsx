import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LogOut, Home, Briefcase, Heart, Award, Ticket, Bot,
    ExternalLink, Users, TrendingUp, ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui';
import useAuthStore from '../store/useAuthStore';

// Chess pawn icon
function PawnIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C10.34 2 9 3.34 9 5C9 6.04 9.5 6.94 10.25 7.5C9.5 8.11 9 8.97 9 9.97C9 10.5 9.13 11 9.37 11.44C7.97 12.5 7 14.12 7 16H17C17 14.12 16.03 12.5 14.63 11.44C14.87 11 15 10.5 15 9.97C15 8.97 14.5 8.11 13.75 7.5C14.5 6.94 15 6.04 15 5C15 3.34 13.66 2 12 2ZM6 18V19H18V18H6ZM5 20V22H19V20H5Z"/>
        </svg>
    );
}

export default function VerticalsHub() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [stats, setStats] = useState({ total: 2500, byVertical: {} });

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/waitlist/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log('Stats fetch failed, using defaults'));
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const verticals = [
        {
            id: 'agents',
            name: 'Agents',
            tagline: 'These Are The Droids',
            description: 'Authorize your AI agents with cryptographic credentials',
            icon: Bot,
            route: '/agents',
            color: 'from-primary-500 to-primary-600',
            bgColor: 'bg-primary-500/10',
            borderColor: 'border-primary-500/30',
            iconColor: 'text-primary-400',
            stats: stats.byVertical?.agents || 400
        },
        {
            id: 'tickets',
            name: 'Tickets',
            tagline: 'Real Fans Only',
            description: 'Bot-free ticket exchange with 2-ticket limit per event',
            icon: Ticket,
            route: '/tickets',
            color: 'from-pink-500 to-cyan-400',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30',
            iconColor: 'text-pink-400',
            stats: stats.byVertical?.tickets || 875
        },
        {
            id: 'dating',
            name: 'Dating',
            tagline: 'Verified Hearts',
            description: 'Match with real humans, not catfish or bots',
            icon: Heart,
            route: '/dating',
            color: 'from-rose-500 to-pink-600',
            bgColor: 'bg-rose-500/10',
            borderColor: 'border-rose-500/30',
            iconColor: 'text-rose-400',
            stats: stats.byVertical?.dating || 250
        },
        {
            id: 'jobs',
            name: 'Jobs',
            tagline: 'Human Talent',
            description: 'Stand out from AI resume spam with verified credentials',
            icon: Briefcase,
            route: '/jobs',
            color: 'from-indigo-500 to-purple-600',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/30',
            iconColor: 'text-indigo-400',
            stats: stats.byVertical?.jobs || 625
        },
        {
            id: 'apartments',
            name: 'Apartments',
            tagline: 'Rental Fortress',
            description: 'Get noticed by landlords with verified renter status',
            icon: Home,
            route: '/apartments',
            color: 'from-emerald-500 to-teal-600',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/30',
            iconColor: 'text-emerald-400',
            stats: stats.byVertical?.apartments || 625
        },
        {
            id: 'freelance',
            name: 'Freelance',
            tagline: 'Pro Verified',
            description: 'Win more bids with verified professional credentials',
            icon: Award,
            route: '/freelance',
            color: 'from-orange-500 to-amber-600',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            iconColor: 'text-orange-400',
            stats: stats.byVertical?.freelance || 500
        }
    ];

    return (
        <div className="min-h-screen bg-chess-black">
            {/* Header */}
            <header className="border-b border-primary-500/20 bg-chess-dark/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                            <PawnIcon className="w-5 h-5 text-chess-black" />
                        </div>
                        <span className="text-lg font-semibold text-cream-300">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-cream-600">{user?.email}</span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-cream-400 hover:text-cream-200">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Back to Dashboard */}
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-cream-600 hover:text-cream-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    {/* Page title */}
                    <div>
                        <h1 className="text-2xl font-bold text-cream-300">Vertical Landing Pages</h1>
                        <p className="text-cream-600 mt-1">Campaign pages for the Feb 8 launch - share these with your audience</p>
                    </div>

                    {/* Stats overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-chess-dark border border-primary-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-cream-600 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">Total Waitlist</span>
                            </div>
                            <p className="text-2xl font-bold text-cream-300">{stats.total?.toLocaleString()}</p>
                        </div>
                        <div className="bg-chess-dark border border-primary-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-cream-600 mb-1">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm">Verticals</span>
                            </div>
                            <p className="text-2xl font-bold text-cream-300">6</p>
                        </div>
                        <div className="bg-chess-dark border border-primary-500/20 rounded-xl p-4 col-span-2">
                            <div className="flex items-center gap-2 text-cream-600 mb-1">
                                <PawnIcon className="w-4 h-4" />
                                <span className="text-sm">Launch Date</span>
                            </div>
                            <p className="text-2xl font-bold text-cream-300">Feb 8, 2026</p>
                        </div>
                    </div>

                    {/* Verticals Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {verticals.map((vertical, index) => (
                            <motion.div
                                key={vertical.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={vertical.route}
                                    target="_blank"
                                    className={`block ${vertical.bgColor} ${vertical.borderColor} border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 group`}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vertical.color} flex items-center justify-center`}>
                                            <vertical.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-cream-700 group-hover:text-cream-300 transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-cream-300 mb-1">{vertical.name}</h3>
                                    <p className={`text-sm font-medium ${vertical.iconColor} mb-2`}>{vertical.tagline}</p>
                                    <p className="text-cream-600 text-sm mb-4">{vertical.description}</p>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-cream-700" />
                                            <span className="text-sm text-cream-600">
                                                {vertical.stats.toLocaleString()} signups
                                            </span>
                                        </div>
                                        <span className="text-xs text-cream-700">
                                            /{vertical.id}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Links */}
                    <div className="bg-chess-dark border border-primary-500/20 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-cream-300 mb-4">Quick Copy Links</h3>
                        <div className="space-y-3">
                            {verticals.map(vertical => (
                                <div key={vertical.id} className="flex items-center justify-between bg-chess-black/50 rounded-lg px-4 py-3">
                                    <code className="text-sm text-cream-500">
                                        enpassant.io{vertical.route}?source=YOUR_SOURCE
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(`https://enpassant.io${vertical.route}?source=`);
                                        }}
                                        className="text-xs text-primary-400 hover:text-primary-300 font-medium"
                                    >
                                        Copy
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-cream-700 mt-4">
                            Replace YOUR_SOURCE with your campaign identifier (e.g., qr-downtown, twitter-ad, email-blast)
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
