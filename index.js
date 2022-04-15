let express = require("express");
const router = express.Router;
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let crypto = require("crypto");
let session = require("express-session");
const fs = require("fs");
const path = require('path');

let app = express();

const logger = require('./middleware/logger');
const defaultErrorHandler = require('./middleware/defaultErrorHandler');
const database = require("./database/database");
const routing = require("./routing/router");

const PORT = 8060

//app.use(express.json()); ???
app.use(logger);
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({"cookie": {"httpOnly": false, "secure": true, "maxAge": null}, "name": "session", "secret": crypto.createHash("sha256").update(Math.random().toString()).digest("hex")}));

//Set static folder
app.use('/',routing);
app.use(express.static(path.join(__dirname,'public')));

function isSingleStringInputClean(input){ // used to make a general format for strings in the database.
    let index = 0;
    for (let value of input.matchAll("[a-zA-Z0-9_-]")){ index++ };
    if (index + 1 === input.length){ return true };
    return false;
};

function isMultiStringInputClean(input){
    let allClean = [];
    input.forEach((item) => {
        if (typeof(item) === "array"){
            allClean.push(item.every(subItem => isInputClean(subItem)));
        } else if (typeof(item) === "object"){
            allClean.push(Object.keys(item).every(isInputClean));
            allClean.push(Object.values(item).every(isInputClean));
        } else {
            allClean.push(item.every(isInputClean));
        };
    });
    return allClean;
};

function getUserLoggedIn(sessionId){
    let userInfo = database.getCells("Users", null, {"sessionId": sessionId});
    return JSON.stringify(userInfo); // if there's a user with the sessionId, they're logged in, so return some info about them.
};

//app.use('/',routing);

app.use(defaultErrorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//database.original.close(); // necessary?
