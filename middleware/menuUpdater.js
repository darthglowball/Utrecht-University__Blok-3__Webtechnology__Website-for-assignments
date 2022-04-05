const db = require("../server/database");
import menuItems from ("./menuItems.json"); 

const menuUpdater = (req, res, next) => {
    menuItems.forEach(menuItem => {
        Object.keys(menuItem).forEach(key =>{
            db.pushRecord("MENU", key, menuItem[key])
        });
    });
};