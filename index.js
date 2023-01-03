//render login page
let currentUser = "testName";
let currentUserId = 0;

const dbUrl = "http://localhost:3000/users/";

const getMainDiv = document.querySelector("#main");

function renderApp() {
    renderLoginPage();
    // renderAnimePage();
    // renderViewLikes();
}

function renderLoginPage() {
        //render logo/text
        const headerText = document.createElement("h1");
        headerText.textContent = "animeMatch";
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

            fetch(dbUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "userName": userName,
                    "password": password,
                    "likes": ""
                })
            })
            .then(res => res.json())
            .catch(err => console.log(err));

            // set CurrentUserId
            fetch(dbUrl)
            .then(res => res.json())
            .then(users => {
                currentUserId = users.length - 1;
                console.log(currentUserId)
            })

           
            //set current user to current user input value
            currentUser = userName
            //render the anime page
            renderAnimePage();
        })
}

function renderAnimePage() {
    // set Default Index 
    let index = 1;

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
    animeDiv.appendChild(dislikeBtn);
    animeDiv.appendChild(likeBtn);

    // Anime App Styles
    animeDiv.style.display = "block";
    animeCover.style.display = "block";



    //create logic to display Anime

    animeCover.src = "";
    animeCover.id = "animeCover";

    fetchDataByIndex(index);

    dislikeBtn.textContent = "Dislike";
    likeBtn.textContent = "Like";

    //<---Tool Tips -->
    const toolDiv = document.createElement("div");
    const toolText = document.createElement("h4");
    toolText.innerText = "Click On Image For Description";
    toolDiv.id = "toolDiv";
    toolDiv.className = "hidden";
    toolDiv.appendChild(toolText);
    getMainDiv.appendChild(toolDiv);

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
    getMainDiv.appendChild(infoDiv);

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
        let currentLikesArr = [];

        // grab currentLikes
        fetch(dbUrl + 0)
        .then(res => res.json())
        .then(obj => { 
            currentLikesArr.push(obj.likes)
            console.log(currentLikesArr);
        })
        .catch(err => console.log(err))

        // post to current users likes in db.json
        fetch(dbUrl + currentUserId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                "likes" : [{
                    "animeTitle": infoTitle.innerText,
                    "releaseDate": animeReleaseDate.innerText,
                    "animeCover": animeCover.src
                }]
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
    getMainDiv.appendChild(topBar);
    getMainDiv.appendChild(animeDiv);

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

// function renderUserLikes(){
//     fetch(dbUrl)
//         .then(res => res.json())
//         .then(obj => {
//             console.log(obj[currentUserId].likes.forEach(e => {
//                 console.log(e.songTitle)

//             }))
            
//         })
//         .catch(err => console.log(err));
// }

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

    // <---Display Liked Animes-->

    

    //Create Logic for Displaying your likes stored in db.json

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