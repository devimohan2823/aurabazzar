document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Login Successful!");

    window.location.href = "index.html";

});

document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let email = document.querySelector('[name="email"]').value;
    let password = document.querySelector('[name="password"]').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(user => user.email === email);

    if (foundUser) {

        // SAVE LOGGED IN USER
        localStorage.setItem("loggedUser", JSON.stringify(foundUser));

        alert("Login Successful");

        window.location.href = "profile.html";

    } else {
        alert("User not found");
    }

});