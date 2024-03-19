import { replace, revive } from "./doJSON";

// this file will be where the logic of the todo list is stored. It will have scripts to create the tasks and group them into projects

const taskList = [];
const projectList = [];

function createTask(
  title,
  description,
  dueDate,
  priority,
  project = "all tasks",
  completed = false
) {
  const newTask = {
    title,
    description,
    dueDate,
    priority,
    completed,
    project,
  };
  taskList.push(newTask);

  // add task to all tasks in local storage
  const allTasks = revive(localStorage.getItem("all tasks"));
  allTasks.projTaskList.push(newTask);
  localStorage.setItem(allTasks.title, replace(allTasks));

  // add task to its project in local storage only if the task isn't in all tasks
  if (project !== "all tasks") {
    const localProject = revive(localStorage.getItem(project));
    localProject.projTaskList.push(newTask);
    localStorage.setItem(localProject.title, replace(localProject));
  }

  return newTask;
}

function removeTask(task) {
  // revive the project and remove it from all tasks
  const allTasks = revive(localStorage.getItem("all tasks"));
  allTasks.projTaskList.splice(taskList.indexOf(task), 1);
  taskList.splice(taskList.indexOf(task), 1);
  localStorage.setItem(allTasks.title, replace(allTasks));

  // remove it from local project
  if (task.project !== "all tasks") {
    const localProject = revive(localStorage.getItem(task.project));
    const taskFromLS = localProject.projTaskList.filter(
      (x) => x.title === task.title
    )[0];
    const indexOfTask = localProject.projTaskList.indexOf(taskFromLS);
    localProject.projTaskList.splice(indexOfTask, 1);
    localStorage.setItem(localProject.title, replace(localProject));
  }
}

function createProject(title) {
  let projTaskList = [];

  const addNewTask = (task) => {
    if (task.project === title && !projTaskList.includes(task)) {
      projTaskList.push(task);
    }
  };

  const removeTaskFromList = (task) => {
    projTaskList.splice(projTaskList.indexOf(task), 1);
  };

  const newProject = { title, projTaskList, addNewTask, removeTaskFromList };
  projectList.push(newProject);

  localStorage.setItem(title, replace(newProject));
  return newProject;
}

function moveCheckedTaskOnList(task) {
  const currentPos = taskList.indexOf(task);
  let newPos;
  for (let i = currentPos + 1; i < taskList.length; i++) {
    if (taskList[i].completed) {
      newPos = i - 1;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
      break;
    } else if (i === taskList.length - 1) {
      newPos = i;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
    }
  }
}
function moveUncheckedTaskOnList(task) {
  const currentPos = taskList.indexOf(task);
  let newPos;
  for (let i = currentPos - 1; i > -1; i--) {
    if (!taskList[i].completed) {
      newPos = i + 1;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
      break;
    } else if (i === 0) {
      newPos = i;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
    }
  }
}

export {
  createTask,
  createProject,
  projectList,
  taskList,
  removeTask,
  moveCheckedTaskOnList,
  moveUncheckedTaskOnList,
};


