const estAdministrateur = async (req, res, next) => {
    console.log(req.user);
    // req.user
    return next();
};

export default estAdministrateur;