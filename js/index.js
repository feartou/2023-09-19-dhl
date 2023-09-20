/**
 * Fonction d'initialisation du js
 * @param {string} color chaine de valeur de couleur css
 * @returns {undefined} pas de retour
 */
function initJs(color){
    var jsLoadedNode=document.querySelector("#isjsloaded");
    jsLoadedNode.innerHTML='<b>Js Chargé</b>';
    jsLoadedNode.classList.add('jsCharger');
}

initJs();