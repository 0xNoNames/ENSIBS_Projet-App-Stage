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
        document.getElementById("messageErreur").innerHTML = data.message;
        setTimeout(() => {
          document.getElementById("messageErreur").innerHTML = "";
        }, 4000);
      }
    } catch (erreur) {
      console.log(erreur);
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
      console.log(erreur);
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
