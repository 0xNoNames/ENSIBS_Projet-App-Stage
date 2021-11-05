import { auth } from "/static/assets/js/auth.js";

if (auth()) { window.location.href = "/"; }


window.addEventListener("load", function () {
  function sendData() {
    fetch("/utilisateur/connexion", {
      method: "POST",
      body: JSON.stringify({ email: form.email.value, mot_de_passe: form.password.value }),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then((data) => {
        if (data.status == 400) document.getElementById("messageErreur").innerHTML = data.body.message;
        else { window.location.href = "/utilisateur"; }
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
