/* On récupère le token CSRF depuis le localStorage */
const test = async () => {
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
    const response = await fetch("/api/users", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
      console.log(error)
  }
};

test();
