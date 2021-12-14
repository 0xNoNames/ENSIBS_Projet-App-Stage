import envoyerMail from "../../../utils/envoyerMail.js";
import validator from "validator";

export const postContactMail = async (req, res) => {
  try {
    if (!validator.isAlpha(req.body.nom, "fr-FR", { ignore: "-." })) new Error("Le nom contient des caractères invalides");
    if (!validator.isEmail(req.body.email)) new Error("Le mail contient des caractères invalides");
    if (!validator.isAlphanumeric(req.body.message, "fr-FR", { ignore: "'`() -/,&[]@:." })) new Error("Le message contient des caractères invalides");
   } catch (erreur) {
    console.error("ERROR backend/controllers/api/contact.js #postContactMail() : " + erreur);
    return res.status(400).json(erreur.message);
  }

  try {
    await envoyerMail(
      "arthur30700@gmail.com",
      "Nouveau e-mail de la page contact",
      "Nom de l'utilisateur : " + req.body.nom + "<br><br>" + "E-mail de l'utilsateur : " + req.body.email + "<br><br>" + "Message de l'utilisateur : " + "<br><br>" + req.body.message
    );
  } catch (erreur) {
    res.status(500).send(erreur.message);
  }

  res.status(200).send({
    message: "L'e-mail a bien été envoyé, vous allez recevoir une réponse rapidement.",
  });
};
