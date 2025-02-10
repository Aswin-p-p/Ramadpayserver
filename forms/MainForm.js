const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ramadpayagent@gmail.com',
        pass: 'txdkpkoduqhnstcd' // Use environment variables for security in production
    }
});



router.post('/submit-form', async (req, res) => {
    const { name, email, phone, agreed } = req.body;
    const isagreed = agreed === 'on' ? 'Yes' : 'No';
    console.log(agreed);
    

    const mailOptions = {
        from: 'ramadpayagent@gmail.com',
        to: 'ramadpayagent@gmail.com',
        subject: 'New Form Submission',
        text: `New Form Submission Details:
  
        Name: ${name || 'Not provided'}
        Email: ${email || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        Checkbox Selected: ${agreed}`,
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