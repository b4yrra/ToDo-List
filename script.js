const addElement = document.getElementById("addBtn");
const input = document.getElementById("input");
const lists = document.getElementById("listText");
const deleteBtn = document.querySelector(".task__delete");
const allButtons = document.querySelectorAll(".buttons");
const taskCheckbox = document.querySelector(".task__checkbox");
const taskText = document.querySelector(".task__text");
const all = document.getElementById("allBtn");
const active = document.getElementById("activeBtn");
const complete = document.getElementById("completeBtn");

let tasks = [];
let taskId = 1;

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

  tasks.forEach((task) => {
    const taskELement = createTaskElement(task);

    taskElementHTML += taskELement;
  });

  console.log(taskElementHTML);

  lists.innerHTML = taskElementHTML;

  if (taskElementHTML === "") {
    return (lists.innerHTML = "No tasks yet. Add one above!");
  }
};

allButtons.forEach((currentButton) => {
  currentButton.addEventListener("click", function () {
    allButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
  });
});

const createTaskElement = (task) => {
  const checkedAttr = task.isComplete ? "checked" : "";
  const strikeStyle = task.isComplete ? "text-decoration: line-through;" : "";

  return `<div class="task"><div class="task_title">
        <input type="checkbox" name="checkbox" class="task__checkbox" onclick="window.toggleTask(${
          task.id
        })" ${checkedAttr}" ${task.isComplete && "checked"}/>
        <p class="task__text" style="${strikeStyle}">${task.text}</p></div>
        <button class="task__delete" onclick="removeTask(${
          task.id
        })">Delete</button></div>`;
};

const clearInput = () => {
  input.value = "";
};

window.toggleTask = function (taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.isComplete = !task.isComplete;
    renderTasks();
  }
};

function removeTask(removeTasks) {
  tasks = tasks.filter((task) => task.id !== removeTasks);
  renderTasks();
}

addElement.addEventListener("click", add);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});
