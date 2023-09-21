import RestAdr, {REST_RESSOURCES} from './constantes.js'



class ImageShort {
  #uid;
  w = 100;
  h;
  url;
  /**
   * getter de #uid
   */
  get uid() {
    return this.#uid;
  }
  /**
   * setter de #uid
   */
  set uid(value) {
    this.#uid = value;
  }

  /**
   * fonction ec6
   */
  getRationWH() {
    return this.w / this.h;
  }
  /**
   * constructeur
   * @param {object} img
   */
  constructor(img = {}) {
    this.#uid = Math.random();
    if (undefined !== img.w) {
      this.w = img.w;
    }
    this.h = undefined !== img.h ? img.h : 100; //code plus lent mais peux etre utile dans le cas ou on doit mettre le code en une ligne
    if (undefined !== img.url && img.url.length >= 5) {
      this.url = img.url;
    } else {
      this.url = "";
    }
  }
}

export class ImageMeme extends Image {
  title = "no image";
  id = undefined;

  constructor(img = {}) {
    super(img);
    if (undefined !== img.title && img.title > 2) {
      this.title = img.title;
    } else if (
      undefined !== img.title &&
      img.url > 5 &&
      undefined !== img.url
    ) {
      this.title = img.slice(
        img.url.lastIndexOf("/") + 1,
        img.url.lastIndexOf(".")
      );
    }
    if (undefined !== img.id) {
      this.id = img.id;
    }
  }
}

// toujours public si private utiliser le #variable

export class ImagesList extends Array {
  loadFromRest() {
    return fetch(RestAdr + REST_RESSOURCES.images)
      .then((response) => {
        return response.json();
      })
      .then((arr) => {
        //console.log(arr);
        this.splice(0); // truncate de array
        // arr.map((element, position, liste) => { this.push(element); }); // chargement de array
        this.push(...arr);  // fusion des listes. attention ne s'utilise que si les objets sont de meme type.
        console.log(this);
      });
  }
}
export const listeImages = new ImagesList();