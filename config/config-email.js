const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "api.test.mazurok@meta.ua",
    pass: process.env.TEST_EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

module.exports = transporter;
