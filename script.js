let total = 0;
let passed = 0;
let failed = 0;


const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const marks = Number(document.getElementById("marks").value);
    let status = marks >= 50 ? "Pass" : "Fail";

    total++;

if (status === "Pass") {
    passed++;
} else {
    failed++;
}

document.getElementById("totalStudents").textContent = total;
document.getElementById("passedStudents").textContent = passed;
document.getElementById("failedStudents").textContent = failed;

    const row = `
        <tr>
            <td>${name}</td>
            <td>${dept}</td>
            <td>${marks}</td>
            <td>${status}</td>
            <td><button>Delete</button></td>
        </tr>
    `;

    table.innerHTML += row;

});