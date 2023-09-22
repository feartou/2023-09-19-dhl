import { ImageMeme as Img } from "./Image.js";
import RestAdr, { REST_RESSOURCES } from "./constantes.js";

/**
 * Constructeur d'objet Meme
 * @param {string} jsonConfiguredMemeString
 */
export function Meme(jsonConfiguredMemeString) {
  this.id = undefined;
  this.texte = "texte du meme"; // this = public
  this.x = 100;
  this.y = 100;
  this.fontsize = 32;
  this.fontweight = "500";
  this.color = "#000000";
  this.underline = false;
  this.italic = false;
  this.imageId = -1;
  this.image = undefined;
  this.render = this.undefined;
  this.save = () => {
    const tmp = {...this,Image:undefined};
    return fetch(    
       `${RestAdr}${REST_RESSOURCES.memes}${undefined !== this.id?"/" + this.id:''}`,
      {
        method: undefined !== this.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(tmp),
      }
    ).then((response) => {
      return response.json();
    });
  };

  const render = () => {
    if (undefined !== this.render && typeof this.render === "function") {
      this.render(this);
    }
  };
  /**
   * update d'un meme par objet avec force render on update
   * @param {Object} memeData
   */
  this.update = function (memeData) {
    Object.assign(this, memeData);
    render();
  };
  /**
   * Chargement de valeurs a partir d'un meme json
   * @param {string} jsonstr
   */
  this.loadFromString = function (jsonstr) {
    Object.assign(this, JSON.parse(jsonstr));
  };

  if (jsonConfiguredMemeString !== this.undefined) {
    this.loadFromString(jsonConfiguredMemeString);
  }

  var _imageId = 0; // var = private
  /**
   * idem singleton
   * @returns
   */
  this.getImageId = function () {
    return _imageId;
  };

  function _changeImage(imageId) {
    console.log("change image fn called");
    _imageId = imageId;
  }

  this.changeImage = _changeImage;

  console.log("Meme called", this.texte);
  _changeImage(25);
  console.log(_imageId);
}

/*  Object.seal(nom_objet) verrouille l'objet plus d'insertion ni de suppression de champs
    Object.freeze(nom_objet) permet faire gele mes données de l'objet
    Object.assign(target,source) assinge les valeurs dans la target
*/
