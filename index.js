//render login page
let currentUser = "testName";

const getMainDiv = document.querySelector("#main");

function renderApp() {
    renderLoginPage();
    // renderSongPage();
    // renderViewLikes();
}

function renderLoginPage() {
        //render logo/text
        const headerText = document.createElement("h1");
        headerText.textContent = "songMatch";
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
            //render the song page
            renderSongPage();
        })
}

function renderSongPage() {
    // remove html from previous page
    getMainDiv.innerHTML = "";

    //top bar
    const topBar = document.createElement("div");
    const userH1 = document.createElement("h1");
    const viewLikesBtn = document.createElement("button");

    //songs
    const songDiv = document.createElement("div");
    const songImg = document.createElement("img");
    const dislikeBtn = document.createElement("button");
    const likeBtn = document.createElement("button");

    // <---Top Bar-->
    topBar.id = "topBar";
    // append to topBar Div 
    topBar.appendChild(userH1);
    topBar.appendChild(viewLikesBtn);

    userH1.innerText = currentUser;
    viewLikesBtn.textContent = "View Likes";

    //<--Songs App -->
    songDiv.id = "songDiv";
    songDiv.appendChild(songImg);
    songDiv.appendChild(dislikeBtn);
    songDiv.appendChild(likeBtn);

    //create logic to display songs

    songImg.src = "https://m.media-amazon.com/images/I/41gr3r3FSWL._SY346_.jpg";
    songImg.id = "songImg";

    dislikeBtn.textContent = "Dislike";
    likeBtn.textContent = "Like";

    //<---Tool Tips -->
    const toolDiv = document.createElement("div");
    const toolText = document.createElement("h4");
    toolText.innerHTML = "Click on the Song For Play/Pause";
    toolDiv.id = "toolDiv";
    toolDiv.className = "hidden";
    toolDiv.appendChild(toolText);
    getMainDiv.appendChild(toolDiv);

    //<---Event Listeners--->

    // on hover of image create tooltip 
    songImg.addEventListener("mouseover", (e) => {
        toolDiv.classList.toggle("hidden");
        console.log("mouseover");
    })
    songImg.addEventListener("mouseout", (e) => {
        toolDiv.classList.toggle("hidden");
        console.log("mouseout");
    })
 
    // like button
    likeBtn.addEventListener("click", (e) => {
        //post to current users likes in db.json
    })

    //view likes button
    viewLikesBtn.addEventListener("click", (e) => {
        //remove html from previous page
        getMainDiv.innerHTML = "";

        //render view likes page
        renderViewLikes();
    })

    //append to main div for rendering
    getMainDiv.appendChild(topBar);
    getMainDiv.appendChild(songDiv);
}

function renderViewLikes(){
    // remove html from previous page
    getMainDiv.innerHTML = "";

    // <---render html for View Likes Page-->
    const topBar = document.createElement("div");
    const userH1 = document.createElement("h1");
    const shopBtn = document.createElement("button");

    const likesDiv = document.createElement("div");

    // <---Top Bar-->
    topBar.id = "topBar";
    // append to topBar Div 
    topBar.appendChild(userH1);
    topBar.appendChild(shopBtn);
    
    userH1.innerText = currentUser;
    shopBtn.textContent = "Return To Shopping";

    // <---Display Liked Songs-->
    

    //Create Logic for Displaying your likes stored in db.json

    getMainDiv.appendChild(topBar);
    getMainDiv.appendChild(likesDiv);

    //<---Event Listeners-->
    shopBtn.addEventListener("click", (e) => {
        //remove previous pages html
        getMainDiv.innerHTML = "";
        renderSongPage();
    })
}


//Display After DOM Content Has Rendered
document.addEventListener("DOMContentLoaded", () => {
    renderApp();
});