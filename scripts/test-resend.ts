import { Resend } from 'resend';

// Load env vars explicitly if needed, but dotenv/config should handle it if called correctly
// Since we are running with tsx, we might need to rely on process.env being populated by the caller or dotenv
// Let's assume the user runs this with `npx tsx -r dotenv/config scripts/test-resend.ts` or similar
// Or we can manually load it to be safe since we are in a script folder

import fs from 'fs';
import path from 'path';

// Read .env manually to be 100% sure we get the key for this test
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envConfig = Object.fromEntries(
    envContent.split('\n').filter(Boolean).map(line => {
        const [key, ...values] = line.split('=');
        return [key.trim(), values.join('=').trim().replace(/"/g, '')];
    })
);

const apiKey = envConfig['RESEND_API_KEY'] || process.env.RESEND_API_KEY;

console.log('🔵 Testing Resend API Key...');
console.log('🔑 Key found:', apiKey ? `${apiKey.substring(0, 5)}...` : '❌ MISSING');

if (!apiKey) {
    console.error('❌ No API key found in .env');
    process.exit(1);
}

const resend = new Resend(apiKey);

async function sendTest() {
    try {
        console.log('📧 Sending test email to onboarding@resend.dev...');
        const { data, error } = await resend.emails.send({
            from: 'USA Loan Hub <onboarding@resend.dev>',
            to: ['delivered@resend.dev'], // Use Resend's test address which always succeeds if key is valid
            subject: 'Test Email from USA Loan Hub',
            html: '<p>This is a verification email to confirm your API key works!</p>',
        });

        if (error) {
            console.error('❌ Resend Error:', error);
        } else {
            console.log('✅ Success! Email sent.');
            console.log('📝 ID:', data?.id);
        }
    } catch (err) {
        console.error('❌ Exception:', err);
    }
}

sendTest();
