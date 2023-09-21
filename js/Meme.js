import { ImageMeme as Img } from "./Image.js";

/**
 * Constructeur d'objet Meme
 * @param {string} jsonConfiguredMemeString
 */
export function Meme(jsonConfiguredMemeString) {
  this.id = undefined;
  this.texte = "texte du meme"; // this = public
  this.x = 1;
  this.y = 1;
  this.fontsize = 32;
  this.fontweight = "500";
  this.color = "#000000";
  this.underline = false;
  this.italic = false;
  this.imageId = -1;
  this.Image = new Img();
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

var meme = new Meme();

/*  Object.seal(nom_objet) verrouille l'objet plus d'insertion ni de suppression de champs
    Object.freeze(nom_objet) permet faire gele mes données de l'objet
    Object.assign(target,source) assinge les valeurs dans la target
*/
