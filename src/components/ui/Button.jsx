import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-400 shadow-lg hover:shadow-glow focus:ring-primary-500',
    secondary: 'bg-surface-500 text-slate-200 border border-white/10 hover:bg-surface-400 hover:border-white/20 focus:ring-surface-400',
    danger: 'bg-danger text-white hover:bg-red-500 focus:ring-danger',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
    outline: 'border border-primary-500 text-primary-400 hover:bg-primary-500/10 focus:ring-primary-500',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className={`
                inline-flex items-center justify-center rounded-lg font-medium
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0D14]
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </>
            ) : children}
        </motion.button>
    );
});

Button.displayName = 'Button';

export default Button;
