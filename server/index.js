let express = require("express");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let crypto = require("crypto");
let session = require("express-session");

let router = express.Router();
let app = express();

//app.use(express.json()); ???
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({"cookie": {"httpOnly": false, "secure": true, "maxAge": null}, "name": "session", "secret": crypto.createHash("sha256").update(Math.random().toString()).digest("hex")}));

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
    };
    return allClean;
};

function getUserLoggedIn(sessionId){
    let userInfo = database.getCells("Users", null, {"sessionId" = sessionId});
    return JSON.stringify(userInfo); // if there's a user with the sessionId, they're logged in, so return some info about them.
};


// Maps JSON HTTP body parameters to SQLite commands, does error handling, SQL sanitization, and converts to JSON.
// database has methods that can be called within this script, but client-side Javascript fetch has to use these methods indirectly by using more abstract methods.
// URL path syntax: method(group, instance)
let database = { // singleton: instances itself.
    "init": function(){
        let fs = require("fs");
        this.sqlite = require("sqlite3").verbose();
        this.filePath = __dirname + "/database.db";
        this.fileExists = fs.existsSyncFile(this.filePath);
        this.original = new sqlite.Database(this.filePath);
        if (!this.fileExists){ fs.openSync(filePath, "w") };
        this.original.serialize(()=> {
            if (!this.fileExists){
                this.original.run("CREATE TABLE Users (name INTEGER, password TEXT, email TEXT, address TEXT, creationDate TEXT)");
                this.original.run("CREATE TABLE Orders (id INTEGER, username TEXT, sessionId INTEGER, status TEXT, creationDate TEXT, data TEXT)"); // status: unfinished, pending, closed
                this.original.run("CREATE TABLE Menu (class TEXT, name TEXT, price TEXT, stock INTEGER, allergies TEXT, creationDate TEXT)"); // status: unfinished, pending, closed
            };
        });
    }(),
    "pushRecord": function(table, record, next){ // pushes a record
        let insertion = this.original.prepare("INSERT INTO " + table + "VALUES (?)");
        for (let columnName in record){
            let cellValue = record[columnName];
            insertion.run(columnName + "#" + cellValue);
        };
        insertion.finalize();       
    },
    "setCells": function(table, attributes, attributeConditions, next){
        let query = "UPDATE " + table + " SET ";
        query += JSON.stringify(attributes).slice(1, -1).replaceAll("'", "").replaceAll('"', "").replaceAll(":", "=");
        query += " WHERE " + attributeConditions.toString().replaceAll(",", " ");
        let cells = this.original.run(query);
    },
    "getCells": function(table, columns, attributeConditions, next){ // gets cell(s) by columns, attributeConditions. If columns is null, all columns are selected. If attributeConditions is null, there are no conditions.
        let query = "SELECT " + columns && columns.toString() || "*" + " FROM " + table + attributeConditions && " WHERE " || ";";
        let count = 1;
        let length = attributeConditions.length;
        for (let condition in attributeConditions){
            query += condition + (count === length && " , " || ";");
            count++;
        };
        let cells = this.original.run(query);
        this.original.finalize();
        if (!cells){next(throw Error("Database: getCells failed; no such cell(s) found")}; 
        return cells;
    };
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
)};


router.post("actions/loginUser", (error, request, response, next) => { // only the corresponding form should navigate here.
    if (!isMultiStringInputClean(request.body)){
        next(throw Error("actions/loginUser: sanitization check failed; one of the inputs is dirty");
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
        next(throw Error("actions/registerUser: sanitization check failed; one of the inputs is dirty");
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

app.use((error, request, response, next) => { response.status(500).send("Something failed!")});
module.exports = router;

database.original.close(); // necessary?