import { useState, useEffect } from 'react';
import { Shield, Ban, Users } from 'lucide-react';

export default function BotDefenseSignal({
    initialVerifiedHumans = 2500,
    initialBotsBlocked = 20000,
    realtime = true
}) {
    const [verifiedHumans, setVerifiedHumans] = useState(initialVerifiedHumans);
    const [botsBlocked, setBotsBlocked] = useState(initialBotsBlocked);
    const [lastBlocked, setLastBlocked] = useState('just now');
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        if (!realtime) return;

        // Increment bots blocked every 3-8 seconds
        const blockInterval = setInterval(() => {
            const increment = Math.floor(Math.random() * 7) + 1;
            setBotsBlocked(prev => prev + increment);
            setPulse(true);
            setTimeout(() => setPulse(false), 600);

            // Update "last blocked" timestamp
            const seconds = Math.floor(Math.random() * 5) + 1;
            setLastBlocked(`${seconds}s ago`);
        }, Math.random() * 5000 + 3000);

        // Increment verified humans occasionally
        const humanInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                setVerifiedHumans(prev => prev + 1);
            }
        }, 12000);

        return () => {
            clearInterval(blockInterval);
            clearInterval(humanInterval);
        };
    }, [realtime]);

    return (
        <div className="bg-gradient-to-br from-purple-900/90 via-gray-900/95 to-black text-white rounded-2xl p-5 md:p-6 shadow-2xl border border-purple-500/30 backdrop-blur-sm">
            <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm md:text-base font-bold text-purple-300 uppercase tracking-wider">
                        Global Bot Defense Status
                    </h3>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Verified Humans */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Verified Humans</div>
                            <div className="text-2xl md:text-3xl font-bold text-green-400 font-mono">
                                {verifiedHumans.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bots Blocked */}
                <div className={`bg-red-500/10 border border-red-500/30 rounded-xl p-4 transition-all duration-300 ${
                    pulse ? 'ring-2 ring-red-500 scale-[1.02]' : ''
                }`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500 rounded-full p-2 relative flex-shrink-0">
                            {pulse && (
                                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                            )}
                            <Ban className="w-5 h-5 text-white relative z-10" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Bots Blocked</div>
                            <div className="text-2xl md:text-3xl font-bold text-red-400 font-mono">
                                {botsBlocked.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Last Blocked Timestamp */}
            <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Last blocked: <span className="text-red-400 font-semibold">{lastBlocked}</span></span>
                </div>
            </div>
        </div>
    );
}
