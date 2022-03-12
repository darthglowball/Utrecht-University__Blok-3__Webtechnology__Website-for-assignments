$("shopping-basket__order-button").addEventListener("click", ()=> alert("order placed succesfully!"));

function updateShoppingBasket(foodItem){
    let boughtItem = $$("#shopping-basket__bought-container ." + foodItem.presentation.classList[1]);
    if (boughtItem){
        let portionIndicator = boughtItem.querySelector(".portion-indicator");
        portionIndicator.textContent = foodItem.data.portion + "x";
    } else {
        let boughtItem = document.createElement("div");
        let icon = foodItem.icon.cloneNode();
        let portionIndicator = document.createElement("div");
        icon.className = "icon";
        icon.className = "portion-indicator";
        portionIndicator.appendChild(document.createTextNode(foodItem.data.portion + "x"));
        boughtItem.classList[0] = "shopping-basket__bought-item";
        boughtItem.classList[1] = foodItem.presentation.classList[1];
        $("shopping-basket__bought-container").appendChild(boughtItem);
    }
}