import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, LayoutGrid, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui';
import TrustScoreCard from '../components/Dashboard/TrustScoreCard';
import AccountCard from '../components/Dashboard/AccountCard';
import BadgeList from '../components/Dashboard/BadgeList';
import GenerateBadgeModal from '../components/Dashboard/GenerateBadgeModal';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

// Chess pawn icon
function PawnIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C10.34 2 9 3.34 9 5C9 6.04 9.5 6.94 10.25 7.5C9.5 8.11 9 8.97 9 9.97C9 10.5 9.13 11 9.37 11.44C7.97 12.5 7 14.12 7 16H17C17 14.12 16.03 12.5 14.63 11.44C14.87 11 15 10.5 15 9.97C15 8.97 14.5 8.11 13.75 7.5C14.5 6.94 15 6.04 15 5C15 3.34 13.66 2 12 2ZM6 18V19H18V18H6ZM5 20V22H19V20H5Z"/>
        </svg>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, logout, connectGoogle, connectLinkedIn } = useAuthStore();

    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState(null);
    const [anchors, setAnchors] = useState([]);
    const [badges, setBadges] = useState([]);
    const [showGenerateModal, setShowGenerateModal] = useState(false);

    // Check for OAuth callback
    useEffect(() => {
        const connected = searchParams.get('connected');
        const eduBonus = searchParams.get('edu_bonus') === 'true';
        if (connected === 'gmail') {
            if (eduBonus) {
                toast.success('Gmail connected! +30 EP points + 15 .edu bonus!');
            } else {
                toast.success('Gmail connected! +30 EP points');
            }
            window.history.replaceState({}, '', '/dashboard');
            fetchData();
        } else if (connected === 'linkedin') {
            toast.success('LinkedIn connected! +40 EP points');
            window.history.replaceState({}, '', '/dashboard');
            fetchData();
        }

        const error = searchParams.get('error');
        if (error) {
            const provider = searchParams.get('provider');
            const providerName = provider === 'google' ? 'Gmail' : provider === 'linkedin' ? 'LinkedIn' : 'Provider';
            toast.error(`Failed to connect ${providerName}. Please try again.`);
            window.history.replaceState({}, '', '/dashboard');
        }
    }, [searchParams]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [scoreRes, anchorsRes, badgesRes] = await Promise.all([
                api.user.getScore(),
                api.identity.getAnchors(),
                api.badges.list(),
            ]);
            setScoreData(scoreRes);
            setAnchors(anchorsRes.anchors || []);
            setBadges(badgesRes.badges || []);
        } catch (err) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleConnectGmail = () => {
        connectGoogle();
    };

    const handleConnectLinkedIn = () => {
        connectLinkedIn();
    };

    const handleDisconnect = async (provider) => {
        try {
            await api.identity.disconnect(provider);
            toast.success(`${provider} disconnected`);
            fetchData();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleRevokeBadge = async (badgeToken) => {
        try {
            await api.badges.revoke(badgeToken);
            toast.success('Pawn Pass revoked');
            fetchData();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const gmailAnchor = anchors.find(a => a.provider === 'gmail');
    const linkedinAnchor = anchors.find(a => a.provider === 'linkedin');

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
                        <Link to="/verticals">
                            <Button variant="ghost" size="sm" className="text-cream-400 hover:text-cream-200">
                                <LayoutGrid className="w-4 h-4 mr-2" />
                                Verticals
                            </Button>
                        </Link>
                        <Link to="/agents">
                            <Button variant="ghost" size="sm" className="text-cream-400 hover:text-cream-200">
                                <Bot className="w-4 h-4 mr-2" />
                                Agents
                            </Button>
                        </Link>
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
                    {/* Page title */}
                    <div>
                        <h1 className="text-2xl font-bold text-cream-300">Dashboard</h1>
                        <p className="text-cream-600 mt-1">Manage your identity verification and Pawn Passes</p>
                    </div>

                    {/* EP Score */}
                    <TrustScoreCard
                        score={scoreData?.trust_score}
                        breakdown={scoreData?.breakdown}
                        loading={loading}
                    />

                    {/* Connected Accounts */}
                    <div>
                        <h2 className="text-lg font-semibold text-cream-300 mb-4">Connected Accounts</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <AccountCard
                                provider="gmail"
                                connected={!!gmailAnchor}
                                data={gmailAnchor}
                                onConnect={handleConnectGmail}
                                onDisconnect={() => handleDisconnect('gmail')}
                                loading={loading}
                            />
                            <AccountCard
                                provider="linkedin"
                                connected={!!linkedinAnchor}
                                data={linkedinAnchor}
                                onConnect={handleConnectLinkedIn}
                                onDisconnect={() => handleDisconnect('linkedin')}
                                loading={loading}
                            />
                        </div>
                    </div>

                    {/* Pawn Passes (Badges) */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-cream-300">Pawn Passes</h2>
                            <Button onClick={() => setShowGenerateModal(true)} className="bg-primary-500 hover:bg-primary-600 text-chess-black">
                                <Plus className="w-4 h-4 mr-2" />
                                Generate Pass
                            </Button>
                        </div>
                        <BadgeList
                            badges={badges}
                            onRevoke={handleRevokeBadge}
                            loading={loading}
                        />
                    </div>
                </motion.div>
            </main>

            {/* Generate Badge Modal */}
            <GenerateBadgeModal
                isOpen={showGenerateModal}
                onClose={() => setShowGenerateModal(false)}
                onSuccess={fetchData}
                trustScore={scoreData?.trust_score}
            />
        </div>
    );
}
