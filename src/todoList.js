// this file will be where the logic of the todo list is stored. It will have scripts to create the tasks and group them into projects

const taskList = [];

function createTask (title, description, dueDate, priority, completed = false, project = none){
    return {title, description, dueDate, priority, completed, project};
}

taskList.push(createTask('Finish homework', 'nothing', '03-08-2024', 'important', false, 'school'));
taskList.push(createTask('Workout', 'Do 100 push ups today', '03-09-2024', 'important', false, 'health'));

console.log(taskList);