const inputBox = document.getElementById("input-box");
const list = document.getElementById("list");
const listArea = document.querySelector(".list-area");

let tasks = []; // Creates an empty array to store tasks

// Saves tasks to the browser (using localStorage)
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Loads saved tasks
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Renders tasks to the screen (list)
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("checked");
        }
        const span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        list.appendChild(li);
    });
    checkListVisibility();
}

// Checks the visibility of the list area
function checkListVisibility() {
    if (list.children.length === 0)
        listArea.style.display = "none";
    else {
        listArea.style.display = "block";
    }
}

// Adds a new task
function add() {
    if (inputBox.value === "") {
        alert("You must write something!");
        return;
    }

    const newTask = {
        text: inputBox.value,
        completed: false
    };
    tasks.push(newTask);
    saveData();
    renderTasks();
    inputBox.value = "";
}

// Adds a task when Enter key is pressed
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter")
        add();
});

// Listens for click events on the list
list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const li = event.target;
        const index = Array.from(list.children).indexOf(li);
        tasks[index].completed = !tasks[index].completed;
        li.classList.toggle("checked");
        saveData();
    } else if (event.target.tagName === "SPAN") {
        const li = event.target.parentNode;
        const index = Array.from(list.children).indexOf(li);
        tasks.splice(index, 1);
        li.remove();
        saveData();
        checkListVisibility();
    }
});

// Displays the current date on the page
function displayDate() {
    const todayElement = document.querySelector(".today h2");
    const now = new Date();
    const options = { day: "2-digit", month: '2-digit', year: 'numeric' };
    todayElement.textContent = now.toLocaleDateString("tr-TR", options)
}

window.addEventListener("load", displayDate);
loadTasks();