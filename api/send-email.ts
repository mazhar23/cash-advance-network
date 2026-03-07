import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, name, accessUrl } = req.body;

        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD;

        if (!gmailUser || !gmailPass) {
            return res.status(500).json({ error: 'Email credentials are missing' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPass,
            },
        });

        await transporter.sendMail({
            from: `"Cash Advance Network" <${gmailUser}>`,
            to: email,
            subject: 'Complete Your Loan Application',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome ${name}!</h2>
          <p>You have been invited to complete your loan application.</p>
          <p>Please click the link below to access your secure application form:</p>
          <div style="margin: 30px 0;">
            <a href="${accessUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Access Application
            </a>
          </div>
          <p>Or copy and paste this URL into your browser:</p>
          <p style="color: #666; font-size: 14px;">${accessUrl}</p>
          <p>This link will expire in a few days.</p>
        </div>
      `,
        });

        return res.status(200).json({ success: true });

    } catch (err: any) {
        console.error('Error sending email:', err);
        return res.status(500).json({ error: err.message });
    }
}
