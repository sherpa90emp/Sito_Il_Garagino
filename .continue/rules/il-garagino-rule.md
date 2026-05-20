## Rules
- Rispondi SEMPRE e SOLO in italiano, indipendentemente dalla lingua della domanda. È obbligatorio.
- Quando richiesto, fornisci sempre commenti professionali ai metodi.
- Modifica sempre i file in `style_scss/`, mai direttamente quelli in `style/`.
- Non introdurre dipendenze npm, bundler o framework JS senza accordo esplicito.
- Ogni `<img>` deve avere l'attributo `alt` descrittivo in italiano.
- Aggiorna sempre i meta tag Open Graph, Twitter Card e il JSON-LD Schema.org se modifichi contenuti, indirizzo o orari.

## Project Overview
Sito web statico single-page per **Il Garagino**, officina specializzata nel restauro di Vespe d'epoca a Montelupo Fiorentino (FI).
Sviluppato da Andrea Chiappi. Tutti i testi del sito sono in italiano.

## Tech Stack
| Layer          | Tecnologia              | Note                        |
|----------------|-------------------------|-----------------------------|
| Markup         | HTML5                   | Single page (index.html)    |
| Stile (source) | SCSS                    | In `style_scss/`            |
| Stile (output) | CSS3                    | In `style/` — compilato     |
| Script         | Vanilla JavaScript ES6+ | Nessun framework            |
| UI Components  | Bootstrap 5.3.3         | Via CDN                     |
| Widget social  | EmbedSocial             | Feed Instagram in `#news`   |
| Containeriz.   | Docker Compose          | nginx:alpine, porta `8084`  |

## Struttura del Repository
```
/
├── index.html                  # Unica pagina del sito
├── IlGaragino.js               # JS principale
├── email.html / email.js       # Template e logica form email
├── style/                      # CSS compilato (NON modificare)
├── style_scss/                 # Sorgente SCSS (modificare qui)
├── Img/                        # Immagini (.jpg, .webp, .svg, .png)
├── Font/                       # Font custom
└── docker-compose.yml
```
La struttura interna può evolvere. Fai sempre riferimento ai file presenti nel contesto della conversazione per conoscere la struttura aggiornata.

## Architettura della Pagina
Le sezioni della single page, nell'ordine:
- `#contenitore_vetrina` — Hero slideshow (3 slide con transizioni CSS)
- `#carosello` — Sezione "Chi Siamo" con carosello e typewriter
- `#contatti` — Orari, indirizzo, social
- `#news` — Widget Instagram + footer

## Convenzioni HTML
- ID e classi in **italiano**, formato `snake_case` (es. `contenitore_testi_vetrina`, `testo_slide_SX`)
- Ogni sezione ha un `id` usato anche come anchor nella navigazione
- Le immagini responsive usano `<picture>` con `<source>` per breakpoint diversi
- I testi per l'effetto typewriter vanno nell'attributo `data-fulltext` del `<p>`
- Tag semantici: `<header>`, `<nav>`, `<main>`, `<figure>`, `<footer>`

## Convenzioni SCSS / CSS
- Font disponibili: `vespa`, `testo` (Roboto Bold), `testo2` (Roboto Condensed Light), `social`, `arrow`
- Le icone social sono font icon: `w`=WhatsApp, `g`=Gmail, `i`=Instagram, `f`=Facebook
- Breakpoint hamburger menu: `@media (max-width: 1199px)`
- `body` usa `scroll-snap-type: y mandatory` — le sezioni devono rispettarlo
- Colore testo principale: `rgb(245, 245, 245)` su sfondi scuri

## Convenzioni JavaScript
- Vanilla JS, nessun `import/export`, incluso con `defer` in HTML
- Funzioni principali da non sovrascrivere:
  - `vetrina()` — slideshow hero
  - `showSlides(n)` / `cambioSlides(n)` — carosello Chi Siamo
  - `imgContatti()` — animazione sfondi sezione contatti
  - `macchinaDaScrivere(str, el, vel)` — effetto typewriter
  - `closeMenuHamburgerOnClickLinks()` — chiude hamburger al click nav