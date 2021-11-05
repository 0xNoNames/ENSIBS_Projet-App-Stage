window.addEventListener("load", function () {
  function sendData() {
    fetch("/utilisateur/connexion", {
      method: "POST",
      body: JSON.stringify({ email: form.email.value, mot_de_passe: form.password.value }),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then((data) => {
        if (data.status == 400) document.getElementById("messageErreur").innerHTML = data.body.message;
        else {
          const { xsrfToken } = data.body;

          console.log(xsrfToken);

          /* Le localStorage ne stocke que des chaines de caractères nous devons donc faire appel à la méthode "JSON.stringify" */
          localStorage.setItem("xsrfToken", JSON.stringify(xsrfToken));
          // window.location = "/utilisateur";
        }
      })
      .catch((err) => {
        document.getElementById("messageErreur").innerHTML = err;
      });
  }

  var form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});
