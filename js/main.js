var domElements = [];
var body = document.querySelector("body");

function searchChildren(parent){
    // Check if parent is a header, footer,article,section or aside
    // and at it to the list if it does not already exists
    let tagname = parent.tagName;
    switch(tagname){
        case "BODY":
            if(!domElements.includes(tagname)){
                domElements.push(tagname);
            };
            break;
        case 'HEADER':
            if(!domElements.includes(tagname)){
                domElements.push(tagname);
            };
            break;
        case 'ASIDE':
            if(!domElements.includes(tagname)){
                domElements.push(tagname);
            };
            break;
        case 'ARTICLE':
            if(!domElements.includes(tagname)){
                domElements.push(tagname);
            };
            break;
        case 'SECTION':
            if(!domElements.includes(tagname)){
                domElements.push(tagname);
            };
            break;
        case 'FOOTER':
            if(!domElements.includes(tagname)){
                domElements.push(tagname);
            };
            break;
        default:
            break;
        }
    // Loop through all children to find DOM elements.
    var children = parent.childNodes;
    for (let i = 0; i<children.length; i++){
        searchChildren(children[i]);
    }
};

var footerContainer = document.querySelector("#element-selector-field");
var selector = document.createElement("select");
searchChildren(body);
for(let i = 0; i<domElements.length; i++){
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(domElements[i].toLowerCase()));
    selector.appendChild(option);
};
footerContainer.appendChild(selector);

var stylerForm = document.querySelector(".styler-form");
var formbutton = document.querySelector(".form__submitbtn");
formbutton.addEventListener("click",changeStyle);

function changeStyle(e){
    console.log("hoi");
    e.preventDefault();
    var backgroundColor = stylerForm.elements["backgroundColor"].value;
    var fontSize = stylerForm.elements["fontSize"].value;
    var fontColor = stylerForm.elements["fontColor"].value;
    var borderSize = stylerForm.elements["borderSize"].value;
    var borderColor = stylerForm.elements["borderColor"].value;
    var borderRadius = stylerForm.elements["borderRadius"].value;
    var selectedElement = selector.value;
    console.log(borderColor);
    var allSelectedElements = document.querySelectorAll(selectedElement);
    console.log(allSelectedElements);
    for(let i = 0; i < allSelectedElements.length; i++){
        console.log(allSelectedElements[i].tagName);
        allSelectedElements[i].style.color = fontColor;
        allSelectedElements[i].style.fontSize = fontSize;
        allSelectedElements[i].style.borderSize =borderSize;
        allSelectedElements[i].style.borderRadius = borderRadius;
        allSelectedElements[i].style.borderColor = borderColor;
        allSelectedElements[i].style.backgroundColor = backgroundColor;
    };
};

document.querySelector(".changeAppearenceBtn").addEventListener("click",changeStylerFormsVisibility);
var stylingFormVisibility = false;

function changeStylerFormsVisibility(e){
    e.preventDefault();
    console.log("hoi ik werk");
    document.querySelector(".website-styler").classList.toggle("website-styler--hidden");
}



