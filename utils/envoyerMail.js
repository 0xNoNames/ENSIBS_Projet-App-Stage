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
      html: text + '<img style="height:100px" src="cid:unique@ensibs-logo"/>',
      attachments: [{
        filename: 'logo-ensibs.png',
        path: global.__basedir +'/frontend/assets/img/logo-ensibs.png',
        cid: 'unique@ensibs-logo' 
   }]
    });
    console.log("L'email a été envoyé.");
  } catch (erreur) {
    console.log("L'email n'a pas été envoyé.", erreur);
    return Error("Erreur interne.");
  }
};

export default envoyerMail;