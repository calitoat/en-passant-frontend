import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function Terms() {
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
                    <h1 className="text-3xl font-bold">Terms of Service</h1>
                </div>

                <div className="prose prose-invert prose-slate max-w-none">
                    <p className="text-slate-400">Last updated: January 26, 2025</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>By using En Passant, you agree to these Terms of Service. If you do not agree, do not use our services.</p>

                    <h2>2. Description of Service</h2>
                    <p>En Passant provides identity verification services for AI agents. We:</p>
                    <ul>
                        <li>Allow you to connect identity providers (Gmail, LinkedIn)</li>
                        <li>Calculate a EP Score based on your connected accounts</li>
                        <li>Generate cryptographically signed Pawn Passes</li>
                        <li>Enable platforms to verify your badges</li>
                    </ul>

                    <h2>3. Account Responsibilities</h2>
                    <ul>
                        <li>You must provide accurate information</li>
                        <li>You are responsible for maintaining account security</li>
                        <li>You must not share your badges fraudulently</li>
                        <li>You must not attempt to manipulate your EP Score</li>
                    </ul>

                    <h2>4. EP Score</h2>
                    <p>Your EP Score is calculated based on:</p>
                    <ul>
                        <li>Having an En Passant account (base score)</li>
                        <li>Connected identity providers</li>
                        <li>Account age and activity patterns</li>
                    </ul>
                    <p>We do not guarantee any specific score. Scores may change as we improve our algorithms.</p>

                    <h2>5. Pawn Passes</h2>
                    <ul>
                        <li>Pawn Passes are cryptographically signed and cannot be forged</li>
                        <li>Passes expire after 7 days by default</li>
                        <li>You can revoke passes at any time</li>
                        <li>Platforms may reject passes at their discretion</li>
                    </ul>

                    <h2>6. Prohibited Uses</h2>
                    <p>You may not:</p>
                    <ul>
                        <li>Use En Passant for illegal activities</li>
                        <li>Attempt to bypass security measures</li>
                        <li>Create multiple accounts to inflate EP scores</li>
                        <li>Resell or transfer Pawn Passes</li>
                        <li>Reverse engineer our systems</li>
                    </ul>

                    <h2>7. Intellectual Property</h2>
                    <p>En Passant and its technology are protected by intellectual property laws. You may not copy, modify, or distribute our software.</p>

                    <h2>8. Disclaimer of Warranties</h2>
                    <p>En Passant is provided "as is" without warranties of any kind. We do not guarantee:</p>
                    <ul>
                        <li>Uninterrupted service</li>
                        <li>Accuracy of EP Scores</li>
                        <li>Acceptance of Pawn Passes by third parties</li>
                    </ul>

                    <h2>9. Limitation of Liability</h2>
                    <p>En Passant is not liable for any indirect, incidental, or consequential damages arising from use of our services.</p>

                    <h2>10. Termination</h2>
                    <p>We may terminate your account if you violate these terms. You may delete your account at any time.</p>

                    <h2>11. Changes to Terms</h2>
                    <p>We may update these terms. Continued use after changes constitutes acceptance.</p>

                    <h2>12. Contact</h2>
                    <p>For questions about these terms, contact: legal@enpassant.io</p>

                    <h2>13. Governing Law</h2>
                    <p>These terms are governed by the laws of the State of Delaware, USA.</p>
                </div>
            </div>
        </div>
    );
}
