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

const ouvrirPopupAnnee = () => {
  document.getElementById("popupAnnee").style.display = "block";
  document.getElementById("popupMail").style.display = "none";
  document.getElementById("popupMDP").style.display = "none";
  document.getElementById("popupCV").style.display = "none";
  document.getElementById("popupLM").style.display = "none";
  document.getElementById("popupLinkedIn").style.display = "none";
}

const ouvrirPopupMail = () => {
  document.getElementById("popupMail").style.display = "block";
  document.getElementById("popupMDP").style.display = "none";
  document.getElementById("popupCV").style.display = "none";
  document.getElementById("popupLM").style.display = "none";
  document.getElementById("popupLinkedIn").style.display = "none";
  document.getElementById("popupAnnee").style.display = "none";
};

const ouvrirPopupMDP = () => {
  document.getElementById("popupMDP").style.display = "block";
  document.getElementById("popupMail").style.display = "none";
  document.getElementById("popupCV").style.display = "none";
  document.getElementById("popupLM").style.display = "none";
  document.getElementById("popupLinkedIn").style.display = "none";
  document.getElementById("popupAnnee").style.display = "none";
};

const ouvrirPopupCV = () => {
  document.getElementById("popupCV").style.display = "block";
  document.getElementById("popupMail").style.display = "none";
  document.getElementById("popupMDP").style.display = "none";
  document.getElementById("popupLM").style.display = "none";
  document.getElementById("popupLinkedIn").style.display = "none";
  document.getElementById("popupAnnee").style.display = "none";
};

const ouvrirPopupLM = () => {
  document.getElementById("popupLM").style.display = "block";
  document.getElementById("popupMail").style.display = "none";
  document.getElementById("popupMDP").style.display = "none";
  document.getElementById("popupCV").style.display = "none";
  document.getElementById("popupLinkedIn").style.display = "none";
  document.getElementById("popupAnnee").style.display = "none";
};

const ouvrirPopupLinkedIn = () => {
  document.getElementById("popupLinkedIn").style.display = "block";
  document.getElementById("popupMail").style.display = "none";
  document.getElementById("popupMDP").style.display = "none";
  document.getElementById("popupCV").style.display = "none";
  document.getElementById("popupLM").style.display = "none";
  document.getElementById("popupAnnee").style.display = "none";
};

const fermerPopup = (element) => {
  element.parentNode.parentNode.parentNode.style.display = "none";
};

const formAnnee = document.getElementById("formAnnee");
const formMail = document.getElementById("formMail");
const formMDP = document.getElementById("formMDP");
const formLM = document.getElementById("formLM");
const formCV = document.getElementById("formCV");
const formLinkedIn = document.getElementById("formLinkedIn");

formAnnee.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataAnnee();
});

formMail.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataMail();
});

formMDP.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataMDP();
});

formLM.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataLM();
});

formCV.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataCV();
});

formLinkedIn.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataLinkedIn();
});


const sendDataAnnee = async() => {
  var dataAnnee = document.getElementById("valueAnnee");
  try {
    const response = await fetch("/api/comptes/annee", {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      body: dataAnnee,
    });
    const data = await response.json();

    document.getElementById("messageErreurAnnee").innerHTML = data.message;
    setTimeout(() => {
      document.getElementById("messageErreurAnnee").innerHTML = "";
    }, 5000);
  } catch (erreur) {
    document.getElementById("messageErreurAnnee").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurAnnee").innerHTML = "";
    }, 5000);
  }
}

