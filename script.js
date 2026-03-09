// Variables to track dashboard statistics
let total = 0;
let passed = 0;
let failed = 0;

// Array to store student data
let students = [];

// Get form and table elements from HTML
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Load saved students from browser localStorage when the page opens
const savedStudents = JSON.parse(localStorage.getItem("students"));

if (savedStudents) {

    // Assign saved data back to the students array
    students = savedStudents;

    // Loop through each student and display in the table
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

        // Add the row to the table
        table.innerHTML += row;

        // Update dashboard counters
        total++;

        if (student.status === "Pass") {
            passed++;
        } else {
            failed++;
        }

    });

    // Display updated counters in the dashboard
    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;
}

// Event listener for form submission (Add Student)
form.addEventListener("submit", function(event) {

    // Prevent page reload
    event.preventDefault();

    // Get input values from the form
    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const marks = Number(document.getElementById("marks").value);

    // Determine pass or fail based on marks
    let status = marks >= 50 ? "Pass" : "Fail";

    // Create a student object
    const student = {
        name: name,
        dept: dept,
        marks: marks,
        status: status
    };

    // Store the student object in the array
    students.push(student);

    // Save the updated array to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Update dashboard counters
    total++;

    if (status === "Pass") {
        passed++;
    } else {
        failed++;
    }

    // Display updated counters
    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;

    // Create a new table row for the student
    const row = `
    <tr>
        <td>${name}</td>
        <td>${dept}</td>
        <td>${marks}</td>
        <td>${status}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    </tr>
    `;

    // Add the row to the table
    table.innerHTML += row;

    // Reset form fields
    form.reset();
});

// Function to delete a student row from the table
function deleteRow(button) {

    // Get the table row of the clicked delete button
    const row = button.parentNode.parentNode;

    // Get student name and status from the row
    const name = row.children[0].textContent;

    // Get the pass/fail status from the row
    const status = row.children[3].textContent;

    // remove that student from array
    students = students.filter(function(student) {
        return student.name !== name;
    });

    // update localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Update dashboard counters
    if (status === "Pass") {
        passed--;
    } else {
        failed--;
    }

    total--;

    // Update dashboard display
    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;

    // Remove the row from the table
    row.remove();
}