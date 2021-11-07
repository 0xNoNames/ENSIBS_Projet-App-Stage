window.addEventListener("load", () => {
  getCV().then((data) => {
    console.log(data);
  });
});

const getCV = async () => {
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  /* On effectue la requête */
  try {
    const response = await fetch("/api/cvs", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
