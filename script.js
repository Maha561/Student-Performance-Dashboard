// Variables to track dashboard statistics
let total = 0;
let passed = 0;
let failed = 0;

// Array to store student data
let students = [];

// Get form and table elements
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Load students from localStorage
const savedStudents = JSON.parse(localStorage.getItem("students"));

if (savedStudents) {

    students = savedStudents;

    students.forEach(function(student) {

        const row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.dept}</td>
            <td>${student.marks}</td>
            <td>${student.status}</td>
            <td><button onclick="deleteRow(this)">Delete</button></td>
        </tr>
        `;

        table.innerHTML += row;

        total++;

        if (student.status === "Pass") {
            passed++;
        } else {
            failed++;
        }

    });

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;
}


// Add Student
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const marks = Number(document.getElementById("marks").value);

    let status = marks >= 50 ? "Pass" : "Fail";

    const student = {
        name: name,
        dept: dept,
        marks: marks,
        status: status
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

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
        <td><button onclick="deleteRow(this)">Delete</button></td>
    </tr>
    `;

    table.innerHTML += row;

    form.reset();
});


// Delete Student
function deleteRow(button) {

    const row = button.parentNode.parentNode;

    const name = row.children[0].textContent;
    const status = row.children[3].textContent;

    students = students.filter(function(student) {
        return student.name !== name;
    });

    localStorage.setItem("students", JSON.stringify(students));

    if (status === "Pass") {
        passed--;
    } else {
        failed--;
    }

    total--;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;

    row.remove();
}


// Department Filter
function filterDepartment() {

    const filter = document.getElementById("deptFilter").value;

    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const dept = rows[i].children[1].textContent;

        if (filter === "All" || dept === filter) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }
}