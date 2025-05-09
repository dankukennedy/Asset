import nodemailer from 'nodemailer';

// Node Mailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail's SMTP server
    port: 465, // Port for secure SMTP
    secure: true, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true, // Enable logging
    debug: true, // Enable debugging
});

export default transporter