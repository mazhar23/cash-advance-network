import nodemailer from 'nodemailer';

const testNodemailer = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "willsmiths987@gmail.com",
                pass: "yskjsyutgpfousiu",
            },
        });

        console.log('Sending email...');
        const info = await transporter.sendMail({
            from: '"Test" <willsmiths987@gmail.com>',
            to: "willsmiths987@gmail.com",
            subject: "Test from local",
            text: "Hello from local Nodemailer!",
        });

        console.log('Success!', info.messageId);
    } catch (e) {
        console.error('Nodemailer error:', e);
    }
};

testNodemailer();
