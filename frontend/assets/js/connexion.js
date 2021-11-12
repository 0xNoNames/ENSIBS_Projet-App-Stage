window.addEventListener("load", () => {
  const envoyerFormulaire = async () => {
    try {
      const response = await fetch("/api/comptes/connexion", {
        method: "POST",
        body: JSON.stringify({ email: form.email.value, mot_de_passe: form.password.value }),
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();

      if (response.status != "200") {
        document.getElementById("messageErreur").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreur").innerHTML = "";
        }, 5000);
      } else {
        window.location.href = "/compte";
      }
    } catch (erreur) {
      console.log(erreur);
    }
  };

  var form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    envoyerFormulaire();
  });
});
