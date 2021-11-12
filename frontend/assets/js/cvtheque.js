function getBase64(file) {
  if (file){
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  }
  
}

window.addEventListener("load", () => {
  getCV().then((data) => {
    console.log(data);
  });


  // Function for fecting the api

  const  sendData = async () => {
    console.log("Uploading the CV")

    // Get the file
    var input = document.getElementById("fileupload");
    var data_file = input.files[0];
    let formData = new FormData(); 
    formData.append("file", data_file);

    headers = {
      "Content-Type": "*/*"
    };


    //console.log(data_file)

    

    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: formData,
      headers : headers
    };

    try {
        const response = await fetch("/api/cvs", options);
        const response_data = await response.json();
        console.log(response_data);
      } catch (error) {
        //console.log(error);
      }
      


    
}



  // Linking the function to the form
  var form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});

const getCV = async () => {
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  /* On effectue la requête */
  try {
    const response = await fetch("/api/cvs", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}





const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
