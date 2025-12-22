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
let checkbox = document.getElementById("check");
let inputHamburgerLinks = document.querySelectorAll("#menu-list a");

closeMenuHamburgerOnClickLinks();

showSlides(slideIndex);

frecciaDx.onclick = () => {
  cambioSlides(1);
};
frecciaSx.onclick = () => {
  cambioSlides(-1);
};

document.addEventListener("DOMContentLoaded", function () {
  vetrina();

  imgContatti();
});

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
  let IndexVetrina = 0;
  const divVetrina = document.querySelectorAll(".vetrina");
  const testi = document.querySelectorAll(".testo_vetrina");

  divVetrina[IndexVetrina].classList.add("active");
  testi[IndexVetrina].classList.add("testo_vetrina_transition");
  let p = testi[IndexVetrina].querySelector("p");
  macchinaDaScrivere(p.dataset.fulltext, p, 40);

  setInterval(() => {
    divVetrina[IndexVetrina].classList.remove("active");
    testi[IndexVetrina].classList.remove("testo_vetrina_transition");

    IndexVetrina++;
    if (IndexVetrina >= divVetrina.length) {
      IndexVetrina = 0;
    }

    divVetrina[IndexVetrina].classList.add("active");
    testi[IndexVetrina].classList.add("testo_vetrina_transition");

    let p = testi[IndexVetrina].querySelector("p");
    p.innerHTML = "";
    setTimeout(() => {
      macchinaDaScrivere(p.dataset.fulltext, p, 40);
    }, 1000);
  }, 9000);
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

(function (d, s, id) {
  var js;
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://embedsocial.com/cdn/ht.js";
  d.getElementsByTagName("head")[0].appendChild(js);
})(document, "script", "EmbedSocialHashtagScript");

function closeMenuHamburgerOnClickLinks() {
  inputHamburgerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1199) {
        checkbox.checked = false;
      }
    });
  });
}
