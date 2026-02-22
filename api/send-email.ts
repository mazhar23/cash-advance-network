export const config = {
    runtime: 'edge', // Use Edge runtime for speed and to avoid Node.js timeouts
};

export default async function handler(request: Request) {
    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    try {
        const { email, name, accessUrl } = await request.json();
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            return new Response(JSON.stringify({ error: 'RESEND_API_KEY is missing' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: 'Cash Advance Network <support@cashadvancenetwork.com>',
                to: [email],
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
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Resend API error:', data);
            return new Response(JSON.stringify({ error: data.message || 'Failed to send email' }), {
                status: res.status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (err: any) {
        console.error('Error sending email:', err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
}

