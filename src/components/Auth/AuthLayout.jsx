import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Chess pawn icon
function PawnIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C10.34 2 9 3.34 9 5C9 6.04 9.5 6.94 10.25 7.5C9.5 8.11 9 8.97 9 9.97C9 10.5 9.13 11 9.37 11.44C7.97 12.5 7 14.12 7 16H17C17 14.12 16.03 12.5 14.63 11.44C14.87 11 15 10.5 15 9.97C15 8.97 14.5 8.11 13.75 7.5C14.5 6.94 15 6.04 15 5C15 3.34 13.66 2 12 2ZM6 18V19H18V18H6ZM5 20V22H19V20H5Z"/>
        </svg>
    );
}

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-chess-black">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #d4af37 1px, transparent 1px),
                            linear-gradient(to bottom, #d4af37 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                        <PawnIcon className="w-6 h-6 text-chess-black" />
                    </div>
                    <span className="text-2xl font-bold text-cream-300">En Passant</span>
                </Link>

                {/* Card */}
                <div className="bg-chess-dark border border-primary-500/20 rounded-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-cream-300 mb-2">{title}</h1>
                        {subtitle && <p className="text-cream-600">{subtitle}</p>}
                    </div>

                    {/* Form content */}
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
