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
            register: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await api.auth.register(email, password);
                    localStorage.setItem('token', data.token);
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
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
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return data;
                } catch (err) {
                    set({ error: err.message, isLoading: false });
                    throw err;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
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
                    set({
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (err) {
                    // Token invalid, clear auth
                    localStorage.removeItem('token');
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
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
