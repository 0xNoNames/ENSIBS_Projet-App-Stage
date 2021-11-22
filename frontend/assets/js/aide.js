window.addEventListener("load", () => {
  const envoyerMailValidation = async () => {
    try {
      const response = await fetch("/api/comptes/aide/validation", {
        method: "POST",
        body: JSON.stringify({ email: formValidation.emailValidation.value }),
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();

      if (data) {
        if (data.status) {
          if (confirm(data.message)) {
            window.location.href = "/compte/connexion";
          } 
        } else {
            document.getElementById("messageErreur").innerHTML = data.message;
            setTimeout(() => {
              document.getElementById("messageErreur").innerHTML = "";
            }, 4000);
          }
        }
    } catch (erreur) {
      document.getElementById("messageErreur").innerHTML = erreur.message;
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 4000);
    }
  };

  const envoyerMailOublie = async () => {
    try {
      const response = await fetch("/api/comptes/aide/oublie", {
        method: "POST",
        body: JSON.stringify({ email: formOublie.emailOublie.value }),
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();

      if (data) {
        document.getElementById("messageErreur").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreur").innerHTML = "";
        }, 4000);
      }
    } catch (erreur) {
      document.getElementById("messageErreur").innerHTML = erreur.message;
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 4000);
    }
  };

  const formValidation = document.getElementById("formValidation");
  const formOublie = document.getElementById("formOublie");

  formValidation.addEventListener("submit", (event) => {
    event.preventDefault();
    envoyerMailValidation();
  });

  formOublie.addEventListener("submit", (event) => {
    event.preventDefault();
    envoyerMailOublie();
  });
});
