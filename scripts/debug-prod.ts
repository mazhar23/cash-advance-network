const url = 'https://usa-loan-hub-main.vercel.app/api/send-email';

async function testProd() {
    console.log(`🔵 Testing production API: ${url}`);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}) // Empty body to trigger error or validation
        });

        console.log(`Resource Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log('--- Response Start ---');
        console.log(text.substring(0, 500));
        console.log('--- Response End ---');

        if (text.trim().startsWith('<')) {
            console.log('❌ FAIL: Response looks like HTML (SPA Routing issue)');
        } else {
            console.log('✅ SUCCESS: Response looks like JSON/Text (API is reachable)');
        }

    } catch (err) {
        console.error('❌ Network Error:', err);
    }
}

testProd();
