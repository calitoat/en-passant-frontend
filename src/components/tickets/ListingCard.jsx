import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, TrendingDown, Shield } from 'lucide-react';
import FaceValueBadge from './FaceValueBadge';

export default function ListingCard({
    listing,
    showSellerInfo = true,
    onClick,
    className = ''
}) {
    const {
        id,
        eventName,
        eventDate,
        venueName,
        section,
        rowName,
        seatNumbers,
        quantity,
        askingPriceCents,
        faceValueCents,
        verificationStatus,
        sellerUsername,
        sellerTrustScore
    } = listing;

    const formatPrice = (cents) => {
        return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
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

    const isBelowFaceValue = faceValueCents && askingPriceCents < faceValueCents;
    const savingsPercent = isBelowFaceValue
        ? Math.round(((faceValueCents - askingPriceCents) / faceValueCents) * 100)
        : 0;

    const CardWrapper = onClick ? motion.div : Link;
    const wrapperProps = onClick
        ? { onClick, role: 'button', tabIndex: 0 }
        : { to: `/tickets/listing/${id}` };

    return (
        <CardWrapper
            {...wrapperProps}
            className={`
                block bg-white border-4 border-black rounded-xl overflow-hidden
                transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none
                cursor-pointer
                ${className}
            `}
            style={{ boxShadow: '6px 6px 0px #000' }}
            whileHover={onClick ? { scale: 1.01 } : undefined}
        >
            {/* Header with badge */}
            <div className="p-4 border-b-4 border-black/10 bg-gradient-to-r from-pink-50 to-blue-50">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-black text-lg truncate">
                            {eventName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-black/60 mt-1">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{formatDate(eventDate)}</span>
                        </div>
                        {venueName && (
                            <div className="flex items-center gap-2 text-sm text-black/60 mt-1">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{venueName}</span>
                            </div>
                        )}
                    </div>
                    <FaceValueBadge
                        status={verificationStatus}
                        verifiedPrice={faceValueCents}
                        size="sm"
                        showPrice={false}
                    />
                </div>
            </div>

            {/* Ticket Details */}
            <div className="p-4">
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex-1">
                        <span className="text-black/50">Section</span>
                        <p className="font-bold text-black">{section}</p>
                    </div>
                    {rowName && (
                        <div>
                            <span className="text-black/50">Row</span>
                            <p className="font-bold text-black">{rowName}</p>
                        </div>
                    )}
                    {seatNumbers && (
                        <div>
                            <span className="text-black/50">Seats</span>
                            <p className="font-bold text-black">{seatNumbers}</p>
                        </div>
                    )}
                    <div>
                        <span className="text-black/50">Qty</span>
                        <p className="font-bold text-black flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {quantity}
                        </p>
                    </div>
                </div>
            </div>

            {/* Price & Seller */}
            <div className="p-4 bg-black text-white flex items-center justify-between">
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black">
                            {formatPrice(askingPriceCents)}
                        </span>
                        <span className="text-white/60 text-sm">each</span>
                    </div>
                    {isBelowFaceValue && (
                        <div className="flex items-center gap-1 text-green-400 text-sm font-medium mt-1">
                            <TrendingDown className="w-4 h-4" />
                            <span>{savingsPercent}% below face value!</span>
                        </div>
                    )}
                </div>

                {showSellerInfo && sellerTrustScore && (
                    <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-white/60">
                            <Shield className="w-4 h-4" />
                            <span>Seller</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            {sellerUsername && (
                                <span className="text-sm text-white/80">@{sellerUsername}</span>
                            )}
                            <span className="px-2 py-0.5 bg-pink-500 rounded text-sm font-bold">
                                EP {sellerTrustScore}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </CardWrapper>
    );
}
