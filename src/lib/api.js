/**
 * API Client
 *
 * Centralized API communication with error handling and auth.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            // Handle 401 Unauthorized
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
            throw new ApiError(data.message || 'Request failed', response.status, data);
        }

        return data;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(err.message || 'Network error', 0, null);
    }
}

// Auth endpoints
export const auth = {
    register: (email, password) =>
        request('/api/auth/register', {
            method: 'POST',
            body: { email, password },
        }),

    login: (email, password) =>
        request('/api/auth/login', {
            method: 'POST',
            body: { email, password },
        }),

    // Get Google OAuth URL with token
    getGoogleAuthUrl: (token) =>
        `${API_URL}/api/auth/google?token=${encodeURIComponent(token)}`,

    // Link pending OAuth after login (when user started OAuth before logging in)
    linkPendingOAuth: () =>
        request('/api/auth/google/link', {
            method: 'POST',
        }),

    // Get LinkedIn OAuth URL with token
    getLinkedInAuthUrl: (token) =>
        `${API_URL}/api/auth/linkedin?token=${encodeURIComponent(token)}`,

    // Link pending LinkedIn OAuth after login
    linkPendingLinkedInOAuth: () =>
        request('/api/auth/linkedin/link', {
            method: 'POST',
        }),
};

// User endpoints
export const user = {
    getMe: () => request('/api/user/me'),

    getScore: () => request('/api/user/score'),
};

// Identity endpoints
export const identity = {
    getAnchors: () => request('/api/identity/anchors'),

    connectMock: (provider, options = {}) =>
        request(`/api/identity/mock/${provider}`, {
            method: 'POST',
            body: options,
        }),

    disconnect: (provider) =>
        request(`/api/identity/${provider}`, {
            method: 'DELETE',
        }),
};

// Badge endpoints
export const badges = {
    list: () => request('/api/badges'),

    generate: () =>
        request('/api/badges/generate', {
            method: 'POST',
        }),

    verify: (badgeToken, payload, signature) =>
        request('/api/badges/verify', {
            method: 'POST',
            body: { badge_token: badgeToken, payload, signature },
        }),

    revoke: (badgeToken, reason = '') =>
        request('/api/badges/revoke', {
            method: 'POST',
            body: { badge_token: badgeToken, reason },
        }),

    getPublicKey: () => request('/api/badges/public-key'),
};

// Health check
export const health = () => request('/api/health');

export default {
    auth,
    user,
    identity,
    badges,
    health,
    ApiError,
};
