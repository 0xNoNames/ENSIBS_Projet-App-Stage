const deconnexion = async () => {
  try {
    fetch("/compte/deconnexion", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    }).then(() => {
      window.location.href = "/compte/connexion";
    });
  } catch (error) {
    console.log(error);
  }
};
