function importHTML(code){
    let codeFragment = document.createElement("div");
    let script = document.currentScript;
    codeFragment.innerHTML = code;
    script.parentNode.insertBefore(codeFragment, script);
    while (codeFragment.childNodes.length > 0){
        let item = codeFragment.childNodes[0];
        script.parentNode.insertBefore(item, script);
    };
    codeFragment.remove();
    script.remove();
};
