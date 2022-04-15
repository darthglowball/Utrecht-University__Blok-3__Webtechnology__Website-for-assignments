// Any page
/* router.get("/:rest", (error, request, response, next) => {
    if (request.session.id){ // active session found.
        request.params.rest, request.method, request.body
    };
});

// Use to catch errors:
Promise.resolve().then(function () {
}).catch(console.error);
*/ 
    
const express = require('express')
const router = express.Router()

module.exports = function(parent){
    
    router.get("/menu/index.html", (request, response, next) => {

    });


    // Actions from client.
    router.get("/actions/getUserLoggedInOrderHistory", (request, response, next) => {

    });


    router.get("/actions/getUserLoggedInCurrentOrder", (request, response, next) => {
        let foodItems = db.getCells("Orders", ["data"], `sessionId=${request.session.id}`, next);
        response.send(JSON.stringify(foodItems));
    });


    router.get("/actions/getUserLoggedIn", async (request, response, next) => {
        console.log("Getting user information");
        response.send(await parent.getUserLoggedIn(request.session.id, true));
    });


    router.post("/actions/loginUser", (request, response, next) => { // only the corresponding form should navigate here.
        if (parent.isObjectInputClean(request.body)){
            parent.loginUser(request, next);
        } else {
            next(new Error("actions/loginUser: sanitization check failed; one of the inputs is dirty"));
        };
    });


    router.post("/actions/registerUser", async (request, response, next) => {
        console.log("Registering user:", request.body);
        if (parent.isObjectInputClean(request.body)){
            if (await parent.getUser(request.body.username, false)){
                console.error("Error: actions/registerUser: username already exists.");
                response.status(403).send(parent.serverErrorMessage("Server error: username already exists!"));
            } else {
                parent.registerUser(request, next);
                await parent.loginUser(request, next);
                response.redirect("/home");                
            };
        } else {
            next(new Error("actions/registerUser: sanitization check failed; one of the inputs is dirty"));
        };
    });
    
    return router;
}