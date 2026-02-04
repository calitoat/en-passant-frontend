/**
 * Access Gate Component
 *
 * Wraps the entire app to enforce invite-only beta access.
 * Exempt paths (login, register, join, etc.) pass through.
 * All other pages show blurred content with BetaOverlay on top.
 */

import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import BetaOverlay from './BetaOverlay';

const EXEMPT_PATHS = ['/login', '/register', '/join', '/auth/error', '/privacy', '/terms'];

export default function AccessGate({ children }) {
    const { betaAccess, fetchBetaStatus, isAuthenticated, isLoading } = useAuthStore();
    const [checking, setChecking] = useState(true);
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const codeFromUrl = searchParams.get('code') || searchParams.get('invite');

    const isExempt =
        EXEMPT_PATHS.some(p => location.pathname === p || location.pathname.startsWith(p + '/')) ||
        location.pathname.startsWith('/verify/');

    useEffect(() => {
        const checkAccess = async () => {
            const storedAccess = localStorage.getItem('ep_beta_access');

            if (isAuthenticated) {
                await fetchBetaStatus();
            }
            setChecking(false);
        };

        if (!isLoading) {
            checkAccess();
        }
    }, [isAuthenticated, isLoading, fetchBetaStatus]);

    // Still initializing auth or checking beta status
    if (isLoading || checking) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Exempt paths always pass through
    if (isExempt) {
        return children;
    }

    // User has beta access
    const hasAccess =
        betaAccess?.hasBetaAccess === true ||
        localStorage.getItem('ep_beta_access') === 'true';

    if (hasAccess) {
        return children;
    }

    // No access - show blurred content with overlay
    return (
        <>
            <div className="blur-sm pointer-events-none select-none">
                {children}
            </div>
            <BetaOverlay
                initialCode={codeFromUrl || ''}
                onAccessGranted={() => {
                    localStorage.setItem('ep_beta_access', 'true');
                    window.location.reload();
                }}
            />
        </>
    );
}
