importHTML(`
<footer class="footer">
    <div class="website-styler website-styler--hidden">
        <form class="form styler-form">
            <fieldset id="element-selector-field">
                <label>Select down below the element you would like to style</label>
            </fieldset>
            <fieldset>
                <legend>General</legend>
                <div class="form__row">
                    <label class="form__label" for="backgroundColor">Background color: </label>
                    <input class="form__input" type="color" name="backgroundColor">
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
                    <input class="form__input" type="color" name="fontColor">
                </div>
            </fieldset>
            <fieldset>
                <legend>Border appearence</legend>
                <div class="form__row">
                    <label class="form__label" for="borderSize">Border size: </label>
                    <div class="form__input">
                        0<input type="range" min="0" max="5" name="borderSize">5
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
                    <input class="form__input" type="color" name="borderColor">
                </div>
            </fieldset>
            <button class="form__submitbtn">Submit</button>
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
