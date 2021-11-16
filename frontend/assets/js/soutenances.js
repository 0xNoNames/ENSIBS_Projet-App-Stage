const getEvenements = async () => {
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  try {
    const response = await fetch("/api/soutenances", options);
    const response_data = await response.json();
    return response_data;
  } catch (error) {
    //console.log(error);
  }
};

const generateCalendar = async () => {
  // On va chercher la div dans le HTML
  let calendarEl = document.getElementById("calendrier");

  // Recuperer la liste des evenements
  var events = await getEvenements();
  var jsonEvent = JSON.parse(events);
  var evenements = jsonEvent.result;

  // On instancie le calendrier
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "fr",
    events: evenements,
    // Function executed when the events is clicked on
    eventClick: function (info) {
      window.open("/soutenances/" + info.event.id, "_blank").focus();
    },
  });

  // On affiche le calendrier
  calendar.render();
};

const addListenerFrom = () => {
  // Linking the function to the form
  var form = document.getElementById("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendData();
    });
  }
};

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

  var nom_soutenance = document.getElementById("nom_text_input").value;

  var confidentiel = document.getElementById("confidentiel_checkbox").value;

  var body = JSON.stringify({ date: date, lieu: lieu, hour: hour, confidentiel: confidentiel, nom_soutenance: nom_soutenance });
  console.log(body);

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: body,
    headers : headers
  };

  try {
    const response = await fetch("/api/soutenances", options);
    const response_data = await response.json();
    console.log(response_data);
  } catch (error) {
    //console.log(error);
  }
};

window.addEventListener("load", async () => {
  addListenerFrom();

  generateCalendar();
});
