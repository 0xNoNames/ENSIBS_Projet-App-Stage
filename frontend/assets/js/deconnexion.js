fetch("/logout", {
  method: "POST",
  mode: "cors",
  headers,
  credentials: "include",
}).then((response) => {
  console.log(document.cookie);
  window.location.href = "/login";
});
