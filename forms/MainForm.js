const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



router.post('/submit-form', async (req, res) => {
    const { name, email, phone, agreed } = req.body;
    const isagreed = agreed === 'on' ? 'Yes' : 'No';

    

    const mailOptions = {
        from: 'info@ramadpay.com',
        to: 'info@ramadpay.com',
        subject: 'New Form Submission',
        text: `New Form Submission Details:
  
        Name: ${name || 'Not provided'}
        Email: ${email || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        User agree to receive SMS from Ramad Pay: ${agreed}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).json({ error: 'Error sending email' });
    }
});

module.exports = router;