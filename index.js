let express = require("express");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let crypto = require("crypto");
let session = require("express-session");
const fs = require("fs");
const path = require('path');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const db = require("./server/database");

let app = express();
let router = express.Router();

const PORT = 8060

//app.use(express.json()); ???
app.use(logger);
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({"cookie": {"httpOnly": false, "secure": true, "maxAge": null}, "name": "session", "secret": crypto.createHash("sha256").update(Math.random().toString()).digest("hex")}));

//Set static folder
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




// Database requests from client.
// Any page
/* router.get("/:rest", (error, request, response, next) => {
    if (request.session.id){ // active session found.
        request.params.rest, request.method, request.body
    };
}); */

router.get("/menu/index.html", (error, request, response, next) => {
    if (request.session.id){
        let user = getUserLoggedIn(request.session.id);
        if (user){ // user is logged in.
            
        } else { // user is anonymous.
            
        };
    };
});


// Actions from client.

router.get("actions/getUserLoggedIn", (error, request, response, next) => {
    response.send(JSON.stringify(getUserLoggedIn(request.session.id)));
});


router.post("actions/loginUser", (error, request, response, next) => { // only the corresponding form should navigate here.
    if (!isMultiStringInputClean(request.body)){
        next(new Error("actions/loginUser: sanitization check failed; one of the inputs is dirty"));
    };
    // perform password check by database or javascript??
    let user = database.getCells(
        "Users",
        ["username", "password"],
        [
            "username=${request.body.username} AND",
            "password=${request.body.password}"
        ],
        next
    );
    if (user){ // successfull login.
        response.redirect("home");
    };
});


router.post("actions/registerUser", (error, request, response, next) => {
    if (!isMultiStringInputClean(request.body)){
        next(new Error("actions/registerUser: sanitization check failed; one of the inputs is dirty"));
    };
    database.pushRecord(
        "Users",
        {
            "username":  request.body.username, 
            "password":  request.body.password,
            "town":      request.body.town,
            "address":   request.body.address,
            "sessionId": request.session.id
        }, 
        next
    );
});


app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//database.original.close(); // necessary?