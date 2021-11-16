window.addEventListener("load", () => {
  const envoyerMailContact = async () => {
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        body: JSON.stringify({ nom: formContact.nomContact.value, email: formContact.emailContact.value, message: formContact.messageContact.value }),
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
      document.getElementById("messageErreur").innerHTML = erreur;
      setTimeout(() => {
        document.getElementById("messageErreur").innerHTML = "";
      }, 4000);
    }
  };

  const formContact = document.getElementById("formContact");

  formContact.addEventListener("submit", (event) => {
    event.preventDefault();
    envoyerMailContact();
  });
});
