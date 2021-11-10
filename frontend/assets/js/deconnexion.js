const deconnexion = async () => {
  try {
    const response = await fetch("api/comptes/deconnexion", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    const data = await response;
    if (data) {
      window.location.href = "/compte/connexion";
    }
  } catch (erreur) {
    console.log(erreur);
  }
};
