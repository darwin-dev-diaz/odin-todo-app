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
    set completed(newCompleted) {
      _completed = newCompleted;
    },
    get project() {
      return _project;
    },

    changeTaskValues: function (
      newTitle,
      newDescription,
      newDueDate,
      newPriority,
      newProject,
      newCompleted
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

function moveCheckedTaskOnList(task){
  const currentPos = taskList.indexOf(task);
  let newPos;
  for(let i = currentPos+1; i < taskList.length; i++){
    if(taskList[i].completed){
      newPos = i - 1;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
      break;
    } else if (i === taskList.length-1){
      newPos = i;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
    }
  }

}
function moveUncheckedTaskOnList(task){
  const currentPos = taskList.indexOf(task);
  let newPos;
  for(let i = currentPos+1; i < taskList.length; i++){
    if(taskList[i].completed){
      newPos = i - 1;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
      break;
    } else if (i === taskList.length-1){
      newPos = i;
      taskList.splice(currentPos, 1);
      taskList.splice(newPos, 0, task);
    }
  }

}

export { createTask, createProject, projectList, taskList, removeTask, moveCheckedTaskOnList};
