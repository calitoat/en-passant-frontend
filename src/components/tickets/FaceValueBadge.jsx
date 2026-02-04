import { motion } from 'framer-motion';
import { Check, Clock, X, AlertTriangle } from 'lucide-react';

const statusConfig = {
    verified: {
        icon: Check,
        bg: 'bg-green-500',
        border: 'border-green-400',
        text: 'text-green-400',
        label: 'Face Value Verified'
    },
    pending: {
        icon: Clock,
        bg: 'bg-yellow-500',
        border: 'border-yellow-400',
        text: 'text-yellow-400',
        label: 'Verification Pending'
    },
    manual_review: {
        icon: AlertTriangle,
        bg: 'bg-orange-500',
        border: 'border-orange-400',
        text: 'text-orange-400',
        label: 'Under Review'
    },
    rejected: {
        icon: X,
        bg: 'bg-red-500',
        border: 'border-red-400',
        text: 'text-red-400',
        label: 'Not Verified'
    }
};

export default function FaceValueBadge({
    status = 'pending',
    verifiedPrice = null,
    size = 'md',
    showPrice = true,
    animated = true
}) {
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'text-xs px-2 py-1 gap-1',
        md: 'text-sm px-3 py-1.5 gap-2',
        lg: 'text-base px-4 py-2 gap-2'
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const Component = animated ? motion.div : 'div';
    const animationProps = animated ? {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.2 }
    } : {};

    const formatPrice = (cents) => {
        if (!cents) return null;
        return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
    };

    return (
        <Component
            className={`
                inline-flex items-center rounded-full font-semibold
                border ${config.border} bg-black/30 backdrop-blur-sm
                ${sizeClasses[size]}
            `}
            {...animationProps}
        >
            <span className={`${config.bg} rounded-full p-0.5`}>
                <Icon className={`${iconSizes[size]} text-white`} />
            </span>
            <span className={config.text}>{config.label}</span>
            {showPrice && verifiedPrice && status === 'verified' && (
                <span className="text-white/70 font-normal">
                    @ {formatPrice(verifiedPrice)}
                </span>
            )}
        </Component>
    );
}
