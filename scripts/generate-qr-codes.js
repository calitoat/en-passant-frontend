/**
 * QR Code Generator for En Passant Landing Pages
 *
 * Generates QR codes linking to vertical landing pages.
 */

import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://enpassantapi.io';

// Verticals with their quantities
const verticals = [
    { name: 'tickets', path: '/tickets', count: 40 },
    { name: 'apartments', path: '/apartments', count: 30 },
    { name: 'jobs', path: '/jobs', count: 15 },
    { name: 'dating', path: '/dating', count: 10 },
    { name: 'freelance', path: '/freelance', count: 5 }
];

const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');

// QR Code options
const qrOptions = {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 512,
    margin: 2,
    color: {
        dark: '#050505',
        light: '#FFFFFF'
    }
};

async function generateQRCodes() {
    console.log('Generating QR codes for En Passant verticals...\n');

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

    for (const vertical of verticals) {
        console.log(`Generating ${vertical.count} codes for ${vertical.name}...`);

        const url = `${BASE_URL}${vertical.path}`;

        for (let i = 1; i <= vertical.count; i++) {
            const paddedNum = String(i).padStart(2, '0');
            const filename = `${vertical.name}-${paddedNum}.png`;
            const filepath = `${OUTPUT_DIR}/${filename}`;

            try {
                await QRCode.toFile(filepath, url, qrOptions);

                manifest.codes.push({
                    vertical: vertical.name,
                    number: i,
                    filename,
                    url,
                    path: `/qr-codes/${filename}`
                });

                manifest.totalCodes++;
            } catch (err) {
                console.error(`  Failed: ${filename}`, err.message);
            }
        }

        console.log(`  Done: ${vertical.count} codes`);
    }

    // Write manifest
    const manifestPath = path.join(OUTPUT_DIR, 'qr-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`\nComplete! Generated ${manifest.totalCodes} QR codes`);
    console.log(`Manifest: ${manifestPath}`);

    // Summary
    console.log('\nSummary:');
    for (const v of verticals) {
        console.log(`  ${v.name}: ${v.count} codes → ${BASE_URL}${v.path}`);
    }
}

generateQRCodes().catch(console.error);
