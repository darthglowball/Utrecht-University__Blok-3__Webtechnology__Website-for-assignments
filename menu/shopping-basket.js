$("shopping-basket__order-button").addEventListener("click", ()=> alert("order placed succesfully!"));

function updateShoppingBasket(foodItem){
    let boughtItem = $$("#shopping-basket__bought-container ." + foodItem.presentation.classList[1]);
    if (boughtItem){
        let portionIndicator = boughtItem.querySelector(".portion-indicator");
        portionIndicator.textContent = foodItem.data.portions + "x";
    } else {
        $("shopping-basket__bought-container").textContent = "";
        let boughtItem = document.createElement("div");
        let icon = foodItem.icon.cloneNode();
        let portionIndicator = document.createElement("div");
        icon.className = "icon";
        portionIndicator.className = "portion-indicator";
        portionIndicator.appendChild(document.createTextNode(foodItem.data.portions + "x"));
        boughtItem.className = "shopping-basket__bought-item " + foodItem.presentation.classList[1];
        boughtItem.appendChild(icon);
        boughtItem.appendChild(portionIndicator);
        $("shopping-basket__bought-container").appendChild(boughtItem);
    }
}