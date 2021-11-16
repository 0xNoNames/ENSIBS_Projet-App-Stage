// Function for fecting the api
const getCV = async () => {
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  return 1;

  /* On effectue la requête */
  try {
    const response = await fetch("/api/cvs", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const sendData = async () => {
  console.log("Uploading the CV");

  // Get the file
  var input = document.getElementById("fileupload");
  var linkedin = document.getElementById("linkedin");
  var description = document.getElementById("description");
  var data_file = input.files[0];
  let formData = new FormData();
  //let readStream = fs.createReadStream(data_file);
  formData.append("file", data_file);

  var headers = console.log(data_file);

  const options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: { data_file, linkedin, description },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  try {
    const response = await fetch("/api/cvs", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
  }
};

window.addEventListener("load", () => {
  console.log("event");
  getCV().then((data) => {
    console.log(data);
  });

  // Linking the function to the form
  //var form = document.getElementById("form");
//
  //form.addEventListener("submit", (event) => {
  //  event.preventDefault();
  //  sendData();
  //});

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



const ouvrirCV = async  (event) => {
  var listelement = event.path;

  var div;
  for (var i = 0; i < listelement.length; i++) {
    try{
      if (listelement[i].getAttribute("class").includes("classnameOuvrirCV")){
        div = listelement[i]
      }
    } catch (erreur){}
  }
  var url = "api/cvs/" + div.id +"/pdf";
  window.open(url, '_blank').focus();
}


