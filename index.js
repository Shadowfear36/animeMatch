//render login page
function displayLogin() {

    //render logo/text
    const headerText = document.createElement("h1");
    headerText.textContent = "bookMatch";
    headerText.className = "loginHeader";

    //create login form
    const loginForm = document.createElement("form");
    const userNameInput = document.createElement("input");
    const passwordInput = document.createElement("input");
    const loginBtn = document.createElement("button");

    //append inputs to login form
    loginForm.appendChild(userNameInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(loginBtn);

    //form styles
    loginForm.style.display = "block";

    //user name input styles
    userNameInput.type = "text";
    userNameInput.placeholder = "Username";
    userNameInput.id = "userNameInput";
    userNameInput.required = true;
    userNameInput.style.display = "block";

    //password input styles
    passwordInput.type = "text";
    passwordInput.placeholder = "Password";
    passwordInput.id = "passwordInput";
    passwordInput.required = true;
    passwordInput.style.display = "block";

    //login btn styles
    loginBtn.textContent = "Login";
    loginBtn.type = "submit";
    loginBtn.className = "loginBtn";
    loginBtn.id = "loginBtn";
    loginBtn.style.display = "block";

    //append created items to Div
    const getLoginDiv = document.querySelector("#login");
    getLoginDiv.appendChild(headerText);
    getLoginDiv.appendChild(loginForm);

}


//Display After DOM Content Has Rendered
document.addEventListener("DOMContentLoaded", () => {
    displayLogin();
});