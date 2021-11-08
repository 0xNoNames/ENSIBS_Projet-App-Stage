const estValide = async (req, res, next) => {
  if (req.estConnecte === false || req.user === "") {
    return res.render("pages/erreur401", {
      estConnecte: false,
      page: "",
      prenom: "",
    });
  }
  return next();
};

export default estValide;
