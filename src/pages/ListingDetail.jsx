import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, MapPin, Calendar, Users, Shield, TrendingDown,
    Flag, Share2, MessageCircle, AlertTriangle, Ticket
} from 'lucide-react';
import { toast } from 'sonner';
import { FaceValueBadge, VerificationStatus } from '../components/tickets';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

export default function ListingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFlagModal, setShowFlagModal] = useState(false);
    const [flagReason, setFlagReason] = useState('');
    const [flagDescription, setFlagDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchListing();
    }, [id]);

    const fetchListing = async () => {
        setLoading(true);
        try {
            const result = await api.listings.get(id);
            setListing(result);
        } catch (err) {
            toast.error('Failed to load listing');
            navigate('/tickets/browse');
        } finally {
            setLoading(false);
        }
    };

    const handleFlag = async () => {
        if (!flagReason) {
            toast.error('Please select a reason');
            return;
        }

        setSubmitting(true);
        try {
            await api.listings.flag(id, flagReason, flagDescription);
            toast.success('Thank you for your report. We\'ll review it shortly.');
            setShowFlagModal(false);
            setFlagReason('');
            setFlagDescription('');
        } catch (err) {
            toast.error(err.message || 'Failed to submit report');
        } finally {
            setSubmitting(false);
        }
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${listing.eventName} Tickets`,
                    text: `Check out these tickets on En Passant!`,
                    url
                });
            } catch (err) {
                // User cancelled
            }
        } else {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard!');
        }
    };

    const formatPrice = (cents) => {
        return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#89CFF0' }}>
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!listing) {
        return null;
    }

    const isBelowFaceValue = listing.faceValueCents && listing.askingPriceCents < listing.faceValueCents;
    const savingsAmount = isBelowFaceValue ? listing.faceValueCents - listing.askingPriceCents : 0;
    const savingsPercent = isBelowFaceValue
        ? Math.round((savingsAmount / listing.faceValueCents) * 100)
        : 0;

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#89CFF0' }}>
            {/* Pop Art Pattern */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle, #FF69B4 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-white/90 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 font-bold text-black hover:text-pink-500"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleShare}
                            className="p-2 hover:bg-black/5 rounded-lg"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        {isAuthenticated && (
                            <button
                                onClick={() => setShowFlagModal(true)}
                                className="p-2 hover:bg-black/5 rounded-lg text-red-500"
                            >
                                <Flag className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-4 border-black rounded-xl overflow-hidden"
                        style={{ boxShadow: '8px 8px 0px #000' }}
                    >
                        {/* Event Header */}
                        <div className="p-6 bg-gradient-to-r from-pink-100 to-blue-100 border-b-4 border-black">
                            <FaceValueBadge
                                status={listing.verificationStatus}
                                verifiedPrice={listing.faceValueCents}
                                size="lg"
                            />

                            <h1 className="text-3xl font-black text-black mt-4">
                                {listing.eventName}
                            </h1>

                            <div className="flex flex-wrap gap-4 mt-4 text-black/70">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{formatDate(listing.eventDate)}</span>
                                </div>
                                {listing.venueName && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        <span>{listing.venueName}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ticket Details */}
                        <div className="p-6 border-b-4 border-black/10">
                            <h2 className="text-lg font-bold text-black mb-4">Ticket Details</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <span className="text-black/50 text-sm">Section</span>
                                    <p className="text-xl font-bold text-black">{listing.section}</p>
                                </div>
                                {listing.rowName && (
                                    <div>
                                        <span className="text-black/50 text-sm">Row</span>
                                        <p className="text-xl font-bold text-black">{listing.rowName}</p>
                                    </div>
                                )}
                                {listing.seatNumbers && (
                                    <div>
                                        <span className="text-black/50 text-sm">Seats</span>
                                        <p className="text-xl font-bold text-black">{listing.seatNumbers}</p>
                                    </div>
                                )}
                                <div>
                                    <span className="text-black/50 text-sm">Quantity</span>
                                    <p className="text-xl font-bold text-black flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        {listing.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Verification Status */}
                        <div className="p-6 border-b-4 border-black/10">
                            <h2 className="text-lg font-bold text-black mb-4">Verification</h2>
                            <VerificationStatus
                                status={listing.verificationStatus}
                                method={listing.verificationMethod}
                            />
                        </div>

                        {/* Price Section */}
                        <div className="p-6 bg-black text-white">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <span className="text-white/60">Price per ticket</span>
                                    <div className="flex items-baseline gap-3 mt-1">
                                        <span className="text-4xl font-black">
                                            {formatPrice(listing.askingPriceCents)}
                                        </span>
                                        {listing.faceValueCents && (
                                            <span className="text-white/50">
                                                Face value: {formatPrice(listing.faceValueCents)}
                                            </span>
                                        )}
                                    </div>

                                    {isBelowFaceValue && (
                                        <div className="flex items-center gap-2 text-green-400 mt-2">
                                            <TrendingDown className="w-5 h-5" />
                                            <span className="font-bold">
                                                {savingsPercent}% below face value - Save {formatPrice(savingsAmount)}!
                                            </span>
                                        </div>
                                    )}

                                    <p className="text-white/40 text-sm mt-4">
                                        Total for {listing.quantity} ticket{listing.quantity > 1 ? 's' : ''}:{' '}
                                        <span className="text-white font-bold">
                                            {formatPrice(listing.askingPriceCents * listing.quantity)}
                                        </span>
                                    </p>
                                </div>

                                {/* Seller Info */}
                                {listing.sellerTrustScore && (
                                    <div className="p-4 bg-white/10 rounded-xl">
                                        <div className="flex items-center gap-2 text-white/60 mb-2">
                                            <Shield className="w-4 h-4" />
                                            <span className="text-sm">Verified Seller</span>
                                        </div>
                                        {listing.sellerUsername && (
                                            <p className="text-white font-medium">@{listing.sellerUsername}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-white/60">EP Score:</span>
                                            <span className="px-3 py-1 bg-pink-500 rounded-full font-bold">
                                                {listing.sellerTrustScore}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact CTA */}
                            <div className="mt-6 pt-6 border-t border-white/20">
                                <button
                                    className="w-full py-4 bg-pink-500 text-white font-bold text-lg rounded-xl border-2 border-white/20 hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Contact Seller
                                </button>
                                <p className="text-center text-white/40 text-sm mt-3">
                                    Payment and transfer handled securely through En Passant
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Flag Modal */}
            {showFlagModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md bg-white border-4 border-black rounded-xl overflow-hidden"
                        style={{ boxShadow: '8px 8px 0px #000' }}
                    >
                        <div className="p-6 border-b-4 border-black/10 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-black">Report Listing</h2>
                        </div>

                        <div className="p-6">
                            <label className="block text-sm font-bold text-black mb-2">
                                Reason for report
                            </label>
                            <select
                                value={flagReason}
                                onChange={(e) => setFlagReason(e.target.value)}
                                className="w-full p-3 border-3 border-black rounded-lg mb-4"
                            >
                                <option value="">Select a reason</option>
                                <option value="price_too_high">Price exceeds face value</option>
                                <option value="fake_receipt">Suspicious receipt</option>
                                <option value="wrong_section">Incorrect section/seats</option>
                                <option value="duplicate">Duplicate listing</option>
                                <option value="other">Other</option>
                            </select>

                            <label className="block text-sm font-bold text-black mb-2">
                                Additional details (optional)
                            </label>
                            <textarea
                                value={flagDescription}
                                onChange={(e) => setFlagDescription(e.target.value)}
                                placeholder="Provide more context..."
                                rows={3}
                                className="w-full p-3 border-3 border-black rounded-lg resize-none"
                            />
                        </div>

                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => setShowFlagModal(false)}
                                className="flex-1 py-3 font-bold text-black border-3 border-black rounded-lg hover:bg-black/5"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFlag}
                                disabled={submitting}
                                className="flex-1 py-3 font-bold text-white bg-red-500 border-3 border-black rounded-lg hover:bg-red-600 disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
