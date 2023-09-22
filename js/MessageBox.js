const modelInnerBase =
  '<div id="modal" style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(128, 128, 128, 0.27);"><div id="modal-content" style="margin-left: 20%;margin-right: 20%;margin-top: 20%;display: flex;max-height: 70%;box-shadow: 10px 10px 25px grey;border-radius: 8px;flex-direction: column;background-color: white;border: 1px solid grey;padding: 10px;"><div id="modal-content-title" style="font-size: 3em; border-bottom: 1px solid grey">title</div><div id="modal-content-body" style="overflow-y: scroll; flex-grow: 1; font-size: 1.75em; padding: 10px">body</div><div id="modal-content-buttons" style="display: flex;flex-wrap: wrap;justify-content: space-between;border-top: 1px solid grey;padding: 5px 10px;"><button  id="modal-button-cancel" type="button" style="border-radius: 8px;background-color: tomato;color: white;padding: 5px 10px;font-size: 2em;border: none;">Cancel</button><button id="modal-button-ok" type="button" style="border-radius: 8px;background-color: skyblue;color: white;padding: 5px 10px;font-size: 2em;border: none;">Ok</button></div></div></div>';
export class ModalBox {
  #baseModalNode;
  #okFuction = undefined;
  #cancelFunction = undefined;
  constructor() {
    const tmp = document.createElement("div");
    tmp.innerHTML = modelInnerBase;
    this.#baseModalNode = tmp.querySelector("#modal");
    this.#baseModalNode
      .querySelector("#modal-button-ok")
      .addEventListener("click", (evt) => {
        if (
          undefined !== this.#okFuction &&
          typeof this.#okFuction === "function"
        ) {
          this.#okFuction();
        }
        this.#baseModalNode.remove();
      });
    this.#baseModalNode
      .querySelector("#modal-button-cancel")
      .addEventListener("click", (evt) => {
        if (
          undefined !== this.#cancelFunction &&
          typeof this.#cancelFunction === "function"
        ) {
          this.#cancelFunction();
        }
        this.#baseModalNode.remove();
      });
  }
  show(title, message, okFunction, cancelFunction) {
    this.#okFuction = okFunction;
    this.#cancelFunction = cancelFunction;
    this.#baseModalNode.querySelector("#modal-content-title").innerHTML = title;
    this.#baseModalNode.querySelector("#modal-content-body").innerHTML =
      message;
    if (undefined === cancelFunction) {
      this.#baseModalNode.querySelector("#modal-button-cancel").style.display =
        "none";
    } else {
      this.#baseModalNode.querySelector("#modal-button-cancel").style.display =
        "inline";
    }
    document.body.appendChild(this.#baseModalNode);
  }
}

const modal = new ModalBox();
export default modal;
