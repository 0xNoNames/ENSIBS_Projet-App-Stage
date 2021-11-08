const estEntreprise = async (req, res, next) => {
  console.log(req.user);
  return next();
};

export default estEntreprise;
