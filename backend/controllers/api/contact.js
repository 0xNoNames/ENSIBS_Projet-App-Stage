import envoyerMail from "../../../utils/envoyerMail.js";
import validator from "validator";

export const postContactMail = async (req, res) => {
  if (!validator.isAlpha(req.body.nom, "fr-FR", { ignore: "-." })) {
    var erreur = "Le nom contient des caractères invalides";
    console.error("ERROR backend/controllers/api/comptes.js #postContactMail() : " + erreur);
    return res.status(400).json({ message: erreur });
  }

  if (!validator.isEmail(req.body.email)) {
    var erreur = "Le mail contient des caractères invalides";
    console.error("ERROR backend/controllers/api/comptes.js #postContactMail() : " + erreur);
    return res.status(400).json({ message: erreur });
  }

  if (!validator.isAlphanumeric(req.body.message, "fr-FR", { ignore: "'`() -/,&[]@:." })) {
    var erreur = "Le message contient des caractères invalides";
    console.error("ERROR backend/controllers/api/comptes.js #postContactMail() : " + erreur);
    return res.status(400).json({ message: erreur });
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
