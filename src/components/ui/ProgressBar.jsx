import { motion } from 'framer-motion';

export default function ProgressBar({
    value,
    max = 100,
    label,
    showValue = true,
    size = 'md',
    color = 'primary',
    className = '',
}) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    const colors = {
        primary: 'bg-primary-500',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
    };

    // Dynamic color based on value
    const getAutoColor = () => {
        if (percentage >= 70) return 'bg-success';
        if (percentage >= 40) return 'bg-warning';
        return 'bg-danger';
    };

    const barColor = color === 'auto' ? getAutoColor() : colors[color];

    return (
        <div className={`w-full ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-2">
                    {label && (
                        <span className="text-sm text-slate-400">{label}</span>
                    )}
                    {showValue && (
                        <span className="text-sm font-medium text-slate-300">
                            {value}/{max}
                        </span>
                    )}
                </div>
            )}
            <div className={`w-full bg-surface-600 rounded-full overflow-hidden ${sizes[size]}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${barColor}`}
                />
            </div>
        </div>
    );
}

export function CircularProgress({
    value,
    max = 100,
    size = 120,
    strokeWidth = 8,
    showValue = true,
    className = '',
}) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    // Color based on score
    const getColor = () => {
        if (percentage >= 70) return '#00D4AA'; // success
        if (percentage >= 40) return '#FFC043'; // warning
        return '#DF1B41'; // danger
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-surface-600"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>
            {showValue && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-3xl font-bold text-white"
                    >
                        {value}
                    </motion.span>
                </div>
            )}
        </div>
    );
}
