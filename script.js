var students = [
    { name: "Student 1", age: 18, course: "Math" },
    { name: "Student 2", age: 19, course: "English" },
    { name: "Student 3", age: 20, course: "History" }
];

var studentsDiv = document.getElementById("students");
var nameInput = document.getElementById("nameInput");
var ageInput = document.getElementById("ageInput");
var courseInput = document.getElementById("courseInput");

// Show every student in a card.
function showStudents() {
    studentsDiv.innerHTML = "";

    for (var i = 0; i < students.length; i++) {
        studentsDiv.innerHTML += "<div class='card'><h3>" + students[i].name + "</h3>" +
            "<p>Age: " + students[i].age + "</p><p>Course: " + students[i].course + "</p></div>";
    }
}

// Add a student with a callback.
function addStudentCallback(newStudent, callback) {
    setTimeout(function() {
        students.push(newStudent);
        callback();
    }, 2000);
}

// Add a student with a promise.
function addStudentPromise(newStudent) {
    return new Promise(function(resolve, reject) {
        if (!newStudent.name || !newStudent.age || !newStudent.course) {
            reject("Please fill all the boxes");
        } else {
            setTimeout(function() {
                students.push(newStudent);
                resolve();
            }, 2000);
        }
    });
}

// Use async and await to add a student.
async function addStudent() {
    var newStudent = {
        name: nameInput.value,
        age: ageInput.value,
        course: courseInput.value
    };
    studentsDiv.innerHTML = "Adding student...";

    try {
        await addStudentPromise(newStudent);
        nameInput.value = "";
        ageInput.value = "";
        courseInput.value = "";
        showStudents();
    } catch (error) {
        studentsDiv.innerHTML = error;
    }
}

document.getElementById("showBtn").onclick = showStudents;
document.getElementById("addBtn").onclick = addStudent;
document.getElementById("themeBtn").onclick = function() {
    document.body.classList.toggle("dark");
};
