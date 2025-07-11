// File: email-server/index.js

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Izinkan request dari domain lain (frontend Vite-mu)
app.use(express.json()); // Izinkan server menerima data JSON

// Test route
app.get('/', (req, res) => {
  res.send('Email server is running!');
});

// API endpoint untuk mengirim email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body; // Ambil data dari body request

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['azka.abdillah@outlook.co.id'],
      subject: `New Message: ${subject}`,
      reply_to: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});