import { motion } from 'framer-motion';
import { TrendingDown, Check, X } from 'lucide-react';

export default function PriceComparisonGraphic({
    competitorName = 'StubHub',
    competitorPrice = 6500,
    enPassantPrice = 1200,
    className = ''
}) {
    const savings = competitorPrice - enPassantPrice;
    const savingsPercent = Math.round((savings / competitorPrice) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative ${className}`}
        >
            <div className="grid md:grid-cols-2 gap-6">
                {/* Competitor */}
                <motion.div
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    className="relative p-6 bg-red-500/10 border-4 border-red-500 rounded-xl"
                    style={{ boxShadow: '4px 4px 0px rgba(239, 68, 68, 0.5)' }}
                >
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded">
                        {competitorName}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <p className="text-red-300 text-sm font-medium">Super Bowl LX Ticket</p>
                            <p className="text-white/60 text-xs">400-Level</p>
                        </div>
                        <X className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="mt-4">
                        <span className="text-4xl font-black text-white">
                            ${competitorPrice.toLocaleString()}
                        </span>
                        <span className="text-red-400 text-sm ml-2 line-through">
                            +fees
                        </span>
                    </div>
                    <p className="text-red-400 text-sm mt-2 font-medium">
                        550% above face value
                    </p>
                </motion.div>

                {/* En Passant */}
                <motion.div
                    initial={{ x: 20 }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative p-6 bg-green-500/10 border-4 border-green-500 rounded-xl"
                    style={{ boxShadow: '4px 4px 0px rgba(34, 197, 94, 0.5)' }}
                >
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded">
                        En Passant
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            <p className="text-green-300 text-sm font-medium">Super Bowl LX Ticket</p>
                            <p className="text-white/60 text-xs">400-Level</p>
                        </div>
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="mt-4">
                        <span className="text-4xl font-black text-white">
                            ${enPassantPrice.toLocaleString()}
                        </span>
                        <span className="text-green-400 text-sm ml-2">
                            max
                        </span>
                    </div>
                    <p className="text-green-400 text-sm mt-2 font-medium">
                        Face value or less. Period.
                    </p>
                </motion.div>
            </div>

            {/* Savings Banner */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 p-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl border-4 border-black text-center"
                style={{ boxShadow: '6px 6px 0px #000' }}
            >
                <div className="flex items-center justify-center gap-3">
                    <TrendingDown className="w-6 h-6 text-black" />
                    <span className="text-2xl font-black text-black">
                        SAVE ${savings.toLocaleString()} ({savingsPercent}%)
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}
