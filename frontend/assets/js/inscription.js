window.addEventListener("load", () => {
  var form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (form.motDePasseConfirmation.value != form.motDePasse.value) {
      document.getElementById("messageErreur").innerHTML = "Les mots de passe ne correspondent pas.";
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 5000);
    } else if (form.motDePasse.value.lenght < 8) {
      document.getElementById("messageErreur").innerHTML = "Le mot de passe doit faire au moins 8 caractères.";
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 5000);
    } else if (!passRegex.test(form.motDePasse.value)) {
      document.getElementById("messageErreur").innerHTML = "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial.";
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 5000);
    } else envoyerFormulaire();
  });

  const envoyerFormulaire = async () => {
    const statut = form.cyberdata.checked ? form.cyberdata.value : form.cyberlog.checked ? form.cyberlog.value : form.entreprise.value;
    try {
      const response = await fetch("/api/comptes/", {
        method: "POST",
        body: JSON.stringify({ prenom: form.prenom.value, nom: form.nom.value, email: form.email.value, mot_de_passe: form.motDePasse.value, statut: statut }),
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();

      if (data) {
        if (data.alert) {
          if (confirm(data.message) == true) {
            window.location.href = "/";
          }
        } else {
          document.getElementById("messageErreur").innerHTML = data.message;
          setTimeout(() => {
            document.getElementById("messageErreur").innerHTML = "";
          }, 5000);
        }
      }
    } catch (erreur) {
      console.log(erreur);
    }
  };
});
