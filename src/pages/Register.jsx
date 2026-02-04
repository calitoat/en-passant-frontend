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

const schema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    inviteCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export default function Register() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { register: registerUser, isLoading } = useAuthStore();
    const [error, setError] = useState('');
    const [registrationSource, setRegistrationSource] = useState(null);
    const [inviteCodeFromUrl, setInviteCodeFromUrl] = useState('');

    // Capture registration source and invite code from URL
    useEffect(() => {
        const source = searchParams.get('source');
        const code = searchParams.get('code');
        if (source) {
            setRegistrationSource(source);
            console.log('[Register] Source:', source);
        }
        if (code) {
            setInviteCodeFromUrl(code.toUpperCase());
            console.log('[Register] Invite code:', code);
        }
    }, [searchParams]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            inviteCode: '',
        },
    });

    // Set invite code from URL when available
    useEffect(() => {
        if (inviteCodeFromUrl) {
            setValue('inviteCode', inviteCodeFromUrl);
        }
    }, [inviteCodeFromUrl, setValue]);

    const onSubmit = async (data) => {
        setError('');
        try {
            const result = await registerUser(data.email, data.password, data.inviteCode || null);
            if (result.betaAccess?.granted) {
                toast.success('Welcome to the En Passant beta! You have 2 invite codes to share.');
            } else {
                toast.success('Account created! You are on the waitlist.');
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to create account');
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start building trust for your AI agents"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />

                {/* Invite Code Field */}
                <div className="pt-2">
                    <Input
                        label={
                            <span className="flex items-center gap-2">
                                Invite Code
                                {inviteCodeFromUrl && (
                                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                                        Auto-filled
                                    </span>
                                )}
                                <span className="text-slate-500 font-normal">(optional)</span>
                            </span>
                        }
                        placeholder="EP-XXXXX-XXXXX"
                        error={errors.inviteCode?.message}
                        className="font-mono tracking-wider"
                        {...register('inviteCode')}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        Have an invite code? Enter it for instant beta access.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Create Account
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
