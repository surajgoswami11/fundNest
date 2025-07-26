const nodemailer = require("nodemailer");

//
const sendMail = async (data) => {
  const transporter = nodemailer.transporter({
    service: "Gmail",

    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOption = {
    from: process.env.SMTP_EMAIL,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  await transporter.transporter(mailOption);
};

module.exports = { sendMail };
