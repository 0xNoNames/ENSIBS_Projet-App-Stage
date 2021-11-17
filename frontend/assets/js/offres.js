const validerOffre = async (id) => {
  try {
    const response = await fetch("/api/offres/validate/" + id, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json;

    if (response.status == 200) {
      const responseOffres = await fetch("/api/offres/", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const offres = await responseOffres.json();
      if (response.status == 200) {
        window.location.href = "/offres";
        // // Supprime tous les éléments de la division "compteAttribuer".
        // document.getElementById("offresAValider").innerHTML = "";
        // document.getElementById("offresAValider").className = "hidden";

        // // Ajoute à la division "compteAttribuer" chaque nouveaux éléments.
        // console.log(offres.length);
        // if (offres.length != 0) {
        //   offres.forEach((offre) => {
        //     // if ()
        //     document.getElementById("offresAValider").className = "flex flex-wrap";
        //     document.getElementById("offresAValider").innerHTML +=
        //       "<div class='py-5 px-5 m-2 text-center rounded shadow-2xl backdrop-blur-lg backdrop-saturate-125 bg-black bg-opacity-20 border border-white border-opacity-50 buttonAfficherOffre'><h1>Nom de l'entreprise class='text-xl' : " +
        //       offre.nom_entreprise +
        //       "</h1><h1>Intitulé du poste : " +
        //       offre.nom_poste +
        //       "</h1><h1>Lieu du poste : " +
        //       offre.lieu_poste +
        //       "</h1><p class='my-4'>" +
        //       offre.description_poste +
        //       "</h1><h1>Date : " +
        //       offre.date.substring(0, 10) +
        //       "</h1>" + "<div id='" + offre.id + "' class='flex mt-5 flex-row justify-center space-x-5'><button class='buttonOuvrirOffre p-2 bg-green-ensibs rounded shadow-2xl bg-opacity-75 hover:bg-opacity-100'>OUVRIR</button><button class='buttonSupprimerOffre p-2 bg-red-500 bg-opacity-50 hover:bg-opacity-70 rounded'</button>SUPPRIMER</button>"
        //   });
      }
      // } else {
      //   document.getElementById("messageErreurAdmin").innerHTML = data.message;
      //   setTimeout(() => {
      //     document.getElementById("messageErreurAdmin").innerHTML = "";
      //   }, 5000);
      // }
    } else {
      document.getElementById("messageErreurAdmin").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreurAdmin").innerHTML = "";
      }, 5000);
    }
  } catch (erreur) {
    document.getElementById("messageErreurAdmin").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurAdmin").innerHTML = "";
    }, 5000);
  }
};

const supprimerOffre = async (id) => {
  if (confirm("Supprimer l'offre ?") == true) {
    try {
      const response = await fetch("/api/offres/" + id, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json;
      if (response.status == 200) {
        window.location.href = "/offres";
        // const responseOffres = await fetch("/api/offres/", {
        //   method: "GET",
        //   mode: "cors",
        //   credentials: "include",
        // });
        // const comptes = await responseOffres.json();

        // if (response.status == 200) {
        //   // Supprime tous les éléments de la division "compteAttribuer".
        //   document.getElementById("compteAttribuer").className = "hidden";
        //   document.getElementById("compteAttribuer").innerHTML = "";
        //   document.getElementById("compteH1").className = "hidden";
        //   document.getElementById("compteH1").innerHTML = "";

        //   // Ajoute à la division "compteAttribuer" chaque nouveaux éléments.
        //   if (comptes.length != 0) {
        //     comptes.forEach((compte) => {
        //       document.getElementById("compteH1").className = "flex flex-wrap";
        //       document.getElementById("compteH1").innerHTML = "Offres à valider"
        //       document.getElementById("compteAttribuer").className = "visible";
        //       document.getElementById("compteAttribuer").innerHTML +=
        //         "<div class='flex flex-col m-2 py-6 px-8 text-left text-white rounded shadow-2xl backdrop-blur-xl bg-black bg-opacity-20 border border-white border-opacity-50'><h1>Prenom : " +
        //         compte.prenom +
        //         "</h1><h1>Nom : " +
        //         compte.nom +
        //         "</h1><h1>Email : " +
        //         compte.email +
        //         "</h1><h1>Statut : " +
        //         compte.statut +
        //         "</h1><h1>Date : " +
        //         compte.date_inscription.substring(0, 10) +
        //         "</h1><div id=" +
        //         compte.email +
        //         " class='mt-2 flex justify-evenly'><button onclick='validerAttribution(this)' class='py-1 px-2 bg-green-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>OK</button><button onclick='annulerAttribution(this)' class='py-1 px-2 bg-red-500 bg-opacity-50 hover:bg-opacity-70 text-white rounded transition duration-150'>ANNULER</button></div></div>";
        //     });
        //   }
        // } else {
        //   document.getElementById("messageErreurMDP").innerHTML = data.message;
        //   setTimeout(() => {
        //     document.getElementById("messageErreurMDP").innerHTML = "";
        //   }, 5000);
        // }
      } else {
        document.getElementById("messageErreur").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreur").innerHTML = "";
        }, 5000);
      }
    } catch (erreur) {
      document.getElementById("messageErreur").innerHTML = data.message;
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 5000);
    }
  }
};

