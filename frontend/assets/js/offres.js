window.addEventListener("load", () => {
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  /* On effectue la requête */
  try {
    const response = await fetch("/api/offres", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
