const deconnexion = async () => {
  try {
    fetch("/compte/deconnexion", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    }).then((data) => {
      window.location.href = "/compte/connexion";
    });
  } catch (error) {
    console.log(error);
  }
};