const ouvrirFenetreOffre = (event) => {
  var listelement = event.path;

  for (var i = 0; i < listelement.length; i++) {
    try {
      if (listelement[i].getAttribute("class").includes("buttonOuvrirOffre")) {
        var div = listelement[i];
      }
    } catch (erreur) { }
  }

  window.location.href = "/offres/" + div.parentNode.id;
};

window.addEventListener("load", async () => {
  var formOffres = document.getElementById("formOffres");

  formOffres.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});

// Link les boutons validate avec la fonction qui fait l'appel api pour valider les offres
const classnameValiderOffre = document.getElementsByClassName("buttonValidateOffre");
for (var i = 0; i < classnameValiderOffre.length; i++) {
  classnameValiderOffre[i].addEventListener(
    "click",
    (event) => {
      validerOffre(event.path[0].parentNode.id);
    },
    false
  );
}

// Link les boutons annuler avec la fonction qui fait l'appel api pour valider les offres
const classnameAnnulerOffre = document.getElementsByClassName("buttonAnnulerOffre");
for (var i = 0; i < classnameAnnulerOffre.length; i++) {
  classnameAnnulerOffre[i].addEventListener(
    "click",
    (event) => {
      supprimerOffre(event.path[0].parentNode.id);
    },
    false
  );
}

// Link les boutons annuler avec la fonction qui fait l'appel api pour valider les offres
const classnameSupprimerOffre = document.getElementsByClassName("buttonSupprimerOffre");
for (var i = 0; i < classnameSupprimerOffre.length; i++) {
  classnameSupprimerOffre[i].addEventListener(
    "click",
    (event) => {
      supprimerOffre(event.path[0].parentNode.id);
    },
    false
  );
}

// Link les boutons ouvrir avec la fonction qui fait l'appel api pour valider les offres
const classnameOuvrirOffre = document.getElementsByClassName("buttonOuvrirOffre");
for (var i = 0; i < classnameOuvrirOffre.length; i++) {
  classnameOuvrirOffre[i].addEventListener(
    "click",
    (event) => {
      ouvrirFenetreOffre(event);
    },
    false
  );
}

const sendData = async () => {
  // Get the file
  const input = document.getElementById("fileupload");
  if (input != null) {
    var data_file = input.files[0];
    let formData = new FormData();
    formData.append("file", data_file);
  }

  const regexHeaders = new RegExp("^[\\s,a-zA-Z0-9_]*$");

  // Get the info on the offre
  const nom_entreprise = document.getElementById("nom_entreprise").value.replace(/\s\s+/g, ' ');
  const nom_poste = document.getElementById("nom_poste").value.replace(/\s\s+/g, ' ');
  const lieu_poste = document.getElementById("lieu_poste").value.replace(/\s\s+/g, ' ');
  const description_poste = document.getElementById("description_poste").value.replace(/\s\s+/g, ' ');

  if (document.getElementById("CyberData").checked) {
    var formation_poste = "CyberData";
  } else {
    var formation_poste = "CyberLog";
  }

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    nom_entreprise: nom_entreprise,
    nom_poste: nom_poste,
    formation_poste: formation_poste,
    lieu_poste: lieu_poste,
    description_poste: description_poste
  };

  try {
    if (!regexHeaders.test(nom_entreprise)) throw Error("Caractères invalides dans le nom de l'entreprise.");
    if (!regexHeaders.test(nom_poste)) throw Error("Caractères invalides dans l'intitulé du poste.");
    if (!regexHeaders.test(lieu_poste)) throw Error("Caractères invalides dans le lieu du poste.");

    const response = await fetch("/api/offres", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: data_file,
      headers: headers,
    });
    const data = await response.json();
    if (data) {
      if (data.alert) {
        confirm(data.message);
        window.location.href = "/offres";
      } else {
        document.getElementById("messageErreurCreation").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreurCreation").innerHTML = "";
        }, 5000);
      }
    }
  } catch (erreur) {
    document.getElementById("messageErreurCreation").innerHTML = erreur.message;
    setTimeout(() => {
      document.getElementById("messageErreurCreation").innerHTML = "";
    }, 5000);
  }
};
