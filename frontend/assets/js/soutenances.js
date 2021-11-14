window.addEventListener("load", () => {
  /*console.log("event")
  getCV().then((data) => {
    console.log(data);
  });*/

  // Linking the function to the form
  var form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});

const sendData = async () => {
  console.log("Uploading the soutenances");

  // Get the info of the form
  //TODO : restrict the date and hour
  var date_input = document.getElementById("date_soutenances");
  var lieu_input = document.getElementById("lieux-select");
  var hour_input = document.getElementById("hour_input");

  // format : "yyyy-mm-dd"
  var date = date_input.value;
  // TODO : verifier si il y a un choix
  var lieu = lieu_input.value;
  // format : "hh:mm"
  var hour = hour_input.value;

  // Create the formData
  var formData = new FormData();
  formData.append("date", date);
  formData.append("lieu", lieu);
  formData.append("hour", hour);

  var body = JSON.stringify({ date: date, lieu: lieu, hour: hour });

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  for (var value of formData.values()) {
    //console.log(value);
  }

  const options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: body,
    //headers : headers
  };

  try {
    const response = await fetch("/api/soutenances", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
  }
};
