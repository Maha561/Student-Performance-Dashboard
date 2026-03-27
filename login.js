
// If already logged in → go to dashboard
const isLoggedIn = localStorage.getItem("loggedIn");

if(isLoggedIn === "true"){
    window.location.href = "index.html";
}

// Get form
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorMsg = document.getElementById("errorMsg");

    // Simple login check
    if(username === "admin" && password === "1234"){

        // Save login status
        localStorage.setItem("loggedIn", "true");

        // Redirect to dashboard
        window.location.href = "index.html";

    }else{

        errorMsg.textContent = "Invalid username or password";

    }

});