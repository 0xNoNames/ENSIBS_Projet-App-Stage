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
  document.getElementById("popMail").style.display = "block";
};

const fermerFormEmail = () => {
  document.getElementById("popMail").style.display = "none";
};

const ouvrirFormMDP = () => {
  document.getElementById("popMDP").style.display = "block";
};

const fermerFormMDP = () => {
  document.getElementById("popMDP").style.display = "none";
};

const ouvrirFormCV = () => {
  document.getElementById("popCV").style.display = "block";
};

const fermerFormCV = () => {
  document.getElementById("popCV").style.display = "none";
};

const ouvrirFormLM = () => {
  document.getElementById("popLM").style.display = "block";
};

const fermerFormLM = () => {
  document.getElementById("popLM").style.display = "none";
};

const ouvrirFormLinkedIn = () => {
  document.getElementById("popLinkedIn").style.display = "block";
};

const fermerFormLinkedIn = () => {
  document.getElementById("popLinkedIn").style.display = "none";
};

const formMail = document.getElementById("formMail");
const formMDP = document.getElementById("formMDP");
const formLM = document.getElementById("formLM");
const formCV = document.getElementById("formCV");
const formLinkedIn = document.getElementById("formLinkedIn");

formMail.addEventListener("submit", (event) => {
  event.preventDefault();
  sendDataMail();
});

formMDP.addEventListener("submit", (event) => {
  event.preventDefault();
  let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");
  if (formMDP.password.value.lenght < 8) {
    document.getElementById("messageErreur").innerHTML = "Le mot de passe doit faire au moins 8 caractères.";
    setTimeout(() => {
      document.getElementById("messageErreur").innerHTML = "";
    }, 5000);
  } else if (!passRegex.test(formMDP.password.value)) {
    document.getElementById("messageErreur").innerHTML = "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial.";
    setTimeout(() => {
      document.getElementById("messageErreur").innerHTML = "";
    }, 5000);
  }
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
    const response = await fetch("/api/comptes/motdepasse/", {
      method: "PUT",
      body: JSON.stringify({ mot_de_passe: formMDP.password.value }),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status == 200) {
      window.location.replace("/compte/connexion");
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

const sendDataLM = async () => {
  console.log("Uploading lettre de motivation");

  // Get the file
  var input = document.getElementById("fileUploadLM");
  var data_file = input.files[0];

  const options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: data_file,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  try {
    const response = await fetch("/api/motivation", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
  }
};

const sendDataCV = async () => {
  console.log("Uploading the CV");

  // Get the file
  var input = document.getElementById("fileUploadCV");
  var data_file = input.files[0];

  const options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: data_file,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  try {
    const response = await fetch("/api/cvs", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
  }
};

const sendDataLinkedIn = async () => {
  console.log("Modifier linkedin");
  var new_linkedin = document.getElementById("textInputLinkedIn").value;

  var body = JSON.stringify({ linkedin: new_linkedin });
  console.log(body);

  const options = {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    body: body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  try {
    const response = await fetch("/api/comptes/linkedin", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
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

        // Ajoute à la division "compteAttribuer" chaque nouveaux éléments.
        if (comptes.length != 0) {
          comptes.forEach((compte) => {
            document.getElementById("compteAttribuer").className = "flex flex-wrap mt-10 p-6 text-white rounded shadow-2xl backdrop-blur-xl bg-black bg-opacity-20 border border-white border-opacity-50";
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
            document.getElementById("compteAttribuer").className = "flex flex-wrap mt-10 p-6 text-white rounded shadow-2xl backdrop-blur-xl bg-black bg-opacity-20 border border-white border-opacity-50";
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
