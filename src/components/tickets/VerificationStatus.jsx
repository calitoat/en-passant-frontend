import { motion } from 'framer-motion';
import { Shield, Clock, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

const statusDetails = {
    pending: {
        icon: Clock,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        title: 'Verification Pending',
        description: 'Your receipt is being processed'
    },
    verified: {
        icon: CheckCircle,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        title: 'Verified',
        description: 'Price is at or below face value'
    },
    manual_review: {
        icon: AlertTriangle,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        title: 'Manual Review',
        description: 'A team member will review your listing'
    },
    rejected: {
        icon: XCircle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        title: 'Rejected',
        description: 'Price exceeds face value limit'
    }
};

export default function VerificationStatus({
    status = 'pending',
    method = null,
    message = null,
    compact = false
}) {
    const details = statusDetails[status] || statusDetails.pending;
    const Icon = details.icon;

    if (compact) {
        return (
            <div className={`flex items-center gap-2 ${details.color}`}>
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{details.title}</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
                p-4 rounded-lg border ${details.borderColor} ${details.bgColor}
            `}
        >
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${details.bgColor}`}>
                    <Icon className={`w-5 h-5 ${details.color}`} />
                </div>
                <div className="flex-1">
                    <h4 className={`font-semibold ${details.color}`}>
                        {details.title}
                    </h4>
                    <p className="text-sm text-white/60 mt-1">
                        {message || details.description}
                    </p>
                    {method && (
                        <p className="text-xs text-white/40 mt-2">
                            Verification method: {method === 'ocr' ? 'Receipt OCR' : method === 'section_ceiling' ? 'Section Price Cap' : method}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
