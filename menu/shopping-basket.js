let totalPortions = 0;
let totalPrice = 0;

$("shopping-basket__order-button").addEventListener("click", ()=> alert("order placed succesfully!"));

function updateShoppingBasket(foodItem){
    let boughtItem = $$("#shopping-basket__bought-container ." + foodItem.presentation.classList[1]);
    $("shopping-basket__total").innerHTML = "Total portions: " + totalPortions + "<br>Total price: " + totalPrice.toFixed(2);
    if (boughtItem){
        if (foodItem.data.portions > 0){
            let portionIndicator = boughtItem.querySelector(".portion-indicator");
            portionIndicator.textContent = foodItem.data.portions + "x";
        } else {
            boughtItem.remove();
        }
    } else {
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
    if ($("shopping-basket__bought-container").childElementCount === 0){
        $("shopping-basket__bought-container").textContent = "Your basket is empty. Click on a food item's + to fill up your basket.";
    } else {
        $("shopping-basket__bought-container").childNodes[0].textContent = "";
    }
}