const valider = async (id) => {
  const url = "/api/offres/validate/" + id;

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ id: id }),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data)
  } catch (erreur) {
    console.log(erreur);
  }
}


window.addEventListener("load", async () => {
  // Linking the function to the form
  var form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    console.log("LINkING")
    event.preventDefault();
    sendData();
  }); 
});


// Link les boutons validate avec la fonction qui fait l'appel api pour valider les offres
var classname = document.getElementsByClassName("buttonValidateOffre");
for (var i = 0 ; i < classname.length; i++) {
  classname[i].addEventListener('click' , (event) =>{
    valider(event.path[0].parentNode.id)
  } , false ) ;
}






const sendData = async () => {
    console.log("Uploading the offer")

    // Get the file
    var input = document.getElementById("fileupload");
    var data_file = input.files[0];

    // Get the info on the offre
    var nom_poste = document.getElementById("nom_poste").value
    var nom_entreprise = document.getElementById("nom_entreprise").value
    var lieu_poste = document.getElementById("lieu_poste").value

    if (document.getElementById('checkBoxCyberData').checked){
      var formation = "cyberdata"
    } else {
      var formation = "cyberlog"
    }
    
    let formData = new FormData(); 
    formData.append("file", data_file);

    var headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "nom_entreprise" : nom_entreprise,
      "nom_poste":nom_poste,
      "formation" : formation,
      "lieu_poste" : lieu_poste
    };


    console.log(data_file)

    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: data_file,
      headers : headers
    };

    try {
        const response = await fetch("/api/offres", options);
        const response_data = await response.json();
        console.log(response_data);
      } catch (error) {
        //console.log(error);
      }   
}