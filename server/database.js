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
        this.original = new sqlite.Database(this.filePath);
        if (!this.fileExists){ fs.openSync(filePath, "w") };
        this.original.serialize(()=> {
            if (!this.fileExists){
                this.original.run("CREATE TABLE Users (name INTEGER, password TEXT, email TEXT, address TEXT, creationDate TEXT)");
                this.original.run("CREATE TABLE Orders (id INTEGER, username TEXT, sessionId INTEGER, status TEXT, creationDate TEXT, data TEXT)"); // status: unfinished, pending, closed
                this.original.run("CREATE TABLE Menu (class TEXT, name TEXT, allergies TEXT, icon TEXT, price TEXT, stock INTEGER, creationDate TEXT)");
                this.original.run("CREATE TABLE Reviews (username TEXT, rating INTEGER, comment TEXT, creationDate TEXT)");
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
        if (!cells){next(new Error("Database: getCells failed; no such cell(s) found"))}; 
        return cells;
    }
};

module.exports = db;
