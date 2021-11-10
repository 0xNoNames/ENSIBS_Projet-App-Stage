const supprimer = async () => {
  if (confirm("Supprimer le compte ?") == true) {
    try {
      const response = await fetch("api/comptes/supprimer", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      const data = await response;
      if (data) {
        window.location.href = "/compte/connexion";
      }
    } catch (error) {
      console.log(error);
    }
  }
};
