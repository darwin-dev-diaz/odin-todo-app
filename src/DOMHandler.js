// CREATE PROJECT METHODS
function toggleProjectPopup() {
  const popup = document.querySelector(".create-project-pop-up");
  popup.classList.toggle("hidden");
  const page = document.querySelector(".page");
  page.classList.toggle("blur");
}
function createProjectOptions(projectName) {
  const li = document.createElement("li");
  li.classList.add("project-index", "nav-item");
  li.textContent = projectName;
  li.addEventListener("click",(event)=>{
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(i=>i.classList.remove("nav-item-selected"));
    event.target.classList.add("nav-item-selected");
  });

  const option = document.createElement("option");
  option.setAttribute("value", projectName);
  option.textContent = projectName;

  return [li, option];
}

// CREATE TASK METHODS
function toggleTaskPopup() {
  const popup = document.querySelector(".create-task-pop-up");
  popup.classList.toggle("hidden");
  const page = document.querySelector(".page");
  page.classList.toggle("blur");
}
function createTaskDOMElement(
  title,
  description,
  priority,
  date,
  completed = false
) {
  // Create the main container div
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task", `priority--${priority}`);

  if (completed) {
    taskContainer.classList.add("completed");
  }

  // Create left side of the task
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("task--left");

  // Create status element
  const status = document.createElement("div");
  status.classList.add("task--status");

  const statusDiv = document.createElement("div");
  status.appendChild(statusDiv);

  // Create text container
  const textContainer = document.createElement("div");
  textContainer.classList.add("task--text");

  // Create title element
  const titleElement = document.createElement("h3");
  titleElement.classList.add("task--title");
  titleElement.textContent = title;

  // Create description element
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("task--description");
  descriptionElement.textContent = description;

  // Append title and description to text container
  textContainer.appendChild(titleElement);
  textContainer.appendChild(descriptionElement);

  // Append status and text container to left container
  leftContainer.appendChild(status);
  leftContainer.appendChild(textContainer);

  // Create right side of the task
  const rightContainer = document.createElement("div");
  rightContainer.classList.add("task--right");

  // Create info element
  const infoElement = document.createElement("div");
  infoElement.classList.add("task--info");
  infoElement.textContent = "INFO";

  // Create date element
  const dateElement = document.createElement("div");
  dateElement.classList.add("task--date");
  dateElement.textContent = date;

  // Append info and date to right container
  rightContainer.appendChild(infoElement);
  rightContainer.appendChild(dateElement);

  // Create SVG for edit
  const editSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  editSVG.setAttribute("class", "task--edit");
  editSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  editSVG.setAttribute("viewBox", "0 0 24 24");
  editSVG.innerHTML = `
    <title>file-edit-outline</title>
    <path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z"/>
  `;

  // Create SVG for delete
  const deleteSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  deleteSVG.setAttribute("class", "task--delete");
  deleteSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteSVG.setAttribute("viewBox", "0 0 24 24");
  deleteSVG.innerHTML = `
    <title>trash-can-outline</title>
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"/>
  `;

  // Append edit and delete SVGs to right container
  rightContainer.appendChild(editSVG);
  rightContainer.appendChild(deleteSVG);

  // Append left and right containers to main container
  taskContainer.appendChild(leftContainer);
  taskContainer.appendChild(rightContainer);

  return taskContainer;
}

// EDIT TASK METHODS
function toggleTaskEditPopup() {
  const popup = document.querySelector(".edit-task-pop-up");
  popup.classList.toggle("hidden");
  const page = document.querySelector(".page");
  page.classList.toggle("blur");
}
function populateTaskEditPopup(task) {
  const popUp = document.querySelector(".edit-task-pop-up");

  const titleField = popUp.querySelector(".task-title");
  titleField.innerHTML = task.title;
  const descriptionField = popUp.querySelector(".task-description");
  descriptionField.innerHTML = task.description;
  const dateField = popUp.querySelector(".task-date");
  dateField.value = task.dueDate;
  const projectField = popUp.querySelector(`#projects-drop-down-edit`);
  projectField.value = task.project;

  const priorityField = popUp.querySelector(`#create-new-${task.priority}`);
  priorityField.checked = true;
}

// TASK INFO METHODS
function toggleInfoPopup() {
  const popup = document.querySelector(".task-info-pop-up");
  popup.classList.toggle("hidden");
  const page = document.querySelector(".page");
  page.classList.toggle("blur");
}

function populateInfoPopup(task) {
  const popUp = document.querySelector(".task-info-pop-up");

  const titleField = popUp.querySelector(".task-info-title");
  titleField.innerHTML = task.title;
  const descriptionField = popUp.querySelector(
    ".task-info-description>span:nth-child(2)"
  );
  descriptionField.innerHTML = task.description;
  const dateField = popUp.querySelector(".task-info-date>span:nth-child(2)");
  dateField.innerHTML = task.dueDate;
  const projectField = popUp.querySelector(
    `.task-info-project>span:nth-child(2)`
  );
  projectField.innerHTML = task.project;
  const priorityField = popUp.querySelector(
    `.task-info-priority>span:nth-child(2)`
  );
  priorityField.innerHTML = task.priority;
}


export {
  toggleProjectPopup,
  createProjectOptions,
  toggleTaskPopup,
  createTaskDOMElement,
  toggleTaskEditPopup,
  populateTaskEditPopup,
  toggleInfoPopup,
  populateInfoPopup,
};
