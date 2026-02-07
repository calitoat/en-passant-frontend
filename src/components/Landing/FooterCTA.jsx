import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import EnlistForm from '../EnlistForm';
import RookIcon from '../icons/RookIcon';

export default function FooterCTA() {
    return (
        <section className="py-24 px-6 bg-dark-bg relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.2) 0%, transparent 70%)'
                }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* CTA Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                        <RookIcon className="w-8 h-8 text-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Get Verified?
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Join thousands of verified humans taking back the internet.
                    </p>
                </motion.div>

                {/* Enlist Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <EnlistForm
                        vertical="general"
                        source="landing-footer"
                        ctaText="GET VERIFIED"
                        subtitle="Join the waitlist for early access"
                        theme="dark"
                        showPreVerification={true}
                    />
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10 mt-24 pt-8 border-t border-dark-border"
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                            <RookIcon className="w-5 h-5 text-dark-bg" />
                        </div>
                        <span className="text-lg font-semibold text-white">En Passant</span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-8 text-sm text-zinc-500">
                        <Link to="/tickets" className="hover:text-amber-400 transition-colors">Tickets</Link>
                        <Link to="/apartments" className="hover:text-amber-400 transition-colors">Apartments</Link>
                        <Link to="/jobs" className="hover:text-amber-400 transition-colors">Jobs</Link>
                        <Link to="/dating" className="hover:text-amber-400 transition-colors">Dating</Link>
                        <Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms</Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-zinc-600">
                        © {new Date().getFullYear()} En Passant
                    </p>
                </div>
            </motion.footer>
        </section>
    );
}
