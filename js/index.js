import { Meme } from "./Meme.js";
import { ImagesList, listeImages } from "./Image.js";

const addFormEvent = () => {
  /**
   * fonction de gestion de soumission de formulaire de preventdefault
   * @param {SubmitEvent} evt
   */
  function onformsubmit(evt) {
    evt.preventDefault();
    console.log(current);
    //current.save();
  }

  const form = document.forms["meme_form"];

  // event sur le bouton submit du form
  form.addEventListener("submit", onformsubmit);

  // event sur le select de selection de l'image du form
  form["image"].addEventListener("change", (evt) => {
    current.update({ image: evt.target.value });
  });

  // event sur les champs input text et number du form
  form["meme_text"].addEventListener("input", (evt) => {
    current.update({ meme_text: evt.target.value });
  });

  form["meme_x"].addEventListener("input", (evt) => {
    current.update({ meme_x: evt.target.value });
  });

  form["meme_y"].addEventListener("input", (evt) => {
    current.update({ meme_y: evt.target.value });
  });

  form["meme_taille"].addEventListener("input", (evt) => {
    current.update({ meme_taille: evt.target.value });
  });

  form["meme_color"].addEventListener("input", (evt) => {
    current.update({ meme_color: evt.target.value });
  });

  form["meme_fontWeight"].addEventListener("input", (evt) => {
    current.update({ meme_fontWeight: evt.target.value });
  });
};

const renderMeme = (meme) => {
  console.log(meme);
};

let current = new Meme();
current.render = renderMeme;
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
  addFormEvent();
}
const promiseList = listeImages.loadFromRest();
/**
 * Evenement de verification du chargement du dom
 */
document.addEventListener("DOMContentLoaded", function () {
  promiseList.then((r) => {
    loadSelectImages(r);
  });
  initJs("tomato");
});

/**
 * Chargement de la liste dans le select des images.
 * @param {ImagesList} images
 */
const loadSelectImages = (images = listeImages) => {
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
