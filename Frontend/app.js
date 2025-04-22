const taskName = document.querySelector("#taskName");
const taskDesc = document.querySelector("#taskDesc");
const taskDeadline = document.querySelector("#taskDeadline");
const addTaskBtn = document.querySelector("#addTask");
const taskList = document.querySelector(".taskList");

addTaskBtn.addEventListener("click", () => {
  const task = {
    name: taskName.value,
    description: taskDesc.value,
    deadline: taskDeadline.value,
  };

  if (!task.name || !task.description || !task.deadline) {
    alert("Please fill all fields.");
    return;
  }

  
  const taskElem = document.createElement("div");
  taskElem.classList.add("task");
  taskElem.innerHTML = `
    <h3>${task.name}</h3>
    <p>${task.description}</p>
    <small>Deadline: ${task.deadline}</small>
  `;
  taskList.appendChild(taskElem);

 
  fetch("/add-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  
  taskName.value = "";
  taskDesc.value = "";
  taskDeadline.value = "";
});
