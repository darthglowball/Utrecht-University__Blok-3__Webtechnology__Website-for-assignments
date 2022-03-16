importHTML(`
<footer class="footer">
    <div class="website-styler website-styler--hidden">
        <form class="form styler-form">
            <button class="styler-form__closeBtn">X</button>
            <fieldset id="element-selector-field">
                <legend>Select down below the element you would like to style</legend>
            </fieldset>
            <div class="form-flex-container">
                <fieldset>
                    <legend>General</legend>
                    <div class="form__row">
                        <label class="form__label" for="backgroundColor">Background color: </label>
                        <div class="form__input">
                            <input type="color" name="backgroundColor">
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Font</legend>
                    <div class="form__row">
                        <label class="form__label" for="fontSize">Font size: </label>
                        <div class="form__input">
                            5<input type="range" min="5" max="25" name="fontSize">25
                        </div> 
                    </div>
                    <div class="form__row">
                        <label class="form__label" for="fontColor">Font color: </label>
                        <div class="form__input">
                            <input type="color" name="fontColor">
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Border appearence</legend>
                    <div class="form__row">
                        <label class="form__label" for="borderSize">Border size: </label>
                        <div class="form__input">
                            0<input type="range" min="0" max="25" name="borderSize">25
                        </div>
                    </div>
                    <div class="form__row">
                        <label class="form__label"for="borderRadius">Border radius: </label>
                        <div class="form__input">
                            0<input type="range" min="0" max="5" name="borderRadius">5
                        </div>
                    </div>
                    <div class="form__row">
                        <label class="form__label" for="borderColor">Border color: </label>
                        <div class="form__input">
                            <input type="color" name="borderColor">
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="form__div-submitbtn">
                <button class="form__submitbtn">Submit</button>
            </div>
        </form>
    </div>
    <div class="footer-container">
        <div class="copyright">
            <p>Copyright © 2022 Delicaato Ice Cream. All rights reserved.</p>
        </div>
        <button class="changeAppearenceBtn">Change appearence</button>
        <div class="socials">
            <ul alt="follow us on these social media platforms" class="footerList follow-us">
                Follow us:
                <li>
                    <a href="https://www.instagram.com/" class="fa fa-instagram"></a>
                </li>
                <li>
                    <a href="https://www.facebook.com/" class="fa fa-facebook"></a>
                </li>
                <li>
                    <a href="https://www.twitter.com/" class="fa fa-twitter"></a>
                </li>
            </ul>
        </div>
    </div>
</footer>
`)
