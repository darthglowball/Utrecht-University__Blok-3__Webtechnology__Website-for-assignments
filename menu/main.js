let $ = id => document.getElementById(id)
let $$ = selector => document.querySelector(selector)

class Menu { // Singleton container for MenuSection.
    static data = [];
};

// - MenuSection is used as a container for derivatives of Food and for the presentation thereof, so don't have Data classes inherit from it.
// - "HasA" relationship with Menu.
class MenuSection {
    static data = [];
    constructor(name){
        this.presentation = document.createElement("section");
        this.presentation.className = "card-container menu-section";
        this.presentation.id = "menu-section__" + name;
        let title = document.createElement("h2");
        title.className = "menu-section__title";
        title.appendChild(document.createTextNode(name + "s"));
        $("content-container").appendChild(title);
        $("content-container").appendChild(this.presentation);
        Menu.data.push(this);
    };
};

new MenuSection("IceCream");
new MenuSection("Beverage");
new MenuSection("Fry");
new MenuSection("Salad");
new MenuSection("Hamburger");



class FoodSection { // Presentation (& handler) of a Food derivative. Do not instantiate it.
    static dot_choices = {"milk" : "red", "nuts" : "green", "gluten" : "yellow", "fruit" : "blue"}
    data = null;
    presentation = document.createElement("article");
    constructor(data){
        this.data = data;
        this.presentation.className = "card " + this.data.constructor.name + "__" + this.data.name.replace(" ", "-");
        let icon = document.createElement("img");
        let description = document.createElement("p");
        let allergies = document.createElement("p");
        let allergy = document.createElement("p");
        icon.setAttribute("src", "./images/" + this.data.icon);
        let description_text = this.data.name.replace(/[A-Z]/g, match => " " + match) + " " + this.data.constructor.name.replace(/[A-Z]/g, match => " " + match); // Replaces CamelCase with spaces.
        icon.setAttribute("alt", description_text);
        description.appendChild(document.createTextNode(description_text));
        allergies.appendChild(document.createTextNode("Allergies: "));
        this.presentAllergies(allergies);
        this.presentation.appendChild(icon);
        this.presentation.appendChild(description);
        this.presentation.appendChild(allergies);
        $("menu-section__" + this.data.constructor.name).appendChild(this.presentation);
    };
    
    presentAllergies(parent){
        if (this.data.allergies.length === 0){
            parent.appendChild(document.createTextNode("none"));
        }
        for (let allergy of this.data.allergies){
            let dot = document.createElement("span");
            let dot_color = this.constructor.dot_choices[allergy];
            if (dot_color){ // if a valid color was matched with an allergy.
                dot.className = "dot dot__" + dot_color;
                parent.appendChild(dot);
            } else {
                console.log("Warning: allergy_dot could not be matched with a color.");
            };
        };
    };
};



class Food { // Data singleton. This is for shared properties. Do not instantiate it.
    price = 0;
    icon = "";
    calories = 0;
    allergies = [];
    name = ""
    amount = 0;
    stock = 0;
    presentation_handler = null;
    constructor(name, allergies, icon, price, stock){
        [this.name, this.allergies, this.icon, this.price, this.stock] = [name, allergies, icon, price, stock];
        this.presentation_handler = new FoodSection(this); // Pass Data to Presentation layer.
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
new IceCream("Pistache", ["milk", "milk"], "ice-cream_Green.png", "1.20", 130);
new IceCream("Strawberry Cheesecake", ["milk", "fruit", "gluten"], "ice-cream_Pink.png", "3.10", 30);
new IceCream("Blueberry and Raspberry", ["fruit"], "ice-cream_Purple.png", "2.45", 66);
new IceCream("Smurf", ["milk"], "ice-cream_Blue.png", "1.75", 44);
new IceCream("Brown Butter Pecan", ["milk"], "ice-cream_Orange.png", "3.25", 238);
new IceCream("Lime Cheesecake", [], "lime-cone.jpg", "1.20", 8);
new IceCream("Melon Cheesecake", [], "melon-cone.png", "1.60", 23);
new IceCream("Cookie", ["milk", "gluten"], "cookie-cone.jpg", "1.70", 325);

new Beverage("Coca-Cola", [], "coca-cola.png", "2.30", 110);
new Beverage("Fanta Orange", [], "fanta-orange.png", "2.20", 50);