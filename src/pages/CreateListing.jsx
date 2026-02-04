import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Ticket, Upload, ChevronRight,
    MapPin, Calendar, Check, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
    ReceiptUploader,
    PriceValidator,
    VerificationStatus
} from '../components/tickets';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

export default function CreateListing() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    const [step, setStep] = useState(1);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [priceCeilings, setPriceCeilings] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    // Form state
    const [receiptId, setReceiptId] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const [section, setSection] = useState('');
    const [rowName, setRowName] = useState('');
    const [seatNumbers, setSeatNumbers] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [askingPriceCents, setAskingPriceCents] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=/tickets/create');
            return;
        }
        fetchEvents();
    }, [isAuthenticated]);

    useEffect(() => {
        if (selectedEvent) {
            fetchPriceCeilings(selectedEvent.id);
        }
    }, [selectedEvent]);

    const fetchEvents = async () => {
        try {
            const result = await api.events.list();
            setEvents(result.events || []);
        } catch (err) {
            toast.error('Failed to load events');
        } finally {
            setLoadingEvents(false);
        }
    };

    const fetchPriceCeilings = async (eventId) => {
        try {
            const result = await api.events.getCeilings(eventId);
            setPriceCeilings(result.ceilings || []);
        } catch (err) {
            console.error('Failed to load price ceilings:', err);
        }
    };

    const getSectionMaxPrice = () => {
        // First use OCR result if available
        if (ocrResult?.faceValueCents) {
            return ocrResult.faceValueCents;
        }

        // Fall back to section ceiling
        if (section && priceCeilings.length > 0) {
            const ceiling = priceCeilings.find(c =>
                section.toLowerCase().includes(c.sectionPattern.toLowerCase()) ||
                c.sectionPattern.toLowerCase().includes(section.toLowerCase())
            );
            return ceiling?.maxPriceCents || null;
        }

        return null;
    };

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        setStep(2);
    };

    const handleReceiptComplete = (receipt) => {
        setReceiptId(receipt.id);
    };

    const handleOcrResult = (result) => {
        setOcrResult(result);
        if (result.section) setSection(result.section);
        if (result.row) setRowName(result.row);
        if (result.seats) setSeatNumbers(result.seats);
        if (result.quantity) setQuantity(result.quantity);
        // Auto-advance to next step
        setStep(3);
    };

    const handleSubmit = async () => {
        if (!selectedEvent || !section || !askingPriceCents) {
            toast.error('Please fill in all required fields');
            return;
        }

        const maxPrice = getSectionMaxPrice();
        if (maxPrice && askingPriceCents > maxPrice) {
            toast.error('Price exceeds maximum allowed');
            return;
        }

        setSubmitting(true);
        try {
            const result = await api.listings.create({
                eventId: selectedEvent.id,
                eventName: selectedEvent.name,
                eventDate: selectedEvent.date,
                venueName: selectedEvent.venueName,
                section,
                rowName,
                seatNumbers,
                quantity,
                askingPriceCents,
                receiptId
            });

            toast.success('Listing created successfully!');
            navigate(`/tickets/listing/${result.listing.id}`);
        } catch (err) {
            toast.error(err.message || 'Failed to create listing');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
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
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => step > 1 ? setStep(step - 1) : navigate('/tickets')}
                        className="flex items-center gap-2 font-bold text-black hover:text-pink-500"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <div className="flex items-center gap-2 text-sm text-black/60">
                        <span className={step >= 1 ? 'text-pink-500 font-bold' : ''}>Event</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className={step >= 2 ? 'text-pink-500 font-bold' : ''}>Receipt</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className={step >= 3 ? 'text-pink-500 font-bold' : ''}>Details</span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Step 1: Select Event */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl font-black text-black mb-2">
                                Select Event
                            </h1>
                            <p className="text-black/70 mb-8">
                                Which event are you selling tickets for?
                            </p>

                            {loadingEvents ? (
                                <div className="flex justify-center py-12">
                                    <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : events.length === 0 ? (
                                <div className="text-center py-12 bg-white border-4 border-black rounded-xl"
                                     style={{ boxShadow: '4px 4px 0px #000' }}>
                                    <Ticket className="w-12 h-12 mx-auto text-black/30 mb-4" />
                                    <p className="text-black/60">No events available for ticket exchange</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {events.map((event) => (
                                        <button
                                            key={event.id}
                                            onClick={() => handleEventSelect(event)}
                                            className="w-full p-5 bg-white border-4 border-black rounded-xl text-left hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                            style={{ boxShadow: '4px 4px 0px #000' }}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-black text-lg">
                                                        {event.name}
                                                    </h3>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-black/60">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(event.date)}
                                                        </span>
                                                        {event.venueName && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {event.venueName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-6 h-6 text-black/30" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 2: Upload Receipt */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl font-black text-black mb-2">
                                Upload Receipt
                            </h1>
                            <p className="text-black/70 mb-8">
                                Upload your purchase receipt to verify face value.
                            </p>

                            <div className="bg-white border-4 border-black rounded-xl p-6 mb-6"
                                 style={{ boxShadow: '4px 4px 0px #000' }}>
                                <div className="flex items-center gap-3 mb-4 text-sm text-black/60">
                                    <Ticket className="w-5 h-5" />
                                    <span>{selectedEvent?.name}</span>
                                </div>

                                <ReceiptUploader
                                    onUploadComplete={handleReceiptComplete}
                                    onOcrResult={handleOcrResult}
                                />
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                className="w-full py-3 text-black/60 hover:text-black font-medium"
                            >
                                Skip for now (will use section price caps)
                            </button>
                        </motion.div>
                    )}

                    {/* Step 3: Listing Details */}
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl font-black text-black mb-2">
                                Listing Details
                            </h1>
                            <p className="text-black/70 mb-8">
                                Confirm your ticket details and set your price.
                            </p>

                            <div className="space-y-6">
                                {/* Event Info */}
                                <div className="bg-white border-4 border-black rounded-xl p-5"
                                     style={{ boxShadow: '4px 4px 0px #000' }}>
                                    <h3 className="font-bold text-black">{selectedEvent?.name}</h3>
                                    <p className="text-sm text-black/60 mt-1">
                                        {formatDate(selectedEvent?.date)} • {selectedEvent?.venueName}
                                    </p>
                                </div>

                                {/* OCR Result Indicator */}
                                {ocrResult && (
                                    <VerificationStatus
                                        status="verified"
                                        method="ocr"
                                        message={`Face value verified: $${(ocrResult.faceValueCents / 100).toFixed(0)} per ticket`}
                                    />
                                )}

                                {/* Section */}
                                <div>
                                    <label className="block font-bold text-black mb-2">
                                        Section *
                                    </label>
                                    <input
                                        type="text"
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        placeholder="e.g., 400-Level Corners"
                                        className="w-full p-4 border-3 border-black rounded-lg font-medium"
                                    />
                                    {priceCeilings.length > 0 && (
                                        <p className="text-sm text-black/50 mt-2">
                                            Sections: {priceCeilings.map(c => c.sectionPattern).join(', ')}
                                        </p>
                                    )}
                                </div>

                                {/* Row and Seats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold text-black mb-2">
                                            Row
                                        </label>
                                        <input
                                            type="text"
                                            value={rowName}
                                            onChange={(e) => setRowName(e.target.value)}
                                            placeholder="e.g., 12"
                                            className="w-full p-4 border-3 border-black rounded-lg font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-black mb-2">
                                            Seats
                                        </label>
                                        <input
                                            type="text"
                                            value={seatNumbers}
                                            onChange={(e) => setSeatNumbers(e.target.value)}
                                            placeholder="e.g., 5, 6"
                                            className="w-full p-4 border-3 border-black rounded-lg font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="block font-bold text-black mb-2">
                                        Quantity *
                                    </label>
                                    <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="w-full p-4 border-3 border-black rounded-lg font-medium"
                                    >
                                        <option value={1}>1 ticket</option>
                                        <option value={2}>2 tickets</option>
                                    </select>
                                    <p className="text-sm text-black/50 mt-2">
                                        Maximum 2 tickets per event per user
                                    </p>
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block font-bold text-black mb-2">
                                        Price per Ticket *
                                    </label>
                                    <PriceValidator
                                        value={askingPriceCents}
                                        onChange={setAskingPriceCents}
                                        maxPriceCents={getSectionMaxPrice()}
                                        faceValueCents={ocrResult?.faceValueCents}
                                        placeholder="Enter your asking price"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !section || !askingPriceCents}
                                    className="w-full py-4 bg-pink-500 text-white font-bold text-lg border-4 border-black rounded-xl hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    style={{ boxShadow: '4px 4px 0px #000' }}
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Creating Listing...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Create Listing
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-sm text-black/50">
                                    By listing, you agree to our terms and face-value-only policy.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
