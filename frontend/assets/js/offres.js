window.addEventListener("load", async () => {
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  /* On effectue la requête */
  try {
    const response = await fetch("/api/offres", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //console.log(error);
  }

  // Linking the function to the form
  var form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    console.log("LINkING")
    event.preventDefault();
    sendData();
  });
});






const  sendData = async () => {
    console.log("Uploading the offer")

    // Get the file
    var input = document.getElementById("fileupload");
    var data_file = input.files[0];


    var nom_poste = document.getElementById("nom_poste").value
    var nom_entreprise = document.getElementById("nom_entreprise").value

    if (document.getElementById('checkBoxCyberData').checked){
      var formation = "CyberData"
    } else {
      var formation = "CyberLog"
    }
    
    let formData = new FormData(); 
    formData.append("file", data_file);

    var headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "nom_entreprise" : nom_entreprise,
      "nom_poste":nom_poste,
      "formation" : formation
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