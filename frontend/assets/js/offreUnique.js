const sauvegardeOffre = async () => {
  try {
    var url = window.location.href
    var arrayurl = url.split("/")
    var id = arrayurl[4]

    const response = await fetch("/api/comptes/sauvegardeOffre", {
      method: "POST",
      body: JSON.stringify({id:id}),
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
   	console.log(data)
  } catch (erreur) {
    console.log(erreur)
  }
};





const buttonValider = document.getElementById("buttonSaveOffre")




window.addEventListener("load", () => {
	const buttonValider = document.getElementById("buttonSaveOffre");
	buttonValider.addEventListener('click', 
		function(){ 
			sauvegardeOffre()
		}, 
	false);
});