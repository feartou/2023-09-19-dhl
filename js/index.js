function initJs(color){
    console.time('initJs');
    var jsLoadedNode=document.querySelector("#isjsloaded");
    jsLoadedNode.innerHTML='<b>Js Chargé</b>';
    jsLoadedNode.classList.add('jsCharger');
    console.log(color);
    console.warn(color);
    console.error(color);
    console.trace(color);
    console.timeEnd('initJs');
}

initJs();