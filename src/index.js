import "./reset.css";
import "./style.css";
import {
  createTask,
  createProject,
  projectList,
  taskList,
  removeTask,
  moveCheckedTaskOnList,
  moveUncheckedTaskOnList,
} from "./todoList";
import {
  toggleProjectPopup,
  createProjectOptions,
  toggleTaskPopup,
  createTaskDOMElement,
  toggleTaskEditPopup,
  populateTaskEditPopup,
  toggleInfoPopup,
  populateInfoPopup,
  switchCurrentlySelectedFolder,
} from "./DOMHandler";
import { revive, replace } from "./doJSON";
import { format } from "date-fns";

let currentTaskList = revive(localStorage.getItem("all tasks")).projTaskList;
let currentFolder = "all tasks";

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
  const selectedFolderText =
    document.querySelector(".nav-item-selected").textContent;
  projectsNav.innerHTML = "";

  const projectsDropDown = document.querySelector("#projects-drop-down");
  projectsDropDown.innerHTML = ``;

  const projectsDropDownEdit = document.querySelector(
    "#projects-drop-down-edit"
  );
  projectsDropDownEdit.innerHTML = `<option value="main">Main</option>`;
  const projectListLS = Object.values(localStorage).map(x=>revive(x));
  projectListLS.forEach((project) => {
    const [li, option] = createProjectOptions(project.title);
    if (project.title === selectedFolderText) {
      li.classList.add("nav-item-selected");
    }

    li.addEventListener("click", () => {
      // here, im getting the task list of the project i clicked on and setting it as the current tasks list
      const newTaskList = revive(localStorage.getItem(li.textContent)).projTaskList;
      console.log(newTaskList);
      currentTaskList = newTaskList;
      currentFolder = li.textContent;
      populateDOMTasks();
    });
    projectsNav.appendChild(li);
    projectsDropDown.appendChild(option);
    const clonedOption = option.cloneNode(true);
    projectsDropDownEdit.appendChild(clonedOption);
  });
}
///////////////////// TASK INFO POPUP /////////////////////
///////////////////// TASK INFO POPUP /////////////////////
///////////////////// TASK INFO POPUP /////////////////////
const infoCloseBtn = document.querySelector(".task-info-close");
infoCloseBtn.addEventListener("click", () => {
  toggleInfoPopup();
});

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
  const newAllTasks = revive(localStorage.getItem("all tasks"));
  const indexPreEdit = newAllTasks.projTaskList.indexOf(newAllTasks.projTaskList.filter(x=>x.title === taskToBeEdited.title)[0]);

  const data = new FormData(event.target);
  const title = [...data.entries()][0][1];
  const description = [...data.entries()][1][1];
  const date = [...data.entries()][2][1];

  const project = [...data.entries()][3][1];
  const priority = [...data.entries()][4][1];

  taskToBeEdited.title = title;
  taskToBeEdited.description = description;
  taskToBeEdited.dueDate = date;
  taskToBeEdited.project = project;
  taskToBeEdited.priority = priority;

  // now move the tasktobeedited to correct spot on teh task to be edit project 
  newAllTasks.projTaskList.splice(indexPreEdit, 1, taskToBeEdited);
  localStorage.setItem("all tasks", replace(newAllTasks));


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
  currentTaskList = revive(localStorage.getItem(currentFolder)).projTaskList
  populateDOMTasks();

  toggleTaskPopup();
});

function populateDOMTasks() {
  console.log("populateDOMTasks ran");
  console.log({currentTaskList, currentFolder});
  const taskListDOM = document.querySelector(".task-list");
  taskListDOM.innerHTML = "";

  // create the dom task from the all tasks project
  // you have to update the current task list each time you create a new tasks
  currentTaskList.forEach((task) => {
    const date = format(new Date(task.dueDate.split("-")), "eeee, MMMM do");
    const DOMTask = createTaskDOMElement(
      task.title,
      task.description,
      task.priority,
      date,
      task.completed
    );

    DOMTask.querySelector(".task--delete").addEventListener("click", () => {
      removeTask(task);
      currentTaskList = revive(localStorage.getItem(currentFolder)).projTaskList;
      populateDOMTasks();
    });

    DOMTask.querySelector(".task--edit").addEventListener("click", () => {
      taskToBeEdited = task;
      populateTaskEditPopup(task);
      toggleTaskEditPopup();
    });

    DOMTask.querySelector(".task--info").addEventListener("click", () => {
      populateInfoPopup(task);
      toggleInfoPopup();
    });

    // complete button
    const completeBtn = DOMTask.querySelector(".task--status");
    completeBtn.addEventListener("click", (event) => {
      if (!task.completed) {
        task.completed = !task.completed;
        moveCheckedTaskOnList(task);
      } else {
        task.completed = !task.completed;
        moveUncheckedTaskOnList(task);
      }
      populateDOMTasks();
    });

    taskListDOM.appendChild(DOMTask);
  });
}

///////////////////// CHANGE CURRENT PROJECT /////////////////////
///////////////////// CHANGE CURRENT PROJECT /////////////////////
///////////////////// CHANGE CURRENT PROJECT /////////////////////
const allTasks = document.querySelector(".nav-item");
allTasks.addEventListener("click", (event) => {
  currentTaskList = revive(localStorage.getItem("all tasks")).projTaskList;
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("nav-item-selected"));
  event.target.classList.add("nav-item-selected");
  populateDOMTasks();
});


fillProjectOptionsFromList();
populateDOMTasks();
