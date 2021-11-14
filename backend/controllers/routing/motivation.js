export const getMotivationPage = (req,res) => {
	res.render("pages/motivation", {
	    estConnecte: true,
	    page: "Motivation",
	    prenom: req.compte.prenom,
	    statut: req.compte.statut,
	    estAttribue: req.compte.estAttribue,
  });
}