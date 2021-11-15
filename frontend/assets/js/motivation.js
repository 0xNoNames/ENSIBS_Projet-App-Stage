const sendData = async () => {
  console.log("Uploading the CV");

  // Get the file
  var input = document.getElementById("fileupload");
  var description = document.getElementById("description");
  var data_file = input.files[0];
  let formData = new FormData();
  //let readStream = fs.createReadStream(data_file);

  var headers = console.log(data_file);

  const options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: data_file,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  try {
    const response = await fetch("/api/motivation", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
  }
};

window.addEventListener("load", () => {
  // Linking the function to the form
  var form = document.getElementById("uploadMotivation");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
  });
});