const sendDataMail = async () => {
  try {
    const response = await fetch("/api/comptes/email/", {
      method: "PUT",
      body: JSON.stringify({ email: formMail.email.value }),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status == 200) {
      if (data.alert) {
        if (confirm(data.message) == true) {
          window.location.replace("/compte/connexion");
        }
      }
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

const sendDataMDP = async () => {
  try {
    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (formMDP.nouveauMDP.value.lenght < 8) {
      throw Error("Le mot de passe doit faire au moins 8 caractères.");
    } else if (!passRegex.test(formMDP.nouveauMDP.value)) {
      throw Error("Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial.");
    }

    const response = await fetch("/api/comptes/motdepasse/", {
      method: "PUT",
      body: JSON.stringify({ ancienMDP: formMDP.ancienMDP.value, nouveauMDP: formMDP.nouveauMDP.value }),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status == 200) {
      if (data.alert) {
        if (confirm(data.message) == true) {
          window.location.replace("/compte/connexion");
        }
      }
    } else {
      document.getElementById("messageErreurMDP").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMDP").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    document.getElementById("messageErreurMDP").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurMDP").innerHTML = "";
    }, 5000);
  }
};

const sendDataCV = async () => {
  var input = document.getElementById("fileUploadCV");
  var data_file = input.files[0];

  try {
    if (data_file.size > 5000000) {
      throw Error("Fichier trop gros, maximum 5 Mo.");
    }

    const response = await fetch("/api/cvs", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: data_file,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = await response.json();

    document.getElementById("messageErreurCV").innerHTML = data.message;
    setTimeout(() => {
      document.getElementById("messageErreurCV").innerHTML = "";
    }, 5000);
  } catch (erreur) {
    document.getElementById("messageErreurCV").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurCV").innerHTML = "";
    }, 5000);
  }
};

const sendDataLM = async () => {
  var input = document.getElementById("fileUploadLM");
  var data_file = input.files[0];

  try {
    if (data_file.size > 5000000) {
      throw Error("Fichier trop gros, maximum 5 Mo.");
    }

    const response = await fetch("/api/motivations", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: data_file,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = await response.json();
    console.log(data);

    document.getElementById("messageErreurLM").innerHTML = data.message;
    setTimeout(() => {
      document.getElementById("messageErreurLM").innerHTML = "";
    }, 5000);
  } catch (erreur) {
    document.getElementById("messageErreurLM").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurLM").innerHTML = "";
    }, 5000);
  }
};

const sendDataLinkedIn = async () => {
  var linkedin = document.getElementById("textInputLinkedIn").value;

  const linkedinRegex = RegExp("http(s)?://([w]+.)?linkedin.com/in/[A-z0-9_-]+/?");

  try {
    if (linkedin == "" || !linkedinRegex.test(linkedin)) {
      throw Error("Veuillez saisir votre lien de profil LinkedIn.");
    }

    var body = JSON.stringify({ linkedin: linkedin });

    const response = await fetch("/api/comptes/linkedin", {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      body: body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = await response.json();

    document.getElementById("messageErreurLinkedIn").innerHTML = data.message;
    setTimeout(() => {
      document.getElementById("messageErreurLinkedIn").innerHTML = "";
    }, 5000);
  } catch (erreur) {
    document.getElementById("messageErreurLinkedIn").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurLinkedIn").innerHTML = "";
    }, 5000);
  }
};

const annulerAttribution = async (element) => {
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
        document.getElementById("compteH1").className = "hidden";
        document.getElementById("compteH1").innerHTML = "";

        // Ajoute à la division "compteAttribuer" chaque nouveaux éléments.
        if (comptes.length != 0) {
          comptes.forEach((compte) => {
            document.getElementById("compteH1").className = "flex flex-wrap";
            document.getElementById("compteH1").innerHTML = "Offres à valider"
            document.getElementById("compteAttribuer").className = "visible";
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
              " class='mt-2 flex justify-evenly'><button onclick='validerAttribution(this)' class='py-1 px-2 bg-green-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>OK</button><button onclick='annulerAttribution(this)' class='py-1 px-2 bg-red-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>ANNULER</button></div></div>";
          });
        }
      } else {
        document.getElementById("messageErreurMDP").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreurMDP").innerHTML = "";
        }, 5000);
      }
    } else {
      document.getElementById("messageErreurMDP").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMDP").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    console.log(erreur);
  }
};

const validerAttribution = async (element) => {
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
            document.getElementById("compteAttribuer").className = "visible";
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
              " class='mt-2 flex justify-evenly'><button onclick='validerAttribution(this)' class='py-1 px-2 bg-green-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>OK</button><button onclick='annulerAttribution(this)' class='py-1 px-2 bg-red-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>ANNULER</button></div></div>";
          });
        }
      } else {
        document.getElementById("messageErreurMDP").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreurMDP").innerHTML = "";
        }, 5000);
      }
    } else {
      document.getElementById("messageErreurMDP").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurMDP").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    console.log(erreur);
  }
};
