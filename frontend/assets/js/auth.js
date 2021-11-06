export const auth = async () => {
  var retour = false;
  try {
    await fetch("/api/estconnecte", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then((data) => {
      if (data.status == 200) {
        console.log(data);
        document.getElementById("navBar").innerHTML = '<a href="/" class="py-4 px-3 text-lg text-green-ensibs-light font-medium hover:text-white">ACCUEIL</a><a href="/cvtheque" class="py-4 px-3 text-lg text-gray-300  font-medium hover:text-white">CVTHÈQUE</a><a href="/offres" class="py-4 px-3 text-lg text-gray-300  font-medium hover:text-white">OFFRES</a><a href="/contact" class="py-4 px-3 text-lg text-gray-300  font-medium hover:text-white">CONTACT</a>';
        document.getElementById("conBouton").innerHTML = "Se déconnecter";
        document.getElementById("conBouton").className = "py-2 px-3 cursor-pointer bg-red-600 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition duration-150";

        document.getElementById("conBouton").onclick = async () => {
          fetch("/utilisateur/deconnexion", {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }).then((data) => {
            console.log(data);
          });
        }
        retour = true;
      }
    }).catch((err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
  return retour;
};
