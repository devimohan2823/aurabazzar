function nextStep(stepNumber) {

    document.querySelectorAll(".step")
        .forEach(step => {
            step.classList.remove("active");
        });

    document.getElementById("step" + stepNumber)
        .classList.add("active");

    // Progress Bar
    let progress = 0;

    if (stepNumber === 1) {
        progress = 33;
    }

    if (stepNumber === 2) {
        progress = 66;
    }

    if (stepNumber === 3) {
        progress = 100;
    }

    document.getElementById("progressFill")
        .style.width = progress + "%";
}

// Password Validation
const password = document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const passwordMessage =
    document.getElementById("passwordMessage");

confirmPassword.addEventListener("keyup", () => {

    if (password.value === confirmPassword.value) {

        passwordMessage.innerHTML =
            "Passwords Match";

        passwordMessage.style.color = "lightgreen";

    } else {

        passwordMessage.innerHTML =
            "Passwords Do Not Match";

        passwordMessage.style.color = "red";
    }

});

// Form Submit
document.getElementById("signupForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let firstName = document.querySelector('[name="firstName"]').value;
    let lastName = document.querySelector('[name="lastName"]').value;
    let email = document.querySelector('[name="email"]').value;
    let mobile = document.querySelector('[name="mobileNumber"]').value;
    let gender = document.querySelector('[name="gender"]').value;

    let user = {
        firstName,
        lastName,
        email,
        mobile,
        gender
        

    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    console.log("Saved Users:", users); // DEBUG CHECK

    alert("Signup Successful!");

    window.location.href = "login.html";

});

// loggeg out
function logout(){

    alert("Logged Out");

    localStorage.removeItem("loggedUser");

    window.location.href = "index.html";

}