import envoyerMail from "../../../utils/envoyerMail.js";

export const postContactMail = async (req, res) => {
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
