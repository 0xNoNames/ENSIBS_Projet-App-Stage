const estVerifie = async (req, res, next) => {
  if (req.user.role == "verification") {
    return res.render("pages/erreurVerif", {
      estConnecte: false,
      page: "",
      prenom: req.utilisateur.prenom,
    });
  }
  return next();
};

export default estVerifie;
