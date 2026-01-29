import { Link } from 'react-router-dom';
import RookIcon from '../icons/RookIcon';

export default function Footer() {
    return (
        <footer className="border-t border-primary-500/20 py-12 px-6 bg-chess-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                            <RookIcon className="w-5 h-5 text-chess-black" />
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
