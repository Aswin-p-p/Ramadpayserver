const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
        user: 'info@ramadpay.com',
        pass: 'konmsthsbmrutfws'
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to avoid name collisions
  }
});

const upload = multer({ storage: storage });

// POST route for form submission
router.post('/submit-career-form', upload.single('resume'), async (req, res) => {
  const { name, email, phone } = req.body;
  const resumePath = req.file ? req.file.path : null; // File path for attachment

  const mailOptions = {
    from: 'info@ramadpay.com',
    to: 'info@ramadpay.com',
    subject: 'New Career Form Submission',
    text: `Career Form Submission Details:\n\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\nPhone: ${phone || 'Not provided'}`,
    attachments: resumePath
      ? [
          {
            filename: path.basename(resumePath),
            path: resumePath,
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Career form submitted and email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;
