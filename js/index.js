import { Meme } from "./Meme.js";
import { ImagesList, listeImages } from "./Image.js";
let meme = new Meme();
/**
 * Fonction d'initialisation du js
 * @param {string} color chaine de valeur de couleur css
 * @returns {undefined} pas de retour
 */
function changePreHeader(color) {
  var jsLoadedNode = document.querySelector("#isjsloaded");
  jsLoadedNode.innerHTML = "<b>Js Chargé</b>";
  //jsLoadedNode.classList.add('jsCharger'); pour ajouter une classe.
  jsLoadedNode.style.color = color;
}

/**
 * Appel la fonction changePreHeader lors de l'initialisation de la page.
 * @param {string} color
 */
function initJs(color) {
  changePreHeader(color);
  document
    .querySelector("#nepascliquer")
    .addEventListener("click", function (evt) {
      changePreHeader("green");
      console.log(evt);
    });
  /**
   * fonction de gestion de soumission de formulaire de preventdefault
   * @param {SubmitEvent} evt
   */
  function onformsubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    var meme = {
      texte: evt.target["meme_text"].value,
      x: Number(evt.target["meme_x"].value),
      y: Number(evt.target["meme_y"].value),
      taille: Number(evt.target["meme_taille"].value),
      fontWeight: evt.target["meme_fontWeight"].value,
      color: evt.target["meme_color"].value,
    };
    console.log(meme);
  }

  document.forms["meme_form"].addEventListener("submit", onformsubmit);
}
const promiseList=listeImages.loadFromRest();
/**
 * Evenement de verification du chargement du dom
 */
document.addEventListener("DOMContentLoaded", function () {
  promiseList.then((r)=>{ loadSelectImages(r);});
  initJs("tomato");
});

/**
 * Chargement de la liste dans le select des images.
 * @param {ImagesList} images
 */
const loadSelectImages = (images=listeImages) => {
  const select = document.querySelector("select#image");
  const a = select.item(0);
  select.innerHTML = "";
  select.appendChild(a);
  images.map((e) => {
    const optEleme = document.createElement("option");
    optEleme.value = e.id;
    optEleme.innerHTML = e.title;
    select.appendChild(optEleme);
  });
};
