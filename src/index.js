import "./reset.css";
import "./style.css";
import { createTask, createProject, projectList, taskList } from "./todoList";
import {
  toggleProjectPopup,
  createProjectOptions,
  toggleTaskPopup,
  createTaskDOMElement,
} from "./DOMHandler";
import { format } from "date-fns";
// import "./DOMHandler"

///////////////////// CREATE PROJECT POPUP /////////////////////
///////////////////// CREATE PROJECT POPUP /////////////////////
///////////////////// CREATE PROJECT POPUP /////////////////////
const toggleProjectBtns = document.querySelectorAll(
  ".add-project, .create-project-cancel"
);

toggleProjectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    createProjForm.reset();
    toggleProjectPopup();
  });
});

const createProjForm = document.querySelector("#create-project-form");
createProjForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let projName = "";
  const data = new FormData(event.target);
  projName = [...data.entries()][0][1];

  createProject(projName);
  createProjForm.reset();

  fillProjectOptionsFromList();

  toggleProjectPopup();
});

function fillProjectOptionsFromList() {
  const projectsNav = document.querySelector(".projects-nav");
  projectsNav.innerHTML = "";

  const projectsDropDown = document.querySelector("#projects-drop-down");
  projectsDropDown.innerHTML = `<option value="main">Main</option>`;

  projectList.forEach((project) => {
    const [li, option] = createProjectOptions(project.title);
    projectsNav.appendChild(li);
    projectsDropDown.appendChild(option);
  });
}
///////////////////// CREATE TASK POPUP /////////////////////
///////////////////// CREATE TASK POPUP /////////////////////
///////////////////// CREATE TASK POPUP /////////////////////
const toggleTaskBtns = document.querySelectorAll(".add-task, .cancel-task-btn");
const createTaskForm = document.querySelector("#create-task-form");
toggleTaskBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    createTaskForm.reset();
    toggleTaskPopup();
  });
});

createTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const title = [...data.entries()][0][1];
  const description = [...data.entries()][1][1];
  const date = [...data.entries()][2][1];

  const project = [...data.entries()][3][1];
  const priority = [...data.entries()][4][1];

  createTask(title, description, date, priority, project);
  console.log(taskList);

  populateDOMTasks();

  toggleTaskPopup();
});

function populateDOMTasks() {
  const taskListDOM = document.querySelector(".task-list");
  taskListDOM.innerHTML = "";

  taskList.forEach((task) => {
    const date = format(new Date(task.dueDate.split("-")), "eeee, MMMM do");
    const DOMTask = createTaskDOMElement(
      task.title,
      task.description,
      task.priority,
      date,
    );
    taskListDOM.appendChild(DOMTask);
  });
} 
