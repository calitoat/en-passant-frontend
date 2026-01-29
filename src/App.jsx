import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import useAuthStore from './store/useAuthStore';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AuthError from './pages/AuthError';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ApartmentsLanding from './pages/ApartmentsLanding';
import JobsLanding from './pages/JobsLanding';
import FreelanceLanding from './pages/FreelanceLanding';
import DatingLanding from './pages/DatingLanding';
import TicketsLanding from './pages/TicketsLanding';
import AgentsLanding from './pages/AgentsLanding';
import VerticalsHub from './pages/VerticalsHub';

// Protected route wrapper
function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Public route wrapper (redirect if authenticated)
function PublicRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default function App() {
    const { initialize } = useAuthStore();

    // Initialize auth on app load
    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <BrowserRouter>
            {/* Toast notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#2d2d2d',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        color: '#f5f5dc',
                    },
                }}
            />

            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Vertical landing pages */}
                <Route path="/apartments" element={<ApartmentsLanding />} />
                <Route path="/jobs" element={<JobsLanding />} />
                <Route path="/freelance" element={<FreelanceLanding />} />
                <Route path="/dating" element={<DatingLanding />} />
                <Route path="/tickets" element={<TicketsLanding />} />
                <Route path="/agents" element={<AgentsLanding />} />

                {/* Auth error route */}
                <Route path="/auth/error" element={<AuthError />} />

                {/* Legal pages */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/verticals"
                    element={
                        <ProtectedRoute>
                            <VerticalsHub />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
