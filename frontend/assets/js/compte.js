const supprimerCompte = async () => {
  if (confirm("Supprimer le compte ?") == true) {
    try {
      const response = await fetch("/api/comptes/suppression", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      const data = await response;
      if (response.status == 200) {
        window.location.href = "/compte/connexion";
      } else {
        alert("Supression impossible.");
      }
    } catch (erreur) {
      console.log(erreur);
    }
  }
};

const ouvrirFormEmail = () => {
  document.getElementById("divMail").style.display = "block";
};

const fermerFormEmail = () => {
  document.getElementById("divMail").style.display = "none";
};

const ouvrirFormMotDePasse = () => {
  document.getElementById("divMotDePasse").style.display = "block";
};

const fermerFormMotDePasse = () => {
  document.getElementById("divMotDePasse").style.display = "none";
};

const formMail = document.getElementById("formMail");
const formMotDePasse = document.getElementById("formMotDePasse");

formMail.addEventListener("submit", (event) => {
  event.preventDefault();
  modifierMail();
});

formMotDePasse.addEventListener("submit", (event) => {
  event.preventDefault();
  let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");
  if (formMotDePasse.password.value.lenght < 8) {
    document.getElementById("messageErreur").innerHTML = "Le mot de passe doit faire au moins 8 caractères.";
    setTimeout(() => {
      document.getElementById("messageErreur").innerHTML = "";
    }, 5000);
  } else if (!passRegex.test(formMotDePasse.password.value)) {
    document.getElementById("messageErreur").innerHTML = "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial.";
    setTimeout(() => {
      document.getElementById("messageErreur").innerHTML = "";
    }, 5000);
  }
  modifierMotDePasse();
});

const modifierMail = async () => {
  try {
    const response = await fetch("/api/comptes/email/", {
      method: "PUT",
      body: JSON.stringify({ email: formMail.email.value }),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status == 200) {
      window.location.replace("/compte/connexion");
    } else {
      document.getElementById("messageErreurMail").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMail").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    console.log(erreur);
  }
};

const modifierMotDePasse = async () => {
  try {
    const response = await fetch("/api/comptes/motdepasse/", {
      method: "PUT",
      body: JSON.stringify({ mot_de_passe: formMotDePasse.password.value }),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status == 200) {
      window.location.replace("/compte/connexion");
    } else {
      document.getElementById("messageErreurMotDePasse").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMotDePasse").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    console.log(erreur);
  }
};

const annuler = async (element) => {
  // Utilisation de la méthode DELETE.
  try {
    // Utilisation de la méthode PUT.
    const response = await fetch("/api/comptes/" + element.parentNode.id, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json;
    if (response.status == 200) {
      const responseComptes = await fetch("/api/comptes/attribuer", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const comptes = await responseComptes.json();

      if (response.status == 200) {
        // Supprime tous les éléments de la division "compteAttribuer".
        document.getElementById("compteAttribuer").className = "hidden";
        document.getElementById("compteAttribuer").innerHTML = "";

        // Ajoute à la division "compteAttribuer" chaque nouveaux éléments.
        if (comptes.length != 0) {
          comptes.forEach((compte) => {
            document.getElementById("compteAttribuer").innerHTML +=
              "<div class='flex flex-col m-2 py-6 px-8 text-left text-white rounded shadow-2xl backdrop-blur-xl bg-black bg-opacity-20 border border-white border-opacity-50'><h1>Prenom : " +
              compte.prenom +
              "</h1><h1>Nom : " +
              compte.nom +
              "</h1><h1>Email : " +
              compte.email +
              "</h1><h1>Statut : " +
              compte.statut +
              "</h1><h1>Date : " +
              compte.date_inscription.substring(0, 10) +
              "</h1><div id=" +
              compte.email +
              " class='mt-2 flex justify-evenly'><button onclick='valider(this)' class='py-1 px-2 bg-green-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>OK</button><button onclick='annuler(this)' class='py-1 px-2 bg-red-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>ANNULER</button></div></div>";
          });
        }
      } else {
        document.getElementById("messageErreurMotDePasse").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreurMotDePasse").innerHTML = "";
        }, 5000);
      }
    } else {
      document.getElementById("messageErreurMotDePasse").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMotDePasse").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    console.log(erreur);
  }
};

const valider = async (element) => {
  try {
    // Utilisation de la méthode PUT.
    const response = await fetch("/api/comptes/attribuer/" + element.parentNode.id, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json;
    if (response.status == 200) {
      const responseComptes = await fetch("/api/comptes/attribuer", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const comptes = await responseComptes.json();

      if (response.status == 200) {
        // Supprime tous les éléments de la division "compteAttribuer".
        document.getElementById("compteAttribuer").innerHTML = "";
        document.getElementById("compteAttribuer").className = "hidden";

        // Ajoute à la division "compteAttribuer" chaque nouveaux éléments.
        console.log(comptes.length);
        if (comptes.length != 0) {
          comptes.forEach((compte) => {
            document.getElementById("compteAttribuer").innerHTML +=
              "<div class='flex flex-col m-2 py-6 px-8 text-left text-white rounded shadow-2xl backdrop-blur-xl bg-black bg-opacity-20 border border-white border-opacity-50'><h1>Prenom : " +
              compte.prenom +
              "</h1><h1>Nom : " +
              compte.nom +
              "</h1><h1>Email : " +
              compte.email +
              "</h1><h1>Statut : " +
              compte.statut +
              "</h1><h1>Date : " +
              compte.date_inscription.substring(0, 10) +
              "</h1><div id=" +
              compte.email +
              " class='mt-2 flex justify-evenly'><button onclick='valider(this)' class='py-1 px-2 bg-green-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>OK</button><button onclick='annuler(this)' class='py-1 px-2 bg-red-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>ANNULER</button></div></div>";
          });
        }
      } else {
        document.getElementById("messageErreurMotDePasse").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreurMotDePasse").innerHTML = "";
        }, 5000);
      }
    } else {
      document.getElementById("messageErreurMotDePasse").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMotDePasse").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    console.log(erreur);
  }
};
