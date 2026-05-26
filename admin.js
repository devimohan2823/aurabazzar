let users = JSON.parse(localStorage.getItem("users")) || [];

let table = document.getElementById("table");

users.forEach(user => {

    table.innerHTML += `
        <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.gender}</td>
        </tr>
    `;

});