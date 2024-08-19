import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const mailingService = async (email, firstName, otp) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Fint",
      link: "https://google.com",
    },
  });

  let response = {
    body: {
      name: firstName,
      intro: "You have successfully registered.",
      table: {
        data: [
          {
            title: "Your OTP",
            description: otp,
          },
        ],
      },
      outro: "This is an auto-generated email. Do not reply.",
    },
  };

  let mail = MailGenerator.generate(response);
  console.log(mail);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "Sign Up - Your OTP Code",
    html: mail,
  };
  await transporter.sendMail(message);
};

export const resetPassword = async (email, firstName, resetUrl) => {
  try {
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Fint",
        link: "https://google.com",
      },
    });

    let response = {
      body: {
        name: firstName,
        intro: "you have  requested a password reset",
        action: {
          instructions:
            "Please click on the button below to reset your password",
          button: {
            color: "#22BC66",
            text: "Reset your password",
            link: resetUrl,
          },
        },
        outro:
          "If you did not request a password reset, do not click on the button",
      },
    };
    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: "password reset request",
      html: mail,
    };
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail(message);
  } catch (error) {
    console.error(`error sending the mail${error.message}`);
  }
};
