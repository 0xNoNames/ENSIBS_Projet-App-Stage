const supprimer = async () => {
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
    } catch (error) {
      console.log(error);
    }
  }
};

const ouvrirFormEmail = () => {
  document.getElementById("myFormMail").style.display = "block";
};

const fermerFormMotDePasse = () => {
  document.getElementById("myFormMail").style.display = "none";
};

const ouvrirFormMotDePasse = () => {
  document.getElementById("myFormPwd").style.display = "block";
};

const fermerFormMotDePasse = () => {
  document.getElementById("myFormPwd").style.display = "none";
};

const formModifierEmail = document.getElementById("formMail");
const formModifierMotDePasse = document.getElementById("formMotDePasse");

formModifierEmail.addEventListener("submit", (event) => {
  event.preventDefault();
  modifierMail();
});

formModifierMotDePasse.addEventListener("submit", (event) => {
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
    const data = await response;
    if (response.status == 200) {
      window.location.href = "/compte/connexion";
    } else {
      alert("Modification impossible.");
    }
  } catch (error) {
    console.log(error);
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
    const data = await response;
    if (response.status == 200) {
      window.location.href = "/compte/connexion";
    } else {
      alert("Modification impossible.");
    }
  } catch (error) {
    console.log(error);
  }
};
