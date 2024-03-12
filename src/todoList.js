// this file will be where the logic of the todo list is stored. It will have scripts to create the tasks and group them into projects

const taskList = [];
const projectList = [];

function createTask(
  title,
  description,
  dueDate,
  priority,
  project = "main",
  completed = false
) {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _completed = completed;
  let _project = project;

  const newTask = {
    get title() {
      return _title;
    },
    get description() {
      return _description;
    },
    get dueDate() {
      return _dueDate;
    },
    get priority() {
      return _priority;
    },
    get completed() {
      return _completed;
    },
    get project() {
      return _project;
    },

    changeTaskValues: function (
      newTitle,
      newDescription,
      newDueDate,
      newPriority,
      newCompleted,
      newProject
    ) {
      _title = newTitle;
      _description = newDescription;
      _dueDate = newDueDate;
      _priority = newPriority;
      _completed = newCompleted;
      _project = newProject;
    },
  };
  taskList.push(newTask);
  projectList.forEach((project) => {
    project.addNewTask(newTask);
  });

  return newTask;
}

function removeTask(task) {
  taskList.splice(taskList.indexOf(task), 1);
  if (task.project !== "main") {
    const projectToEdit = projectList.filter(
      (project) => project.title === task.project
    )[0];
    projectToEdit.removeTaskFromList(task);
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
  return newProject;
}

export { createTask, createProject, projectList, taskList, removeTask };
