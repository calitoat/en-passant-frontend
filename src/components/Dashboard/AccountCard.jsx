import { motion } from 'framer-motion';
import { Mail, Linkedin, Plus, Check, ExternalLink } from 'lucide-react';
import { Button } from '../ui';

const providers = {
    gmail: {
        name: 'Gmail',
        icon: Mail,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
    },
    linkedin: {
        name: 'LinkedIn',
        icon: Linkedin,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
    },
};

export default function AccountCard({
    provider,
    connected,
    data,
    onConnect,
    onDisconnect,
    loading,
}) {
    const config = providers[provider];
    if (!config) return null;

    const Icon = config.icon;

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        const years = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365));
        return `${years} year${years !== 1 ? 's' : ''} old`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -2 }}
            className={`card transition-all duration-300 ${connected ? 'border-white/20' : 'border-dashed'}`}
        >
            <div className="flex items-start justify-between">
                {/* Icon and info */}
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            {config.name}
                            {connected && <Check className="w-4 h-4 text-success" />}
                        </h3>
                        {connected ? (
                            <div className="mt-1 space-y-1">
                                <p className="text-sm text-slate-400">{data?.email_address || data?.email || 'Connected'}</p>
                                {data?.account_created_at && (
                                    <p className="text-xs text-slate-500">
                                        {formatDate(data.account_created_at)}
                                    </p>
                                )}
                                {data?.connection_count && (
                                    <p className="text-xs text-slate-500">
                                        {data.connection_count} connections
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 mt-1">Not connected</p>
                        )}
                    </div>
                </div>

                {/* Action button */}
                {connected ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onDisconnect}
                        disabled={loading}
                    >
                        Disconnect
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onConnect}
                        disabled={loading}
                        className="group"
                    >
                        <Plus className="w-4 h-4 mr-1 group-hover:rotate-90 transition-transform" />
                        Connect
                    </Button>
                )}
            </div>
        </motion.div>
    );
}
