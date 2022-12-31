//render login page
let currentUser = "testName";

const getMainDiv = document.querySelector("#main");

function renderApp() {
    renderLoginPage();
    // renderBookPage();
}

function renderLoginPage() {
        //render logo/text
        const headerText = document.createElement("h1");
        headerText.textContent = "bookMatch";
        headerText.className = "loginHeader";
    
        //create login form
        const loginForm = document.createElement("form");
        const userNameInput = document.createElement("input");
        const passwordInput = document.createElement("input");
        const loginBtn = document.createElement("button");
        const signUpBtn = document.createElement("button");
    
        //append inputs to login form
        loginForm.appendChild(userNameInput);
        loginForm.appendChild(passwordInput);
        loginForm.appendChild(loginBtn);
        // loginForm.appendChild(signUpBtn);
    
        //form styles
        loginForm.style.display = "block";
        loginBtn.classList.add("centered");
    
        //user name input styles
        userNameInput.type = "text";
        userNameInput.placeholder = "Username";
        userNameInput.id = "userNameInput";
        userNameInput.required = true;
        userNameInput.style.display = "block";
        userNameInput.classList.add("centered");
    
        //password input styles
        passwordInput.type = "text";
        passwordInput.placeholder = "Password";
        passwordInput.id = "passwordInput";
        passwordInput.required = true;
        passwordInput.style.display = "block";
        passwordInput.classList.add("centered");
    
        //login btn styles
        loginBtn.textContent = "Login";
        loginBtn.type = "submit";
        loginBtn.id = "loginBtn";
        loginBtn.name = "formBtn";
        loginBtn.value = "Login";
        loginBtn.style.display = "block";
        loginBtn.classList.add("centered");
    
        //sign up btn styles
        // signUpBtn.textContent = "Sign up";
        // signUpBtn.type = "submit";
        // signUpBtn.id = "signUpBtn";
        // signUpBtn.name = "formBtn";
        // signUpBtn.value = "SignUp";
        // signUpBtn.style.display = "block";
        // signUpBtn.classList.add("centered");
    
        //append created items to Div
        getMainDiv.appendChild(headerText);
        getMainDiv.appendChild(loginForm);
    
        //<--EVENT LISTENERS-->
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // post to database at db.json
            const userName = userNameInput.value;
            const password = passwordInput.value;
           
            //set current user to current user input value
            currentUser = userName
            //render the book page
            renderBookPage();
        })
}

function renderBookPage() {
    // remove html from previous page
    getMainDiv.innerHTML = "";

    //top bar
    const topBar = document.createElement("div");
    const userH1 = document.createElement("h1");
    const viewLikesBtn = document.createElement("button");

    //books
    const bookDiv = document.createElement("div");
    const bookImg = document.createElement("img");
    const dislikeBtn = document.createElement("button");
    const likeBtn = document.createElement("button");

    // <---Top Bar-->
    topBar.id = "topBar";
    // append to topBar Div 
    topBar.appendChild(userH1);
    topBar.appendChild(viewLikesBtn);

    userH1.innerText = currentUser;
    viewLikesBtn.textContent = "View Likes";

    //<--Books App -->
    bookDiv.id = "bookDiv";
    bookDiv.appendChild(bookImg);
    bookDiv.appendChild(dislikeBtn);
    bookDiv.appendChild(likeBtn);

    //create logic to display books

    bookImg.src = "https://m.media-amazon.com/images/I/41gr3r3FSWL._SY346_.jpg";
    bookImg.id = "bookImg";

    dislikeBtn.textContent = "Dislike";
    likeBtn.textContent = "Like";

    //<---Tool Tips -->
    const toolDiv = document.createElement("div");
    const toolText = document.createElement("h4");
    toolText.innerHTML = "Click on the Book Cover For Details";
    toolDiv.id = "toolDiv";
    toolDiv.className = "hidden";
    toolDiv.appendChild(toolText);
    getMainDiv.appendChild(toolDiv);
    

    //<---Event Listeners--->
    // on hover of image create tooltip 
    bookImg.addEventListener("mouseover", (e) => {
        toolDiv.classList.toggle("hidden");
        console.log("mouseover");
    })
    bookImg.addEventListener("mouseout", (e) => {
        toolDiv.classList.toggle("hidden");
        console.log("mouseout");
    })
 
    // like button
    likeBtn.addEventListener("click", (e) => {
        //post to current users likes in db.json
    })

    //append to main div for rendering
    getMainDiv.appendChild(topBar);
    getMainDiv.appendChild(bookDiv);
}

function renderViewLikes(){
    // remove html from previous page
    getMainDiv.innerHTML = "";

    // <---render html for View Likes Page-->
    const topBar = document.createElement("div");
    const userH1 = document.createElement("h1");
}


//Display After DOM Content Has Rendered
document.addEventListener("DOMContentLoaded", () => {
    renderApp();
});