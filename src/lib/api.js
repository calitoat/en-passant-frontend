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
    register: (email, password, inviteCode = null) =>
        request('/api/auth/register', {
            method: 'POST',
            body: { email, password, ...(inviteCode && { inviteCode }) },
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

// Receipts endpoints
export const receipts = {
    upload: (formData) =>
        fetch(`${API_URL}/api/receipts/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new ApiError(data.message || 'Upload failed', res.status, data);
            return data;
        }),

    get: (id) => request(`/api/receipts/${id}`),

    verify: (id) =>
        request(`/api/receipts/${id}/verify`, {
            method: 'POST',
        }),

    list: () => request('/api/receipts'),
};

// Listings endpoints
export const listings = {
    create: (data) =>
        request('/api/listings', {
            method: 'POST',
            body: data,
        }),

    list: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.eventId) params.set('eventId', filters.eventId);
        if (filters.section) params.set('section', filters.section);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.verifiedOnly !== undefined) params.set('verifiedOnly', filters.verifiedOnly);
        if (filters.limit) params.set('limit', filters.limit);
        if (filters.offset) params.set('offset', filters.offset);
        if (filters.sortBy) params.set('sortBy', filters.sortBy);
        if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
        const query = params.toString();
        return request(`/api/listings${query ? `?${query}` : ''}`);
    },

    get: (id) => request(`/api/listings/${id}`),

    my: () => request('/api/listings/my'),

    update: (id, data) =>
        request(`/api/listings/${id}`, {
            method: 'PUT',
            body: data,
        }),

    flag: (id, reason, description) =>
        request(`/api/listings/${id}/flag`, {
            method: 'POST',
            body: { reason, description },
        }),

    markAsSold: (id) =>
        request(`/api/listings/${id}/sold`, {
            method: 'POST',
        }),
};

// Events endpoints
export const events = {
    list: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.upcoming !== undefined) params.set('upcoming', filters.upcoming);
        if (filters.limit) params.set('limit', filters.limit);
        if (filters.offset) params.set('offset', filters.offset);
        const query = params.toString();
        return request(`/api/events${query ? `?${query}` : ''}`);
    },

    get: (id) => request(`/api/events/${id}`),

    search: (query, limit = 10) =>
        request(`/api/events/search?q=${encodeURIComponent(query)}&limit=${limit}`),

    getCeilings: (id) => request(`/api/events/${id}/ceilings`),
};

// Invites endpoints
export const invites = {
    validate: (code) =>
        request('/api/invites/validate', {
            method: 'POST',
            body: { code },
        }),

    redeem: (code) =>
        request('/api/invites/redeem', {
            method: 'POST',
            body: { code },
        }),

    getMyCodes: () => request('/api/invites/my-codes'),

    getBetaStatus: () => request('/api/invites/beta-status'),
};

export default {
    auth,
    user,
    identity,
    badges,
    health,
    receipts,
    listings,
    events,
    invites,
    ApiError,
};
