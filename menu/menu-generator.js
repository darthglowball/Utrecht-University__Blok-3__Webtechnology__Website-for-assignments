class Menu { // Singleton container for MenuSection.
    static data = [];
};

// - MenuSection is used as a container for derivatives of Food and for the presentation thereof, so don't have Data classes inherit from it.
// - "HasA" relationship with Menu.
class MenuSection {
    static data = [];
    constructor(name){
        let parent = document.getElementById("content-container");
        let sibling = document.getElementsByClassName("ingredients-overview")[0];
        this.presentation = document.createElement("section");
        this.presentation.className = "card-container menu-section";
        this.presentation.id = "menu-section__" + name.replace(" ", "-");
        let title = document.createElement("h2");
        title.className = "menu-section__title";
        title.appendChild(document.createTextNode(name + "s"));
        parent.insertBefore(title, sibling);
        parent.insertBefore(this.presentation, sibling);
        Menu.data.push(this);
    };
};

new MenuSection("Ice Cream");
new MenuSection("Beverage");
new MenuSection("Snack");
new MenuSection("Hamburger");



class FoodSection { // Presentation (& handler) of a Food derivative. Does not instantiate it.
    static dotChoices = {"milk" : "red", "nuts" : "green", "gluten" : "yellow", "fruit" : "blue"}
    data = null;
    icon = null; // shortcut to a node in this.presentation
    presentation = document.createElement("article"); // DOM object of all visuals
    constructor(data){
        this.data = data;
        this.presentation.className = "card " + this.data.constructor.name + "__" + this.data.name.replace(" ", "-");
        this.icon = document.createElement("img");
        let description = document.createElement("p");
        let descriptionText = this.data.name.replace(/[A-Z]/g, match => " " + match) + " " + this.data.constructor.name.replace(/[A-Z]/g, match => " " + match); // Replaces CamelCase with spaces.
        let allergies = document.createElement("p");
        let price = document.createElement("p");
        let stock = document.createElement("p");
        let portionSelector = document.createElement("div");
        this.presentIcon(this.icon, descriptionText);
        this.presentPortionSelector(portionSelector);
        this.presentDescription(description, descriptionText);
        this.presentPrice(price);
        this.presentStock(stock);
        this.presentAllergies(allergies);
        $("menu-section__" + this.data.constructor.name.replace(/[a-z](?=[A-Z])/g, match => match + "-")).appendChild(this.presentation);
    };
    
    presentDescription(parent, descriptionText){
        parent.appendChild(document.createTextNode(descriptionText));
        this.presentation.appendChild(parent);
    };

    presentIcon(parent, descriptionText){
        parent.setAttribute("src", "./images/" + this.data.icon);
        parent.setAttribute("alt", descriptionText);
        parent.classList.add("shadow");
        this.presentation.appendChild(parent);
    };

    presentPrice(parent){
        parent.appendChild(document.createTextNode("Price: $" + this.data.price));
        this.presentation.appendChild(parent);
    };

    presentStock(parent){
        parent.appendChild(document.createTextNode("Stock: " + this.data.stock + " items"));
        this.presentation.appendChild(parent);
    };
    
    presentAllergies(parent){
        parent.appendChild(document.createTextNode("Allergies: "));
        if (this.data.allergies.length === 0){
            parent.appendChild(document.createTextNode("none"));
        }
        for (let allergy of this.data.allergies){
            let dot = document.createElement("span");
            let dotColor = this.constructor.dotChoices[allergy];
            if (dotColor){ // if a valid color was matched with an allergy.
                dot.className = "dot dot__" + dotColor;
                parent.appendChild(dot);
            } else {
                console.log("Warning: allergyDot could not be matched with a color.");
            };
        };
        this.presentation.appendChild(parent);
    };

    presentPortionSelector(parent){
        parent.className = "portion-selector";
        let minusButton = document.createElement("button");
        let plusButton = document.createElement("button");
        let numberOfPortions = document.createElement("p");
        minusButton.appendChild(document.createTextNode(" - "));
        plusButton.appendChild(document.createTextNode(" + "));
        minusButton.className = "minus-button";
        plusButton.className = "plus-button";
        minusButton.setAttribute("title", "decrement the current food item portion");
        plusButton.setAttribute("title", "increment the current food item portion");
        numberOfPortions.appendChild(document.createTextNode("0"));
        parent.addEventListener("click", event => {
            if(event.target.classList.contains("minus-button")){
                if (this.data.portions > 0){
                    this.data.portions--;
                    totalPortions--;
                    this.data.stock++;
                    totalPrice -= parseFloat(this.data.price);
                    this.updatePortion(numberOfPortions, this.data.portions);
                    updateShoppingBasket(this);
                }
            }
            if(event.target.classList.contains("plus-button")){
                if (this.data.portions < this.data.stock){
                    this.data.portions++;
                    totalPortions++;
                    this.data.stock--;
                    totalPrice += parseFloat(this.data.price);
                    this.updatePortion(numberOfPortions, this.data.portions);
                    updateShoppingBasket(this);
                } else {
                    alert("Sorry, but we can't give you more of this food item, because it would exceed our stock!");
                }
            }
        })
        parent.appendChild(minusButton);
        parent.appendChild(numberOfPortions);
        parent.appendChild(plusButton);
        this.presentation.appendChild(parent);
    };

