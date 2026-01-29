import { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`
                    w-full px-4 py-3 bg-surface-500/50 border rounded-lg
                    text-slate-200 placeholder-slate-500 transition-all duration-200
                    focus:outline-none focus:ring-1
                    ${error
                        ? 'border-danger focus:border-danger focus:ring-danger'
                        : 'border-white/10 focus:border-primary-500 focus:ring-primary-500'
                    }
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="mt-2 text-sm text-danger">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
