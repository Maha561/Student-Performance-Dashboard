// ================= LOGIN PROTECTION =================

const isLoggedIn = localStorage.getItem("loggedIn");

if(isLoggedIn !== "true"){
    window.location.href = "login.html";
}

// ================= THEME LOAD =================

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark-mode");
}

// ================= VARIABLES =================

let students = [];
let total = 0;
let passed = 0;
let failed = 0;
let myChart;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// ================= LOAD DATA =================

const savedStudents = JSON.parse(localStorage.getItem("students"));

if(savedStudents){
    students = savedStudents;
}

// ================= PAGE LOAD =================

window.onload = function(){
    renderTable();
    updateDashboard();
    loadChart();
};

// ================= THEME DROPDOWN =================

const themeSelect = document.getElementById("themeSelect");

if(themeSelect){
    themeSelect.addEventListener("change", function(){

        if(this.value === "dark"){
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        }else{
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }

    });
}

// ================= ADD STUDENT =================

if(form){
form.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const marks = Number(document.getElementById("marks").value);

    let status = marks >= 50 ? "Pass" : "Fail";

    const student = { name, dept, marks, status };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    renderTable();
    updateDashboard();
    loadChart();

    form.reset();
});
}

// ================= RENDER TABLE =================

function renderTable(){

    if(!table) return;

    table.innerHTML = "";

    students.forEach(function(student, index){

        const row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.dept}</td>
            <td>${student.marks}</td>
            <td>${student.status}</td>
            <td>
                <button onclick="deleteRow(${index})">Delete</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;

    });
}

// ================= UPDATE DASHBOARD =================

function updateDashboard(){

    total = students.length;

    passed = students.filter(s => s.status === "Pass").length;
    failed = students.filter(s => s.status === "Fail").length;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("passedStudents").textContent = passed;
    document.getElementById("failedStudents").textContent = failed;
}

// ================= DELETE =================

function deleteRow(index){

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    renderTable();
    updateDashboard();
    loadChart();
}

// ================= FILTER =================

function filterDepartment(){

    const filter = document.getElementById("deptFilter").value;

    const rows = table.getElementsByTagName("tr");

    for(let i = 0; i < rows.length; i++){

        const dept = rows[i].children[1].textContent;

        if(filter === "All" || dept === filter){
            rows[i].style.display = "";
        }else{
            rows[i].style.display = "none";
        }

    }
}

// ================= SEARCH =================

function searchStudent(){

    const input = document.getElementById("searchInput").value.toLowerCase();

    const rows = table.getElementsByTagName("tr");

    for(let i = 0; i < rows.length; i++){

        const name = rows[i].children[0].textContent.toLowerCase();

        if(name.includes(input)){
            rows[i].style.display = "";
        }else{
            rows[i].style.display = "none";
        }

    }
}

// ================= LOGOUT =================

function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// ================= CHART =================

function loadChart(){

    const canvas = document.getElementById("myChart");

    if(!canvas) return;

    let pass = students.filter(s => s.status === "Pass").length;
    let fail = students.filter(s => s.status === "Fail").length;

    if(myChart){
        myChart.destroy();
    }

    myChart = new Chart(canvas, {
        type: "pie",
        data: {
            labels: ["Pass", "Fail"],
            datasets: [{
                data: [pass, fail],
                backgroundColor: ["green", "red"]
            }]
        }
    });

}