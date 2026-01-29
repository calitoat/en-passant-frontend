import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AuthLayout from '../components/Auth/AuthLayout';
import { Button, Input } from '../components/ui';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

const schema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

export default function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login, isLoading } = useAuthStore();
    const [error, setError] = useState('');
    const [pendingOAuth, setPendingOAuth] = useState(null);

    // Check for pending OAuth from query param
    useEffect(() => {
        const oauthParam = searchParams.get('oauth');
        if (oauthParam === 'pending' || oauthParam === 'pending-gmail') {
            setPendingOAuth('gmail');
            // Clear the URL param
            window.history.replaceState({}, '', '/login');
        } else if (oauthParam === 'pending-linkedin') {
            setPendingOAuth('linkedin');
            // Clear the URL param
            window.history.replaceState({}, '', '/login');
        }
    }, [searchParams]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setError('');
        try {
            await login(data.email, data.password);

            // If there was pending OAuth, try to link it
            if (pendingOAuth) {
                try {
                    if (pendingOAuth === 'gmail') {
                        await api.auth.linkPendingOAuth();
                        toast.success('Gmail connected successfully! +30 EP points');
                    } else if (pendingOAuth === 'linkedin') {
                        await api.auth.linkPendingLinkedInOAuth();
                        toast.success('LinkedIn connected successfully! +40 EP points');
                    }
                } catch (linkErr) {
                    // OAuth link failed, but login succeeded - just continue
                    console.warn('Failed to link pending OAuth:', linkErr);
                }
            }

            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Invalid email or password');
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your En Passant account"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {pendingOAuth && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm"
                    >
                        Sign in to complete your {pendingOAuth === 'gmail' ? 'Gmail' : 'LinkedIn'} connection.
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
