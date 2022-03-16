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
    document.getElementsByClassName("form__submitbtn").addEventListener("click", changeStyling, false);
    document.querySelector(".changeAppearenceBtn").addEventListener("click",changeStylerFormVisibility);
    document.querySelector(".styler-form__closeBtn").addEventListener("click",changeStylerFormVisibility);
}

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
    var selectedElement = selector.value;
    var allSelectedElements = document.querySelectorAll(selectedElement);

    //Change the style of selected elements
    for(let i = 0; i < allSelectedElements.length; i++){
        console.log(allSelectedElements[i].tagName);
        allSelectedElements[i].style.color = fontColor;
        allSelectedElements[i].style.fontSize = fontSize;
        allSelectedElements[i].style.border = borderSize + " solid " + borderColor;
        allSelectedElements[i].style.borderRadius = borderRadius;
        allSelectedElements[i].style.backgroundColor = backgroundColor;
    };
};

function changeStylerFormVisibility(e){
    e.preventDefault();
    document.querySelector(".website-styler").classList.toggle("website-styler--hidden");
}



