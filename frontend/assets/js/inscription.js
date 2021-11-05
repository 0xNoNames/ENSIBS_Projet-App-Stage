window.addEventListener("load", function () {
  function sendData() {
    fetch("/utilisateur/inscription", {
      method: "POST",
      body: JSON.stringify({ prenom: form.prenom.value, nom: form.nom.value, email: form.email.value, mot_de_passe: form.password.value }),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then((data) => {
        if (data.status == 400) document.getElementById("messageErreur").innerHTML = data.body.message;
        else console.log(data.body.message);
      })
      .catch((err) => {
        document.getElementById("messageErreur").innerHTML = err;
      });
  }

  var form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (form.passwordConfirm.value != form.password.value) document.getElementById("messageErreur").innerHTML = "Les mots de passe ne correspondent pas.";
    else if (form.password.value.lenght < 8) document.getElementById("messageErreur").innerHTML = "Le mot de passe doit faire au moins 8 caractères.";
    else if (!passRegex.test(form.password.value)) document.getElementById("messageErreur").innerHTML = "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial.";
    else sendData();
  });
});
