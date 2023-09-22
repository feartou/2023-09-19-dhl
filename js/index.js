import { Meme } from "./Meme.js";
import { ImagesList, listeImages } from "./Image.js";

/* contact pas SMS : 06 64 27 63 60 */

const loadMemeInit = (meme) => {
  const form = document.forms["meme_form"];
  form["texte"].value = meme.texte;
  form["x"].value = Number(meme.x);
  form["y"].value = Number(meme.y);
  form["fontWeight"].value = Number(meme.fontweight);
  form["fontsize"].value = Number(meme.fontsize);
  form["color"].value = meme.color;
  form["underline"].checked = meme.underline;
  form["italic"].checked = meme.italic;
  form["stroke"].checked = meme.stroke;
  form["shadow"].checked = meme.shadow;
  renderMeme(meme);
};

const addFormEvent = () => {
  loadMemeInit(current);
  /**
   * fonction de gestion de soumission de formulaire de preventdefault
   * @param {SubmitEvent} evt
   */
  function onformsubmit(evt) {
    evt.preventDefault();
    const retPromise = current.save();
    retPromise.then((response) => {
      current = new Meme();
      loadMemeInit(current);
    });
    console.log(retPromise);
    console.log(current);
  }

  const form = document.forms["meme_form"];

  // event sur le bouton submit du form
  form.addEventListener("submit", onformsubmit);

  // event sur les champs input text et number du form
  form["texte"].addEventListener("input", (evt) => {
    current.update({ texte: evt.target.value });
  });

  form["x"].addEventListener("input", (evt) => {
    current.update({ x: Number(evt.target.value) });
  });

  form["y"].addEventListener("input", (evt) => {
    current.update({ y: Number(evt.target.value) });
  });

  form["fontsize"].addEventListener("input", (evt) => {
    current.update({ fontsize: Number(evt.target.value) });
  });

  form["color"].addEventListener("input", (evt) => {
    current.update({ color: evt.target.value });
  });

  form["fontWeight"].addEventListener("input", (evt) => {
    current.update({ fontWeight: evt.target.value });
  });

  form["underline"].addEventListener("change", (evt) => {
    current.update({ underline: evt.target.checked });
  });
  form["italic"].addEventListener("change", (evt) => {
    current.update({ italic: evt.target.checked });
  });
  // event sur le select de selection de l'image du form
  form["image"].addEventListener("change", (evt) => {
    const id = Number(evt.target.value);
    const imagefound = listeImages.find((elementimage) => {
      return elementimage.id === id;
    });
    current.update({ imageId: id, image: imagefound });
  });

  form["stroke"].addEventListener("change", (evt) => {
    current.update({ stroke: evt.target.checked });
  });
  form["shadow"].addEventListener("change", (evt) => {
    current.update({ shadow: evt.target.checked });
  });
};
/**
 * 
 * @param {Meme} meme 
 */
const renderMeme = (meme) => {
  console.log(meme);
  const svg = document.querySelector("svg");
  const texteElement = svg.querySelector("text");
  texteElement.innerHTML = meme.texte;
  texteElement.setAttribute("x", meme.x);
  texteElement.setAttribute("y", meme.y);
  texteElement.setAttribute("font-weight", meme.fontWeight);
  texteElement.style.fontSize = meme.fontsize;
  texteElement.style.fill = meme.color;
  texteElement.style.underline = meme.underline ? "underline" : "none";
  texteElement.style.fontStyle = meme.italic ? "italic" : "normal";
  const img = svg.querySelector("image");
  img.setAttribute('xlink:href',undefined!==meme.image?meme.image.url:'');
  svg.setAttribute('viewBox',`0 0 ${undefined!==meme.image? meme.image.w : '1000'} ${undefined!==meme.image?meme.image.h:'1000'}`);

  meme.shadow === true ? texteElement.classList.add('shadow') : texteElement.classList.remove('shadow');
  meme.stroke === true ? texteElement.classList.add('stroke') : texteElement.classList.remove('stroke');
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
