const sqlite3 = require("sqlite3");
const fs = require("fs");

// Maps JSON HTTP body parameters to SQLite commands, does error handling, SQL sanitization, and converts to JSON.
// database has methods that can be called within this script, but client-side Javascript fetch has to use these methods indirectly by using more abstract methods.
// URL path syntax: method(group, instance)asdfadsfsadf

let db = { // singleton: instances itself.
    "init": function(){
        this.sqlite = sqlite3.verbose();
        this.filePath = __dirname + "/database.db";
        this.fileExists = fs.existsSync(this.filePath);
        this.original = new this.sqlite.Database(this.filePath);
        if (!this.fileExists){ fs.openSync(this.filePath, "w") };
        this.original.serialize((()=> {
            if (!this.fileExists){
                this.original.run("CREATE TABLE Users (username TEXT, password TEXT, email TEXT, address TEXT, town TEXT, creationDate INT);");
                this.original.run("CREATE TABLE Orders (id INT, username TEXT, status TEXT, creationDate INT, data TEXT);"); // status: unfinished, pending, closed. Order history should be retrieved from Orders by username.
                this.original.run("CREATE TABLE Menu (class TEXT, name TEXT, allergies TEXT, icon TEXT, price TEXT, stock INT, creationDate INT);");
                this.original.run("CREATE TABLE Sessions (id TEXT, username TEXT, _order INT, creationDate INT);");
                console.log("DATABASE CREATED");
            } else {
                this.original.run("DROP TABLE Sessions;"); // clear sessions on startup
                this.original.run("CREATE TABLE Sessions (id TEXT, username TEXT, _order INT, creationDate INT);");
                console.log("DATABASE SESSIONS CLEARED");
            };
        }).bind(this));
    },
    "pushRecord": function(table, record, next){ // pushes a record
        let query = "INSERT INTO " + table + ` (${Object.keys(record).toString()}) VALUES (${'?,'.repeat(Object.keys(record).length).slice(0,-1)});`;
        let insertion = this.original.prepare(query); // generates the questionmarks to prevent SQL injection
        insertion.run(...Object.values(record));
        console.log("Database command: ", query);
        insertion.finalize();
    },
    "setCells": function(table, attributes, attributeConditions, next){
        let query = "UPDATE " + table + " SET ";
        query += JSON.stringify(attributes).slice(1, -1).replaceAll("'", "").replaceAll('"', "").replaceAll(":", "=");
        query += " WHERE " + attributeConditions.toString().replaceAll(",", " ");
        console.log("Database command: ", query);
        let cells = this.original.run(query);
    },
    "getCells": async function(table, columns, attributeConditions, next){ // gets cell(s) by columns, attributeConditions. If columns is null, all columns are selected. If attributeConditions is null, there are no conditions.
        let query = "SELECT " + (columns && columns?.toString() || "*") + " FROM " + table + (attributeConditions && ` WHERE ${attributeConditions}`) + ";";
        let database = this;
        console.log("Database command: ", query);
        let cellsPromise = new Promise(function(resolve, reject) {
            database.original.serialize(() => {
                database.original.all(query, function(err, cells) {
                    resolve(cells);
                    if (Object.keys(cells).length === 0){ reject("Database: getCells failed; no such cell(s) found") }; 
                });
            });
        });
        return cellsPromise;
    }
};

db.init()

module.exports = db;
