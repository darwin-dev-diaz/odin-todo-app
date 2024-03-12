// this file will be where the logic of the todo list is stored. It will have scripts to create the tasks and group them into projects

const taskList = [];
const projectList = [];

function createTask(
  title,
  description,
  dueDate,
  priority,
  project = "main",
  completed = false,
) {
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _completed = completed;
  let _project = project;

  const newTask = {
    // Getter and setter for title
    get title() {
      return _title;
    },
    set title(newTitle) {
      _title = newTitle;
    },
    // Getter and setter for description
    get description() {
      return _description;
    },
    set description(newDescription) {
      _description = newDescription;
    },
    // Getter and setter for dueDate
    get dueDate() {
      return _dueDate;
    },
    set dueDate(newDueDate) {
      _dueDate = newDueDate;
    },
    // Getter and setter for priority
    get priority() {
      return _priority;
    },
    set priority(newPriority) {
      _priority = newPriority;
    },
    // Getter and setter for completed
    get completed() {
      return _completed;
    },
    set completed(newCompleted) {
      _completed = newCompleted;
    },
    // Getter and setter for project
    get project() {
      return _project;
    },
    set project(newProject) {
      _project = newProject;
    },
  };
  taskList.push(newTask);
  projectList.forEach((project) => {
    project.addNewTask(newTask);
  });

  return newTask;
}

function createProject(title) {
  let projTaskList = [];

  const addNewTask = (task) => {
    if (task.project === title && !projTaskList.includes(task)) {
      projTaskList.push(task);
    }
  };

  const newProject = { title, projTaskList, addNewTask };
  projectList.push(newProject);
  return newProject;
}

export {createTask, createProject, projectList, taskList};