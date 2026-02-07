/**
 * Auth Store
 *
 * Global authentication state management using Zustand.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            betaAccess: null, // { hasBetaAccess, invitesRemaining, inviteCodes }

            // Actions
            setUser: (user) => set({ user, isAuthenticated: !!user }),

            setToken: (token) => {
                if (token) {
                    localStorage.setItem('token', token);
                } else {
                    localStorage.removeItem('token');
                }
                set({ token });
            },

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            // Auth actions
            register: async (email, password, inviteCode = null) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await api.auth.register(email, password, inviteCode);
                    localStorage.setItem('token', data.token);

                    // If beta access was granted, set localStorage flag for AccessGate
                    if (data.betaAccess?.granted) {
                        localStorage.setItem('ep_beta_access', 'true');
                    }

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        // Normalize betaAccess to use hasBetaAccess for consistency
                        betaAccess: data.betaAccess ? {
                            hasBetaAccess: data.betaAccess.granted,
                            inviteCodes: data.betaAccess.inviteCodes,
                        } : null,
                    });
                    return data;
                } catch (err) {
                    set({ error: err.message, isLoading: false });
                    throw err;
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await api.auth.login(email, password);
                    localStorage.setItem('token', data.token);

                    // If user has beta access, set localStorage flag for AccessGate
                    if (data.user?.has_beta_access) {
                        localStorage.setItem('ep_beta_access', 'true');
                    }

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        betaAccess: data.user?.has_beta_access ? { hasBetaAccess: true } : null,
                    });
                    return data;
                } catch (err) {
                    set({ error: err.message, isLoading: false });
                    throw err;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('ep_beta_access');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
                    betaAccess: null,
                });
            },

            // Initialize auth from localStorage
            initialize: async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    set({ isAuthenticated: false, isLoading: false });
                    return;
                }

                set({ token, isLoading: true });
                try {
                    const data = await api.user.getMe();

                    // Sync beta access with localStorage
                    if (data.user?.has_beta_access) {
                        localStorage.setItem('ep_beta_access', 'true');
                    }

                    set({
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                        betaAccess: data.user?.has_beta_access ? { hasBetaAccess: true } : null,
                    });
                } catch (err) {
                    // Token invalid, clear auth
                    localStorage.removeItem('token');
                    localStorage.removeItem('ep_beta_access');
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        betaAccess: null,
                    });
                }
            },

            // Google OAuth
            connectGoogle: () => {
                const token = get().token;
                if (!token) {
                    set({ error: 'Please log in first' });
                    return;
                }
                window.location.href = api.auth.getGoogleAuthUrl(token);
            },

            // LinkedIn OAuth
            connectLinkedIn: () => {
                const token = get().token;
                if (!token) {
                    set({ error: 'Please log in first' });
                    return;
                }
                window.location.href = api.auth.getLinkedInAuthUrl(token);
            },

            // Refresh user data (useful after OAuth callbacks)
            refreshUserData: async () => {
                try {
                    const data = await api.user.getMe();
                    set({ user: data.user });
                    return data;
                } catch (err) {
                    console.error('Failed to refresh user data:', err);
                    throw err;
                }
            },

            // Beta access actions
            fetchBetaStatus: async () => {
                try {
                    const data = await api.invites.getBetaStatus();
                    set({ betaAccess: data });
                    return data;
                } catch (err) {
                    console.error('Failed to fetch beta status:', err);
                    return null;
                }
            },

            redeemInviteCode: async (code) => {
                try {
                    const data = await api.invites.redeem(code);
                    if (data.success) {
                        set({
                            betaAccess: {
                                hasBetaAccess: true,
                                inviteCodes: data.inviteCodes,
                            },
                        });
                    }
                    return data;
                } catch (err) {
                    throw err;
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
