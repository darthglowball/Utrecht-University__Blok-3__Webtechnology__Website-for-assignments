// Presentation Logic of Navigation

fetch(window.location.origin + "/actions/getUserLoggedIn", {method: "GET"})
.then(result => {
    if (result.ok){
        return result.json();
    } else {
        $("navbar__login-container").textContent = "Error: can't get user login state.";
    };
})
.then(data => {
    if (data?.username){
        $("navbar__login-link").style.visibility = "hidden";
        $("navbar__register-link").style.visibility = "hidden";
        $("navbar__logout-link").style.visibility = "visible";
        $("navbar__user-link").style.visibility = "visible";
        $("navbar__user-link").textContent = data.username + "'s Profile";
    } else {
        $("navbar__login-link").style.visibility = "visible";
        $("navbar__register-link").style.visibility = "visible";
        $("navbar__logout-link").style.visibility = "hidden";
        $("navbar__user-link").style.visibility = "hidden";
    };
});
