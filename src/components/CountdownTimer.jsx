import { useState, useEffect } from 'react';

export default function CountdownTimer({
    targetDate = "2026-02-08T19:00:00-08:00",
    onComplete,
    size = "large",
    theme = "dark"
}) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: false
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const target = new Date(targetDate).getTime();
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isComplete: true
                });
                if (onComplete) onComplete();
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                isComplete: false
            });
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [targetDate, onComplete]);

    const sizeClasses = {
        small: "text-2xl",
        medium: "text-4xl",
        large: "text-5xl md:text-7xl"
    };

    const labelSizeClasses = {
        small: "text-xs",
        medium: "text-sm",
        large: "text-xs md:text-sm"
    };

    const isDark = theme === 'dark';
    const containerClasses = isDark
        ? 'bg-gray-900/90 text-white border border-white/10'
        : 'bg-white/90 text-gray-900 border border-gray-200 shadow-xl';

    if (timeLeft.isComplete) {
        return (
            <div className={`${containerClasses} rounded-2xl p-8 text-center backdrop-blur-sm`}>
                <div className="text-4xl md:text-6xl font-bold text-green-500 mb-4">
                    WE'RE LIVE!
                </div>
                <p className={`text-xl md:text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    The bot-free internet is here.
                </p>
            </div>
        );
    }

    return (
        <div className={`${containerClasses} rounded-2xl p-6 md:p-8 backdrop-blur-sm`}>
            <div className="text-center mb-6">
                <h3 className={`text-base md:text-xl font-bold mb-1 tracking-wide ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                    THE BOT-FREE INTERNET LAUNCHES IN
                </h3>
            </div>

            <div className="grid grid-cols-4 gap-2 md:gap-4">
                {[
                    { value: timeLeft.days, label: 'DAYS' },
                    { value: timeLeft.hours, label: 'HOURS' },
                    { value: timeLeft.minutes, label: 'MINS' },
                    { value: timeLeft.seconds, label: 'SECS' }
                ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                        <div className={`${sizeClasses[size]} font-bold font-mono tracking-tight ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                            {String(value).padStart(2, '0')}
                        </div>
                        <div className={`${labelSizeClasses[size]} mt-1 font-semibold tracking-wider ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            <div className={`text-center mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                February 8, 2026 • 7:00 PM PST • Super Bowl Sunday
            </div>
        </div>
    );
}
