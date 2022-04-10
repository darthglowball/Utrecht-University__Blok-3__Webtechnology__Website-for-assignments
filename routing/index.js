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
router.get("actions/getUserOrderHistory", (error, request, response, next) => {

)};


router.get("actions/getUserCurrentOrder", (error, request, response, next) => {
    let foodItems = db.getCells("Orders", ["data"], ["sessionId=${request.session.id}"], next);
    response.send(JSON.stringify(foodItems));
});


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
