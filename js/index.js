/**
 * Fonction d'initialisation du js
 * @param {string} color chaine de valeur de couleur css
 * @returns {undefined} pas de retour
 */
function changePreHeader(color){
    var jsLoadedNode=document.querySelector("#isjsloaded");
    jsLoadedNode.innerHTML='<b>Js Chargé</b>';
    //jsLoadedNode.classList.add('jsCharger');
    jsLoadedNode.style.color = color;
}

/**
 * Appel la fonction changePreHeader lors de l'initialisation de la page.
 * @param {string} color 
 */
function initJs(color){
    changePreHeader(color);
    document.querySelector('#nepascliquer').addEventListener('click', function (evt) {
        changePreHeader('green');
        console.log(evt);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    initJs('tomato');
});