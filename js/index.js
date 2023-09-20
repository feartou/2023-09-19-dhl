function initJs(color){
    var jsLoadedNode=document.querySelector("#isjsloaded");
    jsLoadedNode.innerHTML='<b>Js Chargé</b>';
    jsLoadedNode.classList.add('jsCharger');
    console.log('toto');
    console.warn('ejj');
    console.error('enfdn');
    console.trace('kfnf');
}

initJs();