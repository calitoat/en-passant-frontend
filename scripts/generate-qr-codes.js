/**
 * QR Code Generator for En Passant Landing Pages
 *
 * Generates QR codes for all vertical landing pages with source tracking
 * for analytics and campaign attribution.
 */

import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://enpassantapi.io';

// Verticals and their paths
const verticals = {
    tickets: '/tickets',
    apartments: '/apartments',
    jobs: '/jobs',
    dating: '/dating',
    freelance: '/freelance'
};

// Sources for tracking (campaign attribution)
const sources = [
    'poster',
    'flyer',
    'business-card',
    'billboard',
    'subway',
    'bus-shelter',
    'event-booth',
    'handout',
    'sticker',
    'postcard',
    'banner',
    'window-display',
    'table-tent',
    'receipt',
    'packaging',
    'direct-mail',
    'magazine-ad',
    'newspaper-ad',
    'radio-spot',
    'tv-spot'
];

const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');

// QR Code options
const qrOptions = {
    errorCorrectionLevel: 'H', // High error correction
    type: 'png',
    width: 512,
    margin: 2,
    color: {
        dark: '#050505',
        light: '#FFFFFF'
    }
};

async function generateQRCodes() {
    console.log('🔲 Generating QR codes for En Passant verticals...\n');

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const manifest = {
        generatedAt: new Date().toISOString(),
        baseUrl: BASE_URL,
        totalCodes: 0,
        codes: []
    };

    for (const [vertical, path] of Object.entries(verticals)) {
        console.log(`📁 Generating codes for ${vertical}...`);

        for (const source of sources) {
            const url = `${BASE_URL}${path}?source=${source}`;
            const filename = `${vertical}-${source}-qr.png`;
            const filepath = `${OUTPUT_DIR}/${filename}`;

            try {
                await QRCode.toFile(filepath, url, qrOptions);

                manifest.codes.push({
                    vertical,
                    source,
                    filename,
                    url,
                    path: `/qr-codes/${filename}`
                });

                manifest.totalCodes++;
            } catch (err) {
                console.error(`  ❌ Failed: ${filename}`, err.message);
            }
        }

        console.log(`  ✅ Generated ${sources.length} codes for ${vertical}`);
    }

    // Write manifest
    const manifestPath = path.join(OUTPUT_DIR, 'qr-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`\n✨ Complete! Generated ${manifest.totalCodes} QR codes`);
    console.log(`📄 Manifest saved to: ${manifestPath}`);

    // Print summary
    console.log('\n📊 Summary by Vertical:');
    for (const vertical of Object.keys(verticals)) {
        const count = manifest.codes.filter(c => c.vertical === vertical).length;
        console.log(`   ${vertical}: ${count} codes`);
    }
}

generateQRCodes().catch(console.error);
