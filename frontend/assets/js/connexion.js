window.addEventListener("load", function () {
  function sendData() {
    fetch("/compte/connexion", {
      method: "POST",
      body: JSON.stringify({ email: form.email.value, mot_de_passe: form.password.value }),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then((data) => {
        if (data.status == 400) document.getElementById("messageErreur").innerHTML = data.body.message;
        else window.location.href = "/compte";
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

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