    updatePortion(presentation, value){
        if (value === 0){ // styling the card as selected when a portion is not zero.
            this.presentation.className = this.presentation.className.replace(" card--selected", "");
        } else {
            this.presentation.classList.add("card--selected");
        };
        presentation.textContent = value;
    };

};



class Food { // Data singleton. This is for shared properties. Do not instantiate it.
    price = 0;
    icon = "";
    calories = 0;
    allergies = [];
    name = "";
    portions = 0;
    stock = 0;
    presentationHandler = null;
    constructor(properties){
        for (let key in properties){
            this[key] = properties[key];
        };
        this.presentationHandler = new FoodSection(this); // Pass Data to Presentation layer.
        MenuSection.data.push(this);
    };
};


// Derivatives of Food.
// "IsA" relationship with Food. These can be instantiated.
class IceCream extends Food {};
class Beverage extends Food {};
class Snack extends Food {};
class Hamburger extends Food {};

// Food items.
// Use JSON files for data? Keyword arguments? One object argument?
new IceCream({name: "Vanilla", allergies: ["milk"], icon: "ice-cream_White.png", price: "2.35", stock: 100}); 
new IceCream({name: "Hazel", allergies: ["milk", "milk"], icon: "ice-cream_Brown.png", price: "2.10", stock: 200});
new IceCream({name: "Pistache", allergies: ["milk", "nuts"], icon: "ice-cream_Green.png", price: "1.20", stock: 130});
new IceCream({name: "Strawberry Cheesecake", allergies: ["milk", "fruit", "gluten"], icon: "ice-cream_Pink.png", price: "3.10", stock: 30});
new IceCream({name: "Blueberry and Raspberry", allergies: ["fruit"], icon: "ice-cream_Purple.png", price: "2.45", stock: 66});
new IceCream({name: "Smurf", allergies: ["milk"], icon: "ice-cream_Blue.png", price: "1.75", stock: 44});
new IceCream({name: "Brown Butter Pecan", allergies: ["milk"], icon: "ice-cream_Orange.png", price: "3.25", stock: 238});
new IceCream({name: "Lime", allergies: [], icon: "lime-cone.png", price: "1.20", stock: 8});
new IceCream({name: "Melon", allergies: [], icon: "melon-cone.png", price: "1.60", stock: 23});
new IceCream({name: "Cookie", allergies: ["milk", "gluten"], icon: "cookie-cone.png", price: "1.70", stock: 325});

new Beverage({name: "Coca-Cola", allergies: [], icon: "coca-cola.png", price: "2.30", stock: 110});
new Beverage({name: "Fanta Orange", allergies: [], icon: "fanta-orange.png", price: "2.20", stock: 50});
new Beverage({name: "Sprite", allergies: [], icon: "sprite.png", price: "2.00", stock: 5});

new Snack({name: "Fries", allergies: [], icon: "frietje.png", price: "2,50", stock: 500});
new Snack({name: "Frikandel", allergies: [], icon: "frikandel.png", price: "2,00", stock: 150});
new Snack({name: "Kroket", allergies: ["gluten"], icon: "kroket_van_dobben.png", price: "2,50", stock: 150});
new Snack({name: "Cheese Soufle", allergies: ["gluten","milk"], icon: "kaassouffle.png", price: "2,00", stock: 25});
new Snack({name: "Spring Roll", allergies: [], icon: "loempia_deluxe.png", price: "3,00", stock: 99});

new Hamburger({name: "Classic Burger", allergies: ["gluten"], icon: "classic_burger.png", price: "5,00", stock: 250});
new Hamburger({name: "Hamburger Deluxe", allergies: ["gluten","milk"], icon: "whopper_burger.png", price: "6,00", stock: 199});
new Hamburger({name: "Veggie Burger", allergies: ["gluten"], icon: "veggie_burger.png", price: "5,50", stock: 99});
new Hamburger({name: "Cheeseburger", allergies: ["gluten","milk"], icon: "cheeseburger.png", price: "6,00", stock: 199});
new Hamburger({name: "Bacon Burger", allergies: ["gluten","milk"], icon: "bacon_burger.png", price: "5,20", stock: 199});