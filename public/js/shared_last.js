// Presentation Logic of Navigation
fetch("/actions/getUserLoggedIn()", {method: "GET"})
.then(result => {
    if (result.ok){
        return result.json();
    } else {
        $("navbar__login-container").textContent = "Error: can't get user login state.";
    };
})
.then(data => {
    if (data.name === "null"){
        $("navbar__login-link").style.visibility = "visible";
        $("navbar__user-link").style.visibility = "hidden";
    } else {
        $("navbar__login-link").style.visibility = "hidden";
        $("navbar__user-link").style.visibility = "visible";
        $("navbar__user-link").textContent = data.name + "'s Profile";
    };
});
