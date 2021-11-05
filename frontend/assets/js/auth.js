(async () => {
  let xsrfToken = localStorage.getItem("xsrfToken");
  if (!xsrfToken) {
    /* Traitement dans le cas où le token CSRF n'existe dans le localStorage */
  }
  /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
  xsrfToken = JSON.parse(xsrfToken);

  /* On créer l'en-tête x-xsrf-token contenant le token CSRF */
  const headers = new Headers();
  headers.append("x-xsrf-token", xsrfToken);

  const options = {
    method: "GET",
    mode: "cors",
    headers,
    credentials: "include",
  };

  /* On effectue la requête */
  try {
    const response = await fetch("/api/estconnecte", options);
    const status = await response.status;
    console.log(status);
    if (status == 200) {
      document.getElementById("conBouton").innerHTML = "Se déconnecter";
      document.getElementById("conBouton").className = "py-2 px-3 bg-red-600 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition duration-150";
      document.getElementById("conBouton").onclick = async () => {
        const options = {
          method: "GET",
          mode: "cors",
          headers,
          credentials: "include",
        };
        const response = await fetch("/utilisateur/deconnexion", options);
        const status = await response.status;
      };
    }
  } catch (error) {
    console.log(error);
  }
})();
