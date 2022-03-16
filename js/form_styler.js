var domElements = [];
var body = document.querySelector("body");
window.addEventListener("load", registerEvents,false);

function registerEvents(e){
    //Add the select element to the page
    var selectContainer = document.querySelector("#element-selector-field");
    var selector = document.createElement("select");
    selector.className = "form__selector form__input";
    searchChildren(body);
    //add options to the form
    for(let i = 0; i<domElements.length; i++){
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(domElements[i].toLowerCase()));
        selector.appendChild(option);
    };
    selectContainer.appendChild(selector);
    //Add event listeners to all buttons
    document.querySelector(".form__submitbtn").addEventListener("click", changeStyling);
    document.querySelector(".changeAppearenceBtn").addEventListener("click",changeStylerFormVisibility);
    document.querySelector(".styler-form__closeBtn").addEventListener("click",changeStylerFormVisibility);
    selector.addEventListener("change",onChangeSelectOption);
    getCurrentStyles("body");
}

function onChangeSelectOption(e){
    selectedElement = e.target;
    getCurrentStyles(selectedElement.value);
}

function getCurrentStyles(selectedElement){
    console.log(selectedElement)
    style = window.getComputedStyle(document.querySelector(selectedElement), null);
    var backgroundColor = style.backgroundColor;
    var borderColor = style.borderColor;
    var borderRadius = style.borderRadius;
    var borderSize = style.borderSize;
    var fontColor = style.color;
    var fontSize = style.fontSize;
    console.log(fontSize + backgroundColor);
    var stylerForm = document.querySelector(".styler-form");
    stylerForm.elements["backgroundColor"].value = rgbToHex(backgroundColor);
    stylerForm.elements["fontSize"].value = parseInt(fontSize,10);
    stylerForm.elements["fontColor"].value = rgbToHex(fontColor);
    stylerForm.elements["borderSize"].value = parseInt(borderSize,10);
    stylerForm.elements["borderColor"].value = rgbToHex(borderColor);
    stylerForm.elements["borderRadius"].value = parseInt(borderRadius,10);
}
  
function rgbToHex(input) {
    let sep = input.indexOf(",") > -1 ? "," : " ";
    rgb = input.substr(4).split(")")[0].split(sep);
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
  }

function changeStyling(e){
    e.preventDefault();
    //Get all values from the form
    var stylerForm = document.querySelector(".styler-form");
    var backgroundColor = stylerForm.elements["backgroundColor"].value;
    var fontSize = stylerForm.elements["fontSize"].value;
    var fontColor = stylerForm.elements["fontColor"].value;
    var borderSize = stylerForm.elements["borderSize"].value;
    var borderColor = stylerForm.elements["borderColor"].value;
    var borderRadius = stylerForm.elements["borderRadius"].value;
    var selectedElement = document.querySelector(".form__selector").value;
    var allSelectedElements = document.querySelectorAll(selectedElement);

    //Change the style of selected elements
    for(let i = 0; i < allSelectedElements.length; i++){
        allSelectedElements[i].style.color = fontColor;
        allSelectedElements[i].style.fontSize = fontSize + "px";
        allSelectedElements[i].style.border = borderSize + "px solid " + borderColor;
        allSelectedElements[i].style.borderRadius = borderRadius + "px";
        allSelectedElements[i].style.backgroundColor = backgroundColor;
    };
    changeStylerFormVisibility(e);
};


function searchChildren(parent){
    // Check if parent is a header, footer,article,section or aside
    // and at it to the list if it does not already exists
    let tagname = parent.tagName;
    if (["BODY", "HEADER", "ASIDE","ARTICLE","SECTION","FOOTER"].includes(tagname)){
        if(!domElements.includes(tagname)){
            domElements.push(tagname);
        };
    };
    // Loop through all children to find DOM elements.
    var children = parent.childNodes;
    for (let i = 0; i<children.length; i++){
        searchChildren(children[i]);
    };
};

function changeStylerFormVisibility(e){
    e.preventDefault();
    document.querySelector(".website-styler").classList.toggle("website-styler--hidden");
}



