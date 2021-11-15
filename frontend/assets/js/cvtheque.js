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
  var form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
  });
});

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
