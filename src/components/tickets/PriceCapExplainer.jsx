import { motion } from 'framer-motion';
import { Upload, Scan, CheckCircle, Shield } from 'lucide-react';
import FaceValueFAQ from './FaceValueFAQ';

const steps = [
    {
        icon: Upload,
        title: 'Upload Receipt',
        description: 'Take a photo of your purchase receipt from Ticketmaster, AXS, or other primary sellers.'
    },
    {
        icon: Scan,
        title: 'We Verify',
        description: 'Our OCR reads the face value. No manual entry needed.'
    },
    {
        icon: CheckCircle,
        title: 'Price Capped',
        description: "Your listing can't exceed the verified face value. Period."
    },
    {
        icon: Shield,
        title: 'Buyer Protected',
        description: 'Buyers see "Face Value Verified" badge and shop with confidence.'
    }
];

export default function PriceCapExplainer({ showFAQ = true, className = '' }) {
    return (
        <div className={className}>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2
                    className="text-3xl md:text-5xl font-black text-black mb-4"
                    style={{ textShadow: '3px 3px 0px #FF69B4' }}
                >
                    HOW FACE VALUE WORKS
                </h2>
                <p className="text-xl text-black/70 max-w-2xl mx-auto">
                    Every ticket on En Passant is capped at face value. Here's how we enforce it:
                </p>
            </motion.div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Connector line (desktop only) */}
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-black/20 z-0" />
                        )}

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Step number circle */}
                            <div
                                className="w-24 h-24 rounded-full bg-pink-500 border-4 border-black flex items-center justify-center mb-4"
                                style={{ boxShadow: '4px 4px 0px #000' }}
                            >
                                <step.icon className="w-10 h-10 text-white" />
                            </div>

                            <div className="text-2xl font-black text-black mb-1">
                                {index + 1}
                            </div>

                            <h3 className="text-xl font-bold text-black mb-2">
                                {step.title}
                            </h3>

                            <p className="text-black/70 text-sm">
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FAQ Section */}
            {showFAQ && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3
                        className="text-2xl font-black text-black text-center mb-6"
                        style={{ textShadow: '2px 2px 0px #89CFF0' }}
                    >
                        FREQUENTLY ASKED QUESTIONS
                    </h3>
                    <FaceValueFAQ />
                </motion.div>
            )}
        </div>
    );
}
