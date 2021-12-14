formDateSoutenances = document.getElementById('selection-date-soutenances')

formDateSoutenances.addEventListener("submit", (event) => {
    event.preventDefault();
    exportDateSoutenances();
});


formJury = document.getElementById("formJury")
formJury.addEventListener("submit", (event) => {
    event.preventDefault();
    sendNombreJury();
});





async function exportDateSoutenances() {
    // Get the data in the form 
    start = document.getElementById("startSoutenance").value
    end = document.getElementById("endSoutenance").value

    // TODO : check if date are right : after today for start and end > start

    console.log(start, end)

    try {
        const response = await fetch("/api/admin/updateDateSoutenances", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ start: start, end: end }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}


async function sendNombreJury() {

    var elmsInput = document.querySelectorAll("[id='juryInput']");
    var juryData = []

    for (var i = 0; i < elmsInput.length; i++) {
        var value = elmsInput[i].value;
        juryData.push(value)
    }

    try {
        const response = await fetch("/api/admin/updateJury", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ jury:juryData }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}