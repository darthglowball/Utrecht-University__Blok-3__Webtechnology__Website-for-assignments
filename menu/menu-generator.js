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
        this.presentation.id = "menu-section__" + name;
        let title = document.createElement("h2");
        title.className = "menu-section__title";
        title.appendChild(document.createTextNode(name + "s"));
        parent.insertBefore(title, sibling);
        parent.insertBefore(this.presentation, sibling);
        Menu.data.push(this);
    };
};

new MenuSection("IceCream");
new MenuSection("Beverage");
new MenuSection("Fry");
new MenuSection("Salad");
new MenuSection("Hamburger");



class FoodSection { // Presentation (& handler) of a Food derivative. Do not instantiate it.
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
        let portionSelector = document.createElement("div");
        this.presentIcon(this.icon, descriptionText);
        this.presentPortionSelector(portionSelector);
        this.presentDescription(description, descriptionText);
        this.presentPrice(price);
        this.presentAllergies(allergies);
        $("menu-section__" + this.data.constructor.name).appendChild(this.presentation);
    };
    
    presentDescription(parent, descriptionText){
        parent.appendChild(document.createTextNode(descriptionText));
        this.presentation.appendChild(parent);
    };

    presentIcon(parent, descriptionText){
        parent.setAttribute("src", "./images/" + this.data.icon);
        parent.setAttribute("alt", descriptionText);
        this.presentation.appendChild(parent);
    };

    presentPrice(parent){
        parent.appendChild(document.createTextNode("Price: $" + this.data.price));
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
        minusButton.appendChild(document.createTextNode("-"));
        plusButton.appendChild(document.createTextNode("+"));
        numberOfPortions.appendChild(document.createTextNode("0"));
        plusButton.addEventListener("click", ()=> {
            this.data.portions++;
            totalPortions++;
            totalPrice += parseFloat(this.data.price);
            this.updatePortion(numberOfPortions, this.data.portions);
            updateShoppingBasket(this);
        });
        minusButton.addEventListener("click", ()=> {
            if (this.data.portions > 0){
                this.data.portions--;
                totalPortions--;
                totalPrice -= parseFloat(this.data.price);
                this.updatePortion(numberOfPortions, this.data.portions);
                updateShoppingBasket(this);
            }
        });
        parent.appendChild(minusButton);
        parent.appendChild(numberOfPortions);
        parent.appendChild(plusButton);
        this.presentation.appendChild(parent);
    };

    updatePortion(presentation, value){
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
    constructor(name, allergies, icon, price, stock){
        [this.name, this.allergies, this.icon, this.price, this.stock] = [name, allergies, icon, price, stock];
        this.presentationHandler = new FoodSection(this); // Pass Data to Presentation layer.
        MenuSection.data.push(this);
    };
};


// Derivatives of Food.
// "IsA" relationship with Food. These can be instantiated.
class IceCream extends Food {};
class Beverage extends Food {};
class Fry extends Food {};
class Salad extends Food {};
class Hamburger extends Food {};

// Food items.
// Use JSON files for data? Keyword arguments? One object argument?
new IceCream("Vanilla", ["milk"], "ice-cream_White.png", "2.35", 100); 
new IceCream("Hazel", ["milk", "milk"], "ice-cream_Brown.png", "2.10", 200);
new IceCream("Pistache", ["milk", "nuts"], "ice-cream_Green.png", "1.20", 130);
new IceCream("Strawberry Cheesecake", ["milk", "fruit", "gluten"], "ice-cream_Pink.png", "3.10", 30);
new IceCream("Blueberry and Raspberry", ["fruit"], "ice-cream_Purple.png", "2.45", 66);
new IceCream("Smurf", ["milk"], "ice-cream_Blue.png", "1.75", 44);
new IceCream("Brown Butter Pecan", ["milk"], "ice-cream_Orange.png", "3.25", 238);
new IceCream("Lime Cheesecake", [], "lime-cone.png", "1.20", 8);
new IceCream("Melon Cheesecake", [], "melon-cone.png", "1.60", 23);
new IceCream("Cookie", ["milk", "gluten"], "cookie-cone.png", "1.70", 325);

new Beverage("Coca-Cola", [], "coca-cola.png", "2.30", 110);
new Beverage("Fanta Orange", [], "fanta-orange.png", "2.20", 50);




