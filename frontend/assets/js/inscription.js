window.addEventListener("load", () => {
  var form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (form.motDePasseConfirmation.value != form.motDePasse.value) {
      document.getElementById("messageErreur").innerHTML = "Les mots de passe ne correspondent pas.";
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 2000);
    } else if (form.motDePasse.value.lenght < 8) {
      document.getElementById("messageErreur").innerHTML = "Le mot de passe doit faire au moins 8 caractères.";
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 2000);
    } else if (!passRegex.test(form.motDePasse.value)) {
      document.getElementById("messageErreur").innerHTML = "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial.";
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 2000);
    } else sendData();
  });

  const sendData = async () => {
    const statut = form.etudiant.checked ? form.etudiant.value : form.entreprise.value;
    try {
      const response = await fetch("/api/comptes/", {
        method: "POST",
        body: JSON.stringify({ prenom: form.prenom.value, nom: form.nom.value, email: form.email.value, mot_de_passe: form.motDePasse.value, statut: statut }),
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();
      if (data.status == 400) {
        document.getElementById("messageErreur").innerHTML = data.body.message;
        setTimeout(() => {
          document.getElementById("messageErreur").innerHTML = "";
        }, 2000);
      } else {
        window.location.href = "/compte";
      }
    } catch (erreur) {
      console.log(erreur);
    }
  };
});
