window.addEventListener("load", function () {
  const options = {
    method: "GET",
    mode: "cors",
    headers,
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

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});