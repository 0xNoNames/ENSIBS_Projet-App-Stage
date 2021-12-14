formContraintes = document.getElementById("formContraintesCreneaux")

formContraintes.addEventListener("submit", (event) => {
    event.preventDefault();
    sendContraintes();
});

async function sendContraintes(){
	console.log(1)
	var elmsInput = document.querySelectorAll("[id='creneauInput']");
    var date_Creneau = []

    // Ordre Jour -> Heure 
    for (var i = 0; i < elmsInput.length; i++) {
        var value = elmsInput[i].checked;
        date_Creneau.push(value)
    }

    try {
        const response = await fetch("/api/contraintes/updateContraintes", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ date_Creneau:date_Creneau }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}