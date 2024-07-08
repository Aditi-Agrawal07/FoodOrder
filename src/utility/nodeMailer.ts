import 'dotenv/config'; // Ensure environment variables are loaded

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export const sendCodeMail = async (to, code) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: to,
    subject: 'code',
    html: `This is the verification code ${code}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return error;
  }
};
