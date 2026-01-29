import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui';

export default function AuthError() {
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message') || 'An authentication error occurred';

    return (
        <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-surface-500/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-danger/20 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-danger" />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">
                        Authentication Failed
                    </h1>

                    <p className="text-slate-400 mb-6">
                        {decodeURIComponent(message)}
                    </p>

                    <div className="space-y-3">
                        <Link to="/dashboard">
                            <Button className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Return to Dashboard
                            </Button>
                        </Link>

                        <p className="text-sm text-slate-500">
                            You can try connecting your account again from the dashboard.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
