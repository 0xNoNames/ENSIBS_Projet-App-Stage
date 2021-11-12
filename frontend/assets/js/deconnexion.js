const deconnexion = async () => {
  try {
    const response = await fetch("api/comptes/deconnexion", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    const data = await response;

    console.log(response.status);

    if (response.status == 200) {
      window.location.href = "/compte/connexion";
    } else {
      alert("Déconnexion impossible.");
    }
  } catch (erreur) {
    console.log(erreur);
  }
};
