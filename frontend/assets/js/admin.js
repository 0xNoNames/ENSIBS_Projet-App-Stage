formDateSoutenances = document.getElementById('selection-date-soutenances')

formDateSoutenances.addEventListener("submit", (event) => {
    event.preventDefault();
    exportDateSoutenances();
});



async function exportDateSoutenances() {
    console.log(1)
    // Get the data in the form 
    start = document.getElementById("startSoutenance").value
    end = document.getElementById("endSoutenance").value

    // TODO : check if date are right : after today for start and end > start

    console.log(start,end)

    try {
        const response = await fetch("/api/admin/updateDateSoutenances", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ start:start,end:end }),
        });
    } catch (erreur) {
        console.log(erreur);
    }
}