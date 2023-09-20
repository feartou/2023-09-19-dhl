function initJs(color){
    var jsLoadedNode=document.querySelector("#isjsloaded");
    jsLoadedNode.innerHTML='<b>Js Chargé</b>';
    jsLoadedNode.classList.add('jsCharger');
    console.log(color);
    console.warn(color);
    console.error(color);
    console.trace(color);
}

initJs();