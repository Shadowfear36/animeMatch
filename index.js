//render login page
let currentUser;
let currentUserId;
let currentLikesArr;
let currentAnimeId;
// set Default Index 
let index = 1;

const dbUrl = "http://localhost:3000/users/";

const getMainDiv = document.querySelector("#main");

function renderApp() {
    renderLoginPage();
    // renderAnimePage();
    // renderViewLikes();
}

function renderLoginPage() {
        //render logo/text
        const logo = document.createElement("img");
        const headerText = document.createElement("h1");
        headerText.textContent = "animeMatch";
        headerText.className = "loginHeader";
        logo.id = "logoImage";
        logo.src = "https://cdn.myanimelist.net/images/characters/12/265641.jpg"
    
        //create login form
        const signUpForm = document.createElement("form");
        const userNameInput = document.createElement("input");
        const passwordInput = document.createElement("input");
        const loginBtn = document.createElement("button");
        const signUpBtn = document.createElement("button");
        const formDiv = document.createElement("div");
    
        //append inputs to login form
        getMainDiv.appendChild(logo);
        formDiv.appendChild(headerText);
        formDiv.appendChild(userNameInput);
        formDiv.appendChild(signUpForm);
        signUpForm.appendChild(userNameInput);
        signUpForm.appendChild(passwordInput);
        signUpForm.appendChild(signUpBtn);
        // signUpForm.appendChild(signUpBtn);
    
        //form styles
        // signUpForm.classList.add("signUpForm");
        // signUpBtn.classList.add("centered");
        formDiv.classList.add("signUpForm");

        //user name input styles
        userNameInput.type = "text";
        userNameInput.placeholder = "Username";
        userNameInput.id = "userNameInput";
        userNameInput.required = true;
        // userNameInput.style.display = "block";
        userNameInput.classList.add("centered");
    
        //password input styles
        passwordInput.type = "text";
        passwordInput.placeholder = "Password";
        passwordInput.id = "passwordInput";
        passwordInput.required = true;
        // passwordInput.style.display = "block";
        passwordInput.classList.add("centered");
    
        //login btn styles
        loginBtn.textContent = "Login";
        loginBtn.type = "submit";
        loginBtn.id = "loginBtn";
        loginBtn.name = "formBtn";
        loginBtn.value = "Login";
    
        //sign up btn styles
        signUpBtn.textContent = "Sign up";
        signUpBtn.type = "submit";
        signUpBtn.id = "signUpBtn";
        signUpBtn.name = "formBtn";
        signUpBtn.value = "SignUp";
        // signUpBtn.style.display = "block";
        signUpBtn.classList.add("centered");
    
        //append created items to Div
        getMainDiv.appendChild(headerText);
        getMainDiv.appendChild(formDiv);
    
        //<--EVENT LISTENERS-->
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // post to database at db.json
            const userName = userNameInput.value;
            const password = passwordInput.value;

            fetch(dbUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "index": index,
                    "userName": userName,
                    "password": password,
                    "likes": []
                })
            })
            .then(res => res.json())
            .then(user => {
                //set current User Id and 
                currentUserId = user.id
                currentLikesArr = user.likes
                console.log(currentLikesArr);
                console.log(currentUserId);
            })
            .catch(err => console.log(err));

            //set current user to current user input value
            currentUser = userName
            
            //render the anime page
            renderAnimePage();
        })
}

