const addElement = document.getElementById("addBtn");
const input = document.getElementById("input");
const lists = document.getElementById("listText");
const deleteBtn = document.querySelector(".task__delete");
const allButtons = document.querySelectorAll(".buttons");
const counter = document.getElementById("completedTask");
const countFooter = document.querySelector(".complete--value");
const clearComp = document.getElementById("clearComp");

let tasks = [];
let taskId = 1;
let currentFilter = "all";

const add = () => {
  const todoText = input.value;
  renderTasks;
  const task = {
    id: taskId,
    text: todoText,
    isComplete: false,
  };

  if (todoText.length > 30) {
    window.alert("Too Long");
    return null;
  }

  if (todoText === "") {
    window.alert("Please Enter Your Task.");
    return null;
  } else {
    tasks.push(task);
  }

  taskId++;

  clearInput();
  renderTasks();
};

const renderTasks = () => {
  let taskElementHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.isComplete);
  } else if (currentFilter === "complete") {
    filteredTasks = tasks.filter((task) => task.isComplete);
  }

  filteredTasks.forEach((task) => {
    const taskELement = createTaskElement(task);

    taskElementHTML += taskELement;
  });

  console.log(taskElementHTML);

  lists.innerHTML = taskElementHTML;

  if (taskElementHTML === "") {
    return (lists.innerHTML = "No tasks yet. Add one above!");
  }

  updateCounter();
};

allButtons.forEach((currentButton) => {
  currentButton.addEventListener("click", function () {
    allButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    if (this.id === "allBtn") {
      currentFilter = "all";
    } else if (this.id === "activeBtn") {
      currentFilter = "active";
    } else if (this.id === "completeBtn") {
      currentFilter = "complete";
    }

    renderTasks();
  });
});

const createTaskElement = (task) => {
  const textStyle = task.isComplete
    ? 'style="text-decoration: line-through;"'
    : "";
  const checked = task.isComplete ? "checked" : "";

  return `<div class="task"><div class="task_title">
        <input type="checkbox" name="checkbox" class="task__checkbox" ${checked} onclick="checkBtn(${task.id})"/>
        <p class="task__text" ${textStyle}>${task.text}</p></div>
        <button class="task__delete" onclick="deleteTask(${task.id})">Delete</button></div>`;
};

const clearInput = () => {
  input.value = "";
};

const checkBtn = (taskId) => {
  checkedTask = tasks.map((task) => {
    if (task.id === taskId) {
      task.isComplete = !task.isComplete;
    }

    return task;
  });

  renderTasks();
};

const deleteTask = (taskId) => {
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }

  updateDeletedTask = tasks.filter((task) => {
    if (task.id === taskId) {
      return false;
    } else {
      return true;
    }
  });

  tasks = updateDeletedTask;
  updateCounter();
  renderTasks();
};

const updateCounter = () => {
  const completedCount = tasks.filter((task) => task.isComplete).length;
  const totalCount = tasks.length;

  if (totalCount === 0) {
    countFooter.style.display = "none";
  } else {
    counter.innerHTML = `${completedCount} of ${totalCount} tasks completed`;
    countFooter.style.display = "flex";
  }
};

const clearComplete = () => {
  if (!window.confirm("Are you sure you want to clear all completed tasks?")) {
    return;
  }

  tasks = tasks.filter((task) => task.isComplete === false);

  renderTasks();
  updateCounter();
};

addElement.addEventListener("click", add);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});
