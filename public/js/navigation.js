importHTML(`
<header class="header">
    <a href="" class="logo">
        <img src="../logo.png" alt="company logo: consists of ice cream" >
    </a>
    <nav class="navbar">
        <a href="../home/index.html" class="navbar__button">Home</a>
        <a href="../menu/index.html" class="navbar__button">Menu</a>
        <a href="../locations/index.html" class="navbar__button">Locations</a>
        <a href="../contactUs/index.html" class="navbar__button">Contact us</a>
        <a href="../secret/index.html" class="navbar__button"> Secret</a>
        <!--        <div class="icons">
            <div class="fas fa-bars" class="icon"></div>
        </div>
        -->
    </nav>
    <div id="navbar__login-container">
        <a id="navbar__login-link" style="visibility: hidden" href="../login/index.html">Login</a>
        <a id="navbar__register-link" style="visibility: hidden" href="../register/index.html">Register</a>
        <a id="navbar__user-link" style="visibility: hidden" href="../user/index.html">Profile</a>
        <a id="navbar__logout-link" style="visibility: hidden" href="../userLogout">Logout</a>
    </div>
</header>
`)
