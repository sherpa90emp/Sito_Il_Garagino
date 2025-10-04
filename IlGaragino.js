const backgroundVetrina = [
  'url("Img/ImgVetrina1.jpg")',
  'url("Img/ImgVetrina2.jpg")',
  'url("Img/ImgVetrina3.jpg")',
];
//TODO modificare struttura vetrina, inserire un div per ogni immagine di vetrina

let slideIndex = 1;
let frecciaSx = document.getElementById("freccia_sx");
let frecciaDx = document.getElementById("freccia_dx");

let backgroundContattiIndex = 0;
let backgroundContattiFix = document.getElementsByClassName(
  "contatti_background_img_fix"
);
let backgroundContattiSkew = document.getElementsByClassName(
  "contatti_background_img_skew"
);

let emailClick = document.getElementById("email_click");
let richiestaEmail = document.getElementById("richiesta_email");
let exit = document.getElementById("exit");

let form = document.getElementById("form_invio_email");
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let oggetto_richiesta = document.getElementById("oggetto_richiesta");

showSlides(slideIndex);

frecciaDx.onclick = () => {
  cambioSlides(1);
};
frecciaSx.onclick = () => {
  cambioSlides(-1);
};

emailClick.onclick = () => {
  richiestaEmailActive();
};

exit.onclick = () => {
  richiestaEmailDeactivate();
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  inputControllo(nome);
  inputControllo(email);
  inputControllo(oggetto_richiesta);
});

document.addEventListener("DOMContentLoaded", function () {
  vetrina();

  imgContatti();
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

function richiestaEmailActive() {
  richiestaEmail.classList.add("richiesta_email_open");
}

function richiestaEmailDeactivate() {
  richiestaEmail.classList.remove("richiesta_email_open");
}

function cambioSlides(n) {
  showSlides((slideIndex += n));
}

function imgContatti() {
  let visibilityFix = Array.from(backgroundContattiFix).filter(
    (el) => el.offsetParent !== null
  );
  let visibilitySkew = Array.from(backgroundContattiSkew).filter(
    (el) => el.offsetParent !== null
  );
  let n = visibilityFix.length;

  for (let i = 0; i < n; i++) {
    backgroundContattiFix[i].style.opacity = "0.2";
    if (n == 2) {
      visibilitySkew[i].style.width = "40%";
    } else {
      visibilitySkew[i].style.width = `calc(60% / ${n - 1})`;
    }
  }
  backgroundContattiIndex++;
  if (backgroundContattiIndex > n) {
    backgroundContattiIndex = 1;
  }
  visibilityFix[backgroundContattiIndex - 1].style.opacity = "0.7";
  visibilityFix[backgroundContattiIndex - 1].style.transition = "opacity 1s";
  if (n == 2) {
    visibilitySkew[backgroundContattiIndex - 1].style.width = "60%";
    visibilitySkew[backgroundContattiIndex - 1].style.transition = "width 1s";
  } else {
    visibilitySkew[backgroundContattiIndex - 1].style.width = "40%";
    visibilitySkew[backgroundContattiIndex - 1].style.transition = "width 1s";
  }
  setTimeout(imgContatti, 3500);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slide_carosello");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].removeAttribute("id");
    let pSX = slides[slideIndex - 1].querySelector(".testo_slide_SX");
    pSX.innerHTML = "";
  }
  slides[slideIndex - 1].setAttribute("id", "slide_carosello_active");
  setTimeout(function () {
    let pSX = slides[slideIndex - 1].querySelector(".testo_slide_SX");
    pSX.innerHTML = "";
    macchinaDaScrivere(pSX.dataset.fulltext, pSX, 50);
  }, 1000);
}

function vetrina() {
  let IndexVetrina = 1;
  let firstRun = true;
  let divVetrina = document.getElementById("vetrina");
  let testi = [
    document.getElementById("divTestoFoto0Java"),
    document.getElementById("divTestoFoto1Java"),
    document.getElementById("divTestoFoto2Java"),
  ];

  setInterval(function () {
    if (firstRun) {
      testi.forEach((div) => (div.className = "testo_vetrina"));
      setTimeout(function () {
        let p = testi[IndexVetrina].querySelector("p");
        p.innerHTML = "";
        testi[IndexVetrina].className = "testo_vetrina_transition";
        macchinaDaScrivere(p.dataset.fulltext, p, 40);
      }, 2000);
      firstRun = false;
      return;
    }

    divVetrina.classList.add("fade-out");

    setTimeout(function () {
      divVetrina.style.backgroundImage = backgroundVetrina[IndexVetrina];
      setTimeout(function () {
        divVetrina.classList.remove("fade-out");
      }, 100);

      testi.forEach((div) => (div.className = "testo_vetrina"));

      setTimeout(function () {
        let p = testi[IndexVetrina].querySelector("p");
        p.innerHTML = "";
        testi[IndexVetrina].className = "testo_vetrina_transition";
        macchinaDaScrivere(p.dataset.fulltext, p, 40);
      }, 2000);

      IndexVetrina++;
      if (IndexVetrina >= backgroundVetrina.length) {
        IndexVetrina = 0;
      }
    }, 1000);
  }, 10000);
}

function macchinaDaScrivere(stringaDaStampare, doveStampare, velocita) {
  let index = 0;
  if (doveStampare.typingTimeout) {
    clearTimeout(doveStampare.typingTimeout);
  }
  function scrivi() {
    if (index < stringaDaStampare.length) {
      doveStampare.innerHTML += stringaDaStampare.charAt(index);
      index++;
      doveStampare.typingTimeout = setTimeout(scrivi, velocita);
    }
  }
  scrivi();
}
