import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const envoyerMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USERNAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("L'email a été envoyé.");
  } catch (erreur) {
    console.log("L'email n'a pas été envoyé.", erreur);
    return Error("Erreur interne.");
  }
};

export default envoyerMail;
