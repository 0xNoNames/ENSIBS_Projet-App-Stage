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


formSalle = document.getElementById("formSalle")
formSalle.addEventListener("submit", (event) => {
    event.preventDefault();
    sendSalle();
});



var checkboxes = document.querySelectorAll("[id='checkboxSalle']");

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change',onChangeCheckbox)
}



async function onChangeCheckbox(event){
    var name = event.srcElement.name;
    var disponible = event.srcElement.checked;
    try {
        const response = await fetch("/api/admin/updateSalle", {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ name:name,disponible:disponible }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}


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
            body: JSON.stringify({ jury: juryData }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}


async function sendSalle() {
    var name = document.getElementById('salleName').value

    try {
        const response = await fetch("/api/admin/createSalle", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ name: name }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}