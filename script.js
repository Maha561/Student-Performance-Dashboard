// Dashboard counters
let total = 0;
let passed = 0;
let failed = 0;

// Student data array
let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Load data from localStorage
const savedStudents = JSON.parse(localStorage.getItem("students"));

if(savedStudents){

students = savedStudents;

students.forEach(function(student){

addRow(student);

});

updateDashboard();

}


// Dark / Light Mode Buttons

let lightBtn = document.getElementById("lightBtn");
let darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click",function(){

document.body.classList.add("dark-mode");

});

lightBtn.addEventListener("click",function(){

document.body.classList.remove("dark-mode");

});


// Add Student

form.addEventListener("submit",function(event){

event.preventDefault();

const name = document.getElementById("name").value;
const dept = document.getElementById("dept").value;
const marks = Number(document.getElementById("marks").value);

let status = marks >= 50 ? "Pass" : "Fail";

const student = {
name,
dept,
marks,
status
};

students.push(student);

localStorage.setItem("students",JSON.stringify(students));

addRow(student);

updateDashboard();

form.reset();

});


// Create Table Row

function addRow(student){

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

}


// Update Dashboard

function updateDashboard(){

total = students.length;

passed = students.filter(s => s.status === "Pass").length;

failed = students.filter(s => s.status === "Fail").length;

document.getElementById("totalStudents").textContent = total;
document.getElementById("passedStudents").textContent = passed;
document.getElementById("failedStudents").textContent = failed;

}


// Delete Student

function deleteRow(button){

const row = button.parentNode.parentNode;

const index = row.rowIndex - 1;

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

row.remove();

updateDashboard();

}


// Department Filter

function filterDepartment(){

const filter = document.getElementById("deptFilter").value;

const rows = table.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

const dept = rows[i].children[1].textContent;

if(filter === "All" || dept === filter){

rows[i].style.display = "";

}else{

rows[i].style.display = "none";

}

}

}