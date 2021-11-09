const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const supprimer = async () => {
  if (confirm("Supprimer le compte ?") == true) {
    try {
      fetch("api/utilisateurs/supprimer", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      }).then(() => {
        window.location.href = "/compte/connexion";
      });
    } catch (error) {
      console.log(error);
    }
  }
};

