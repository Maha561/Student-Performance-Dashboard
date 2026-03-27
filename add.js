
// Login protection
const isLoggedIn = localStorage.getItem("loggedIn");

if(isLoggedIn !== "true"){
    window.location.href = "login.html";
}

// Load existing students
let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const marks = Number(document.getElementById("marks").value);

    let status = marks >= 50 ? "Pass" : "Fail";

    const student = { name, dept, marks, status };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    // After adding → go back to dashboard
    window.location.href = "index.html";

});