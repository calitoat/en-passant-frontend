import { motion } from 'framer-motion';

export default function Card({
    children,
    className = '',
    hover = false,
    glow = false,
    ...props
}) {
    const Component = hover ? motion.div : 'div';
    const motionProps = hover ? {
        whileHover: { y: -2, transition: { duration: 0.2 } },
    } : {};

    return (
        <Component
            className={`
                bg-surface-500/50 backdrop-blur-md border border-white/10 rounded-xl p-6
                ${hover ? 'transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer' : ''}
                ${glow ? 'shadow-glow' : ''}
                ${className}
            `}
            {...motionProps}
            {...props}
        >
            {children}
        </Component>
    );
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '' }) {
    return (
        <h3 className={`text-lg font-semibold text-white ${className}`}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = '' }) {
    return (
        <p className={`text-sm text-slate-400 mt-1 ${className}`}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '' }) {
    return (
        <div className={`mt-4 pt-4 border-t border-white/10 ${className}`}>
            {children}
        </div>
    );
}
