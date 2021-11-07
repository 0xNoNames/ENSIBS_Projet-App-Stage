// import { auth } from "/static/assets/js/auth.js";

document.getElementById("deco").onclick = async () => {
  try {
    fetch("/compte/deconnexion", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    }).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("conBouton").onclick = async () => {
  window.location.href = "/utilisateur/connexion";
};

// auth(true).then((data) => {
//   console.log(data)
// });

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
