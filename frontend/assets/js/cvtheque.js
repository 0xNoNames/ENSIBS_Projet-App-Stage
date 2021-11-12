window.addEventListener("load", () => {
  getCV().then((data) => {
    console.log(data);
  });
});

const getCV = async () => {
  /* On effectue la requête */
  try {
    const response = await fetch("/api/cvs", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
