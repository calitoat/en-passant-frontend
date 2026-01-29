import { Link } from 'react-router-dom';

// Chess pawn icon
function PawnIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C10.34 2 9 3.34 9 5C9 6.04 9.5 6.94 10.25 7.5C9.5 8.11 9 8.97 9 9.97C9 10.5 9.13 11 9.37 11.44C7.97 12.5 7 14.12 7 16H17C17 14.12 16.03 12.5 14.63 11.44C14.87 11 15 10.5 15 9.97C15 8.97 14.5 8.11 13.75 7.5C14.5 6.94 15 6.04 15 5C15 3.34 13.66 2 12 2ZM6 18V19H18V18H6ZM5 20V22H19V20H5Z"/>
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-primary-500/20 py-12 px-6 bg-chess-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                            <PawnIcon className="w-5 h-5 text-chess-black" />
                        </div>
                        <span className="text-lg font-semibold text-cream-300">En Passant</span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-8 text-sm text-cream-600">
                        <Link to="/agents" className="hover:text-primary-400 transition-colors">Agents</Link>
                        <a href="#" className="hover:text-primary-400 transition-colors">API</a>
                        <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms</Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-cream-700">
                        © {new Date().getFullYear()} En Passant. Your move, verified.
                    </p>
                </div>
            </div>
        </footer>
    );
}
