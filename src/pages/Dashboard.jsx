import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, LayoutGrid, Bot, Ticket, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui';
import TrustScoreCard from '../components/Dashboard/TrustScoreCard';
import AccountCard from '../components/Dashboard/AccountCard';
import RankGuardList from '../components/Dashboard/RankGuardList';
import GenerateRankGuardModal from '../components/Dashboard/GenerateRankGuardModal';
import InviteCodes from '../components/Dashboard/InviteCodes';
import RookIcon from '../components/icons/RookIcon';
import { FaceValueBadge } from '../components/tickets';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

export default function Dashboard() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, logout, connectGoogle, connectLinkedIn } = useAuthStore();

    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState(null);
    const [anchors, setAnchors] = useState([]);
    const [badges, setBadges] = useState([]);
    const [listings, setListings] = useState([]);
    const [showGenerateModal, setShowGenerateModal] = useState(false);

    // Check for OAuth callback
    useEffect(() => {
        const connected = searchParams.get('connected');
        const eduBonus = searchParams.get('edu_bonus') === 'true';
        if (connected === 'gmail') {
            if (eduBonus) {
                toast.success('Gmail connected! +25 EP points + 25 .edu bonus!');
            } else {
                toast.success('Gmail connected! +25 EP points');
            }
            window.history.replaceState({}, '', '/dashboard');
            fetchData();
        } else if (connected === 'linkedin') {
            toast.success('LinkedIn connected! +30 EP points');
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
            const [scoreRes, anchorsRes, badgesRes, listingsRes] = await Promise.all([
                api.user.getScore(),
                api.identity.getAnchors(),
                api.badges.list(),
                api.listings.my().catch(() => ({ listings: [] })),
            ]);
            setScoreData(scoreRes);
            setAnchors(anchorsRes.anchors || []);
            setBadges(badgesRes.badges || []);
            setListings(listingsRes.listings || []);
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
            toast.success('Rank Guard revoked');
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
                            <RookIcon className="w-5 h-5 text-chess-black" />
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
                        <p className="text-cream-600 mt-1">Manage your identity verification and Rank Guards</p>
                    </div>

                    {/* EP Score */}
                    <TrustScoreCard
                        score={scoreData?.trust_score}
                        breakdown={scoreData?.breakdown}
                        loading={loading}
                    />

                    {/* Invite Codes (Beta) */}
                    <InviteCodes />

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

                    {/* Rank Guards */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-cream-300">Rank Guards</h2>
                            <Button onClick={() => setShowGenerateModal(true)} className="bg-primary-500 hover:bg-primary-600 text-chess-black">
                                <Plus className="w-4 h-4 mr-2" />
                                Deploy Rank Guard
                            </Button>
                        </div>
                        <RankGuardList
                            badges={badges}
                            onRevoke={handleRevokeBadge}
                            loading={loading}
                        />
                    </div>

                    {/* My Ticket Listings */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-cream-300">My Ticket Listings</h2>
                            <Link to="/tickets/create">
                                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                                    <Ticket className="w-4 h-4 mr-2" />
                                    Sell Tickets
                                </Button>
                            </Link>
                        </div>
                        {loading ? (
                            <div className="bg-surface-500/50 backdrop-blur-md border border-white/10 rounded-xl p-8 flex justify-center">
                                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : listings.length === 0 ? (
                            <div className="bg-surface-500/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
                                <Ticket className="w-10 h-10 mx-auto text-cream-600 mb-3" />
                                <p className="text-cream-400 mb-4">No ticket listings yet</p>
                                <Link to="/tickets/create">
                                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
                                        List Your First Tickets
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {listings.map((listing) => (
                                    <Link
                                        key={listing.id}
                                        to={`/tickets/listing/${listing.id}`}
                                        className="block bg-surface-500/50 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-pink-500/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-cream-300 truncate">
                                                    {listing.eventName}
                                                </h3>
                                                <p className="text-sm text-cream-600 mt-1">
                                                    {listing.section} • {listing.quantity} ticket{listing.quantity > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <FaceValueBadge
                                                    status={listing.verificationStatus}
                                                    size="sm"
                                                    showPrice={false}
                                                    animated={false}
                                                />
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-cream-300">
                                                        ${(listing.askingPriceCents / 100).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-cream-600">per ticket</p>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-cream-600" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    to="/tickets/browse"
                                    className="block text-center py-3 text-pink-400 hover:text-pink-300 text-sm font-medium"
                                >
                                    Browse all tickets →
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>

            {/* Generate Rank Guard Modal */}
            <GenerateRankGuardModal
                isOpen={showGenerateModal}
                onClose={() => setShowGenerateModal(false)}
                onSuccess={fetchData}
                trustScore={scoreData?.trust_score}
            />
        </div>
    );
}
