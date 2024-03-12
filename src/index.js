import "./reset.css";
import "./style.css";
import {
  createTask,
  createProject,
  projectList,
  taskList,
  removeTask,
} from "./todoList";
import {
  toggleProjectPopup,
  createProjectOptions,
  toggleTaskPopup,
  createTaskDOMElement,
  toggleTaskEditPopup,
  populateTaskEditPopup,
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

  const projectsDropDownEdit = document.querySelector(
    "#projects-drop-down-edit"
  );
  projectsDropDownEdit.innerHTML = `<option value="main">Main</option>`;

  projectList.forEach((project) => {
    const [li, option] = createProjectOptions(project.title);
    projectsNav.appendChild(li);
    projectsDropDown.appendChild(option);
    const clonedOption = option.cloneNode(true);
    projectsDropDownEdit.appendChild(clonedOption);
  });
}
///////////////////// EDIT TASK POPUP /////////////////////
///////////////////// EDIT TASK POPUP /////////////////////
///////////////////// EDIT TASK POPUP /////////////////////
let taskToBeEdited = null;
const cancelEditTaskBtn = document.querySelector(".cancel-edit-btn");
cancelEditTaskBtn.addEventListener("click", () => {
  taskToBeEdited = null;
  toggleTaskEditPopup();
});

const editTaskForm = document.querySelector("#edit-task-form");
editTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const title = [...data.entries()][0][1];
  const description = [...data.entries()][1][1];
  const date = [...data.entries()][2][1];

  const project = [...data.entries()][3][1];
  const priority = [...data.entries()][4][1];


  console.log({ title, description, date, project, priority });
  taskToBeEdited.changeTaskValues(title, description, date, priority, project)
  populateDOMTasks();

  toggleTaskEditPopup();
});

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

  populateDOMTasks();

  toggleTaskPopup();
});

function populateDOMTasks() {
  const taskListDOM = document.querySelector(".task-list");
  taskListDOM.innerHTML = "";

  // create the dom task
  taskList.forEach((task) => {
    const date = format(new Date(task.dueDate.split("-")), "eeee, MMMM do");
    const DOMTask = createTaskDOMElement(
      task.title,
      task.description,
      task.priority,
      date
    );

    DOMTask.querySelector(".task--delete").addEventListener(
      "click",
      () => {
        removeTask(task);
        populateDOMTasks();
      }
    );

    DOMTask.querySelector(".task--edit").addEventListener("click", (event) => {
      taskToBeEdited = task;
      populateTaskEditPopup(task);
      toggleTaskEditPopup();
    });

    taskListDOM.appendChild(DOMTask);
  });
}
createProject("projName");
fillProjectOptionsFromList();
createTask("titl5432e", "description", "2024-01-01", "high", "projName");
createTask("tit54gfds32le", "description", "2024-01-01", "high", "projName");
createTask("tit54r432f32le", "description", "2024-01-01", "high", "projName");
populateDOMTasks();

// populateTaskEditPopup(createTask("title", "description", "2024-01-01", "low", "testing"));

///////////////////// TASK BUTTON FUNCTIONALITY /////////////////////
///////////////////// TASK BUTTON FUNCTIONALITY /////////////////////
///////////////////// TASK BUTTON FUNCTIONALITY /////////////////////
