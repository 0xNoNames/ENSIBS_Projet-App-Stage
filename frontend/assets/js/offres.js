import { auth } from "/static/assets/js/auth.js";

auth(false).then((status) => {
    if (status) { window.location.href = "/"; }
});

window.addEventListener("load", function () {
    const options = {
        method: "GET",
        mode: "cors",
        headers,
        credentials: "include",
    };

    /* On effectue la requête */
    try {
        const response = await fetch("/api/offres", options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
});