function renderAnimePage() {

    // remove html from previous page
    getMainDiv.innerHTML = "";

    //top bar
    const topBar = document.createElement("div");
    const userH1 = document.createElement("h1");
    const viewLikesBtn = document.createElement("button");

    //Anime
    const animeDiv = document.createElement("div");
    const animeCover = document.createElement("img");
    const dislikeBtn = document.createElement("button");
    const likeBtn = document.createElement("button");

    // <---Top Bar-->
    topBar.id = "topBar";

    // append to topBar Div 
    topBar.appendChild(userH1);
    topBar.appendChild(viewLikesBtn);

    userH1.innerText = currentUser;
    viewLikesBtn.textContent = "View Likes";

    //<--Anime App -->
    animeDiv.id = "animeDiv";
    animeDiv.appendChild(animeCover);
    animeDiv.appendChild(likeBtn);
    animeDiv.appendChild(dislikeBtn);

    // Anime App Styles
    animeDiv.style.display = "block";
    animeCover.style.display = "block";

    //Logic to display Anime

    animeCover.src = "";
    animeCover.id = "animeCover";

    fetchDataByIndex(index);

    dislikeBtn.textContent = "Dislike";
    likeBtn.textContent = "Like";

    dislikeBtn.id = "likeBtn";
    likeBtn.id = "likeBtn";

    //<---Tool Tips -->
    const toolDiv = document.createElement("div");
    const toolText = document.createElement("h4");
    toolText.innerText = "Click On Image For Description";
    toolDiv.id = "toolDiv";
    toolDiv.className = "hidden";
    toolDiv.appendChild(toolText);

    //<--Information Display -->
    const infoDiv = document.createElement("div");
    const infoTitle = document.createElement('h2');
    const animeReleaseDate = document.createElement('h3');
    infoDiv.id = "infoDiv";
    infoDiv.className = "hidden";
    infoTitle.innerText = "";
    animeReleaseDate.innerText = "";
    infoDiv.appendChild(infoTitle);
    infoDiv.appendChild(animeReleaseDate);

    //<---Event Listeners--->

    // on hover of image create tooltip 
    animeCover.addEventListener("mouseover", (e) => {
        toolDiv.classList.toggle("hidden");
        console.log("mouseover");
    })
    animeCover.addEventListener("mouseout", (e) => {
        toolDiv.classList.toggle("hidden");
        console.log("mouseout");
    })
    //On Click of Image Cover To Display Details
    animeCover.addEventListener("click", (e) => {
        infoDiv.classList.toggle("hidden");
        console.log("Clicked To See Details");
    })
 
    // like button
    likeBtn.addEventListener("click", (e) => {

        let payLoad = {
            "index": index,
            "animeTitle": infoTitle.innerText,
            "releaseDate": animeReleaseDate.innerText,
            "animeCover": animeCover.src
        };

        // render new anime
        index++;
        fetchDataByIndex(index);

        // grab currentLikes data and add the payLoad To it
        currentLikesArr.push(payLoad);

        // patch current users likes in db.json
        fetch(dbUrl + currentUserId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                "index": index,
                "likes" : currentLikesArr
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    })

    // dislike button
    dislikeBtn.addEventListener('click', (e) => {
        index++;
        fetchDataByIndex(index);
    })

    //view likes button
    viewLikesBtn.addEventListener("click", (e) => {
        //remove html from previous page
        getMainDiv.innerHTML = "";

        //render view likes page
        renderViewLikes();
    })

    //append to main div for rendering
    getMainDiv.appendChild(toolDiv);
    getMainDiv.appendChild(topBar);
    getMainDiv.appendChild(animeDiv);
    animeDiv.appendChild(infoDiv);

      // create fetch function within to withold scope
      function fetchDataByIndex(index) {
        fetch("https://gogoanime.consumet.org/popular")
        .then((response) => response.json())
        .then((animelist) => {
            animeCover.src = animelist[index].animeImg;
            infoTitle.innerText = animelist[index].animeTitle;
            animeReleaseDate.innerText = animelist[index].releasedDate
      })
      .catch(err => console.log(err));
    }

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
    topBar.id = "topBarLiked";
    // append to topBar Div 
    topBar.appendChild(userH1);
    topBar.appendChild(shopBtn);
    
    userH1.innerText = currentUser;
    shopBtn.textContent = "Return To Like/Dislike";

    // <---Display Liked Animes-->
    fetch(dbUrl + currentUserId)
    .then(res => res.json())
    .then(obj => {
        console.log(obj.likes)
        obj.likes.forEach(element => {

            const likedDiv = document.createElement("div");
            const likedImg = document.createElement("img");
            const likedTitle = document.createElement("h2");

            likedImg.src = element.animeCover;
            likedImg.id = "likedImg"
            likedTitle.innerText = element.animeTitle;

            //append each items resources to main div
            getMainDiv.appendChild(likedDiv);
            likedDiv.appendChild(likedImg);
            likedDiv.appendChild(likedTitle)

        });
    })
    .catch(err => console.log(err));

    //append created items to mainDiv
    getMainDiv.appendChild(topBar);
    getMainDiv.appendChild(likesDiv);

    //<---Event Listeners-->
    shopBtn.addEventListener("click", (e) => {
        //remove previous pages html
        getMainDiv.innerHTML = "";
        renderAnimePage();
    })
}


//Display After DOM Content Has Rendered
document.addEventListener("DOMContentLoaded", () => {
    renderApp();
});