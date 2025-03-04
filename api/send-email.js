import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message, recipient, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message || !recipient) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kathmandu' // Nepal timezone
    });

    // Configure email transporter
    // Note: In production, you should use environment variables for these credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // replace with your email in production
        pass: process.env.EMAIL_PASS || 'your-app-password' // replace with your app password in production
      }
    });

    // Format email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: recipient,
      subject: subject || 'New Contact Form Submission',
      html: emailContent,
      replyTo: email // Allow direct reply to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}