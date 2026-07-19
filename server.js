import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Set up a generic SMTP transporter for nodemailer
// You can provide credentials via .env file:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER || 'user',
    pass: process.env.SMTP_PASS || 'pass',
  },
});

// API Routes
app.post('/api/contact', async (req, res) => {
  const { fullName, email, estimatedBudget, messageBody } = req.body;

  // Basic validation
  if (!fullName || !email || !messageBody) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('Received new contact submission:');
  console.log(`- Name: ${fullName}`);
  console.log(`- Email: ${email}`);
  console.log(`- Budget: ${estimatedBudget}`);
  console.log(`- Message: ${messageBody}`);

  try {
    // If SMTP credentials are not configured, we'll just log and return success
    // to simulate the backend working perfectly without throwing errors.
    if (!process.env.SMTP_USER) {
      console.log('Simulating email send (SMTP credentials not fully configured yet).');
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.status(200).json({ success: true, message: 'Message logged locally' });
    }

    // Send actual email if configured
    await transporter.sendMail({
      from: `"Deemvmedia Contact" <no-reply@deemvmedia.com>`,
      to: 'ceo@deemvmedia.com',
      subject: `New Project Inquiry from ${fullName}`,
      text: `
Name: ${fullName}
Email: ${email}
Budget: ${estimatedBudget}
Message:
${messageBody}
      `,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Deemvmedia API Server running on http://localhost:${PORT}`);
});
