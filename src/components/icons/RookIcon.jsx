/**
 * Rook Icon Component
 *
 * Chess rook/fortress icon for Rank Guard branding.
 * Replaces the Pawn icon throughout the app.
 */

export default function RookIcon({ className = "w-6 h-6" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 20h14v2H5v-2zm1-2h12v-2H6v2zm1-4h10v-2H7v2zm-1-4h12V4h-2v2h-2V4h-4v2H9V4H7v6zm0-8h2v2H7V2zm4 0h2v2h-2V2zm4 0h2v2h-2V2z"/>
        </svg>
    );
}
