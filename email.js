let form = document.getElementById("form_invio_email");
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let oggetto_richiesta = document.getElementById("oggetto_richiesta");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  inputControllo(nome);
  inputControllo(email);
  inputControllo(oggetto_richiesta);
});


function inputControllo(x) {
  let contenuto = x.value.trim();
  if (contenuto.length == 0) {
    x.querySelector(".error");
    x.nextElementSibling.innerText = "Il campo è obbligatorio";
  } else {
    x.nextElementSibling.innerText = "";
  }
}
