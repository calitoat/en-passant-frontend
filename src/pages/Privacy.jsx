import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#0A0D14] text-white">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                </div>

                <div className="prose prose-invert prose-slate max-w-none">
                    <p className="text-slate-400">Last updated: January 26, 2025</p>

                    <h2>1. Information We Collect</h2>
                    <p>En Passant collects the following information to provide identity verification services:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Email address and password (hashed)</li>
                        <li><strong>OAuth Data:</strong> When you connect Gmail or LinkedIn, we receive:
                            <ul>
                                <li>Your email address</li>
                                <li>Display name</li>
                                <li>Profile photo URL</li>
                                <li>Account identifiers</li>
                            </ul>
                        </li>
                        <li><strong>Gmail Metadata (Optional):</strong> Email count and oldest email date (NOT email content)</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Calculate your EP Score</li>
                        <li>Generate cryptographically signed Pawn Passes</li>
                        <li>Verify your identity to third-party platforms</li>
                        <li>Improve our services</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We share limited information only when:</p>
                    <ul>
                        <li>You generate a Pawn Pass to share with a platform (the pass contains your EP Score)</li>
                        <li>Required by law</li>
                    </ul>
                    <p>We never sell your personal information.</p>

                    <h2>4. Data Security</h2>
                    <ul>
                        <li>Passwords are hashed using Argon2</li>
                        <li>Badges are signed with Ed25519 cryptography</li>
                        <li>All data is transmitted over HTTPS</li>
                        <li>Database connections use SSL</li>
                    </ul>

                    <h2>5. Data Retention</h2>
                    <p>We retain your data as long as your account is active. You can delete your account and all associated data at any time.</p>

                    <h2>6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your data</li>
                        <li>Correct inaccurate data</li>
                        <li>Delete your account</li>
                        <li>Disconnect OAuth providers</li>
                        <li>Revoke Pawn Passes</li>
                    </ul>

                    <h2>7. Third-Party Services</h2>
                    <p>We integrate with:</p>
                    <ul>
                        <li>Google OAuth (Gmail connection)</li>
                        <li>LinkedIn OAuth (LinkedIn connection)</li>
                        <li>Neon (PostgreSQL database hosting)</li>
                    </ul>

                    <h2>8. Contact Us</h2>
                    <p>For privacy questions, contact us at: privacy@enpassant.io</p>

                    <h2>9. Changes to This Policy</h2>
                    <p>We may update this policy. We will notify you of significant changes via email.</p>
                </div>
            </div>
        </div>
    );
}
