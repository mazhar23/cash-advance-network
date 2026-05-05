const testEmail = async () => {
    try {
        console.log('Sending request to API...');
        const res = await fetch('https://usa-loan-hub-main.vercel.app/api/send-application-email-gmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                applicationData: {
                    firstName: "Test",
                    lastName: "User",
                    email: "willsmiths987@gmail.com",
                    phone: "1234567890",
                    loanAmount: "5000",
                    monthlyIncome: "4000"
                },
                clientEmail: "willsmiths987@gmail.com",
                recipientType: "admin",
                clientName: "Test User"
            })
        });

        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Response:', data);
    } catch (e) {
        console.error('Fetch error:', e);
    }
};

testEmail();
