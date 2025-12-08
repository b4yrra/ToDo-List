const addElement = document.getElementById("addBtn");
const input = document.getElementById("input");
const lists = document.getElementById("listText");
const deleteBtn = document.querySelector(".task__delete");

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

  tasks.push(task);

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
};

const createTaskElement = (task) => {
  return `<div class="task"><div class="task_title">
        <input type="checkbox" name="checkbox" class="task__checkbox" ${
          task.isComplete && "checked"
        }/>
        <p class="task__text">${task.text}</p></div>
        <button class="task__delete">Delete</button></div>`;
};

const clearInput = () => {
  input.value = "";
};

addElement.addEventListener("click", add);

deleteBtn.onclick = () => {
  e.target.closest(".task__delete") && e.target.closest(".task").remove();
};
