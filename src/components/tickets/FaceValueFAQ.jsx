import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "What counts as face value?",
        answer: "Face value is the original price printed on the ticket when purchased from the primary seller (Ticketmaster, AXS, venue box office, etc.). This does NOT include resale prices. Service fees from the original purchase are not included in face value calculations."
    },
    {
        question: "How do you verify face value?",
        answer: "We use three methods: 1) Receipt upload with OCR extraction to read the exact price you paid, 2) Section-based price ceilings using official face values from the primary seller, and 3) Manual review for edge cases. All listings are verified before going live."
    },
    {
        question: "What if OCR can't read my receipt?",
        answer: "If our OCR system can't confidently extract the price, your listing will be reviewed against our section price ceilings. If your price is at or below the ceiling for your section, it will be approved. Otherwise, it goes to manual review."
    },
    {
        question: "Can I sell below face value?",
        answer: "Absolutely! You can list tickets for any price at or below face value. Many sellers choose to list below face value to sell quickly. Listings below face value are highlighted with a \"Below Face Value\" badge."
    },
    {
        question: "What happens if I try to list above face value?",
        answer: "Your listing will be rejected. En Passant has a strict face value cap - no exceptions. This protects buyers from scalper markups and ensures tickets are accessible to real fans."
    },
    {
        question: "Why the 2-ticket limit per event?",
        answer: "The limit prevents hoarding and scalping. Real fans typically buy 1-2 tickets. If you need to resell more tickets (group plans changed, etc.), contact support for case-by-case review."
    }
];

export default function FaceValueFAQ({ className = '' }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className={`space-y-3 ${className}`}>
            {faqs.map((faq, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-4 border-black bg-white overflow-hidden"
                    style={{ boxShadow: '4px 4px 0px #000' }}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-black pr-4">{faq.question}</span>
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5 text-black flex-shrink-0" />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="px-5 pb-4 text-black/70 border-t-2 border-black/10 pt-4">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}
