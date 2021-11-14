export const getContactPage = async (req, res) => {
  res.render("pages/contact", {
    estConnecte: req.estConnecte,
    page: "Contact",
    prenom: req.compte.prenom,
    statut: req.compte.statut,
    estAttribue: req.compte.estAttribue,
  });
};
