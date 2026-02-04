import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, DollarSign } from 'lucide-react';

export default function PriceValidator({
    value,
    onChange,
    maxPriceCents,
    faceValueCents,
    disabled = false,
    placeholder = 'Enter price',
    className = ''
}) {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Sync external value
    useEffect(() => {
        if (value !== undefined && value !== null) {
            setInputValue((value / 100).toFixed(2));
        }
    }, [value]);

    // Calculate the effective max price
    const effectiveMaxCents = faceValueCents || maxPriceCents;

    // Determine validation state
    const currentCents = Math.round(parseFloat(inputValue || 0) * 100);
    const isValid = effectiveMaxCents ? currentCents <= effectiveMaxCents : true;
    const isBelowFaceValue = effectiveMaxCents && currentCents < effectiveMaxCents;
    const isEmpty = !inputValue || parseFloat(inputValue) === 0;

    const handleChange = (e) => {
        const raw = e.target.value.replace(/[^\d.]/g, '');

        // Only allow one decimal point
        const parts = raw.split('.');
        let cleaned = parts[0];
        if (parts.length > 1) {
            cleaned += '.' + parts[1].slice(0, 2);
        }

        setInputValue(cleaned);

        // Convert to cents and call onChange
        const cents = Math.round(parseFloat(cleaned || 0) * 100);
        if (onChange) {
            onChange(cents);
        }
    };

    const formatMaxPrice = () => {
        if (!effectiveMaxCents) return null;
        return `$${(effectiveMaxCents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
    };

    const percentOfMax = effectiveMaxCents
        ? Math.min(Math.round((currentCents / effectiveMaxCents) * 100), 150)
        : 0;

    return (
        <div className={className}>
            <div className="relative">
                {/* Dollar sign */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50">
                    <DollarSign className="w-5 h-5" />
                </div>

                {/* Input */}
                <input
                    type="text"
                    inputMode="decimal"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        w-full pl-10 pr-12 py-4 text-xl font-bold rounded-xl border-4
                        transition-all outline-none
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                        ${isEmpty
                            ? 'border-black/20'
                            : isValid
                                ? 'border-green-500'
                                : 'border-red-500'
                        }
                    `}
                    style={{
                        boxShadow: isFocused ? '4px 4px 0px #000' : '2px 2px 0px #00000040'
                    }}
                />

                {/* Validation icon */}
                {!isEmpty && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {isValid ? (
                            <Check className="w-6 h-6 text-green-500" />
                        ) : (
                            <X className="w-6 h-6 text-red-500" />
                        )}
                    </div>
                )}
            </div>

            {/* Price bar visualization */}
            {effectiveMaxCents && !isEmpty && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3"
                >
                    <div className="flex justify-between text-xs text-black/50 mb-1">
                        <span>$0</span>
                        <span>Face Value: {formatMaxPrice()}</span>
                    </div>
                    <div className="h-3 bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentOfMax, 100)}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                        {!isValid && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentOfMax - 100}%` }}
                                className="h-full bg-red-500/30 -mt-3 ml-[100%]"
                            />
                        )}
                    </div>
                </motion.div>
            )}

            {/* Validation messages */}
            <AnimatePresence mode="wait">
                {!isEmpty && (
                    <motion.div
                        key={isValid ? 'valid' : 'invalid'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3"
                    >
                        {isValid ? (
                            isBelowFaceValue ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Below face value! Buyers love this.
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        At face value. Good to go!
                                    </span>
                                </div>
                            )
                        ) : (
                            <div className="flex items-center gap-2 text-red-600">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    Price exceeds face value ({formatMaxPrice()} max)
                                </span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Max price hint when no input */}
            {isEmpty && effectiveMaxCents && (
                <p className="mt-2 text-sm text-black/50">
                    Maximum allowed: {formatMaxPrice()}
                </p>
            )}
        </div>
    );
}
