const addElement = document.getElementById("addBtn");
const input = document.getElementById("input");
const lists = document.getElementById("listText");

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
  return `<div class="task">
        <input type="checkbox" name="checkbox" class="task__checkbox" ${
          task.isComplete && "checked"
        }/>
        <p class="task__checkbox">${task.text}</p>
        <button class="task__delete">Delete</button></div>`;
};

const clearInput = () => {
  input.value = "";
};

addElement.addEventListener("click", add);
