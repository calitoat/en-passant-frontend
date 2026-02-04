import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Ticket, Shield, ArrowUpDown, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ListingCard } from '../components/tickets';
import RookIcon from '../components/icons/RookIcon';
import api from '../lib/api';

export default function BrowseListings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(searchParams.get('eventId') || '');
    const [verifiedOnly, setVerifiedOnly] = useState(true);
    const [sortBy, setSortBy] = useState('asking_price_cents');
    const [sortOrder, setSortOrder] = useState('ASC');

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        fetchListings();
    }, [selectedEvent, verifiedOnly, sortBy, sortOrder]);

    const fetchEvents = async () => {
        try {
            const result = await api.events.list();
            setEvents(result.events || []);
        } catch (err) {
            console.error('Failed to fetch events:', err);
        }
    };

    const fetchListings = async () => {
        setLoading(true);
        try {
            const result = await api.listings.list({
                eventId: selectedEvent || undefined,
                verifiedOnly,
                sortBy,
                sortOrder
            });
            setListings(result.listings || []);
        } catch (err) {
            toast.error('Failed to load listings');
        } finally {
            setLoading(false);
        }
    };

    const handleEventChange = (eventId) => {
        setSelectedEvent(eventId);
        if (eventId) {
            setSearchParams({ eventId });
        } else {
            setSearchParams({});
        }
    };

    const toggleSort = () => {
        setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    };

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
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center border-3 border-black"
                            style={{
                                backgroundColor: '#FF69B4',
                                boxShadow: '3px 3px 0px #000'
                            }}
                        >
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-black tracking-tight">En Passant</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/tickets">
                            <button className="px-4 py-2 font-bold text-black hover:text-pink-500 transition-colors">
                                About
                            </button>
                        </Link>
                        <Link to="/tickets/create">
                            <button
                                className="px-4 md:px-6 py-2 font-bold text-white border-3 border-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                                style={{
                                    backgroundColor: '#FF69B4',
                                    boxShadow: '4px 4px 0px #000'
                                }}
                            >
                                Sell Tickets
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1
                            className="text-3xl md:text-5xl font-black text-black mb-4"
                            style={{ textShadow: '3px 3px 0px #FF69B4' }}
                        >
                            BROWSE TICKETS
                        </h1>
                        <p className="text-lg text-black/70">
                            All tickets capped at face value. No scalper markups.
                        </p>
                    </motion.div>

                    {/* Face Value Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 p-4 bg-green-500 border-4 border-black rounded-xl text-center"
                        style={{ boxShadow: '4px 4px 0px #000' }}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <Shield className="w-6 h-6 text-white" />
                            <span className="text-lg font-bold text-white">
                                Every ticket on En Passant is verified at or below face value
                            </span>
                            <Check className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 p-6 bg-white border-4 border-black rounded-xl"
                        style={{ boxShadow: '4px 4px 0px #000' }}
                    >
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Event Filter */}
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-bold text-black mb-2">
                                    <Filter className="w-4 h-4 inline mr-1" />
                                    Event
                                </label>
                                <select
                                    value={selectedEvent}
                                    onChange={(e) => handleEventChange(e.target.value)}
                                    className="w-full p-3 border-3 border-black rounded-lg font-medium"
                                >
                                    <option value="">All Events</option>
                                    {events.map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name} - {new Date(event.date).toLocaleDateString()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Verified Only Toggle */}
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    <Shield className="w-4 h-4 inline mr-1" />
                                    Filter
                                </label>
                                <button
                                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                                    className={`
                                        px-4 py-3 border-3 border-black rounded-lg font-bold flex items-center gap-2
                                        ${verifiedOnly ? 'bg-green-500 text-white' : 'bg-white text-black'}
                                    `}
                                    style={{ boxShadow: '2px 2px 0px #000' }}
                                >
                                    <Check className={`w-4 h-4 ${verifiedOnly ? 'opacity-100' : 'opacity-0'}`} />
                                    Verified Only
                                </button>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    <ArrowUpDown className="w-4 h-4 inline mr-1" />
                                    Sort
                                </label>
                                <button
                                    onClick={toggleSort}
                                    className="px-4 py-3 border-3 border-black rounded-lg font-bold bg-white flex items-center gap-2"
                                    style={{ boxShadow: '2px 2px 0px #000' }}
                                >
                                    Price: {sortOrder === 'ASC' ? 'Low to High' : 'High to Low'}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Listings Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : listings.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Ticket className="w-16 h-16 mx-auto text-black/30 mb-4" />
                            <h2 className="text-2xl font-bold text-black mb-2">No listings yet</h2>
                            <p className="text-black/60 mb-6">
                                Be the first to list tickets for this event!
                            </p>
                            <Link to="/tickets/create">
                                <button
                                    className="px-6 py-3 font-bold text-white border-3 border-black"
                                    style={{
                                        backgroundColor: '#FF69B4',
                                        boxShadow: '4px 4px 0px #000'
                                    }}
                                >
                                    Sell Your Tickets
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((listing, index) => (
                                <motion.div
                                    key={listing.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ListingCard listing={listing} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Results count */}
                    {!loading && listings.length > 0 && (
                        <p className="text-center text-black/60 mt-8">
                            Showing {listings.length} listing{listings.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}
