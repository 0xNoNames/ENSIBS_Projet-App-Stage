window.addEventListener("load", () => {
  var classnameOuvrirCV = document.getElementsByClassName("classnameOuvrirCV");

  for (var i = 0; i < classnameOuvrirCV.length; i++) {
    classnameOuvrirCV[i].addEventListener(
      "click",
      (event) => {
        ouvrirCV(event);
      },
      false
    );
  }
});

const ouvrirCV = async (event) => {
  var listelement = event.path;
  var div;

  for (var i = 0; i < listelement.length; i++) {
    try {
      if (listelement[i].getAttribute("class").includes("classnameOuvrirCV")) {
        div = listelement[i];
      }
    } catch (erreur) {}
  }
  var url = "api/cvs/" + div.id + "/pdf";
  window.open(url, "_blank").focus();
};
