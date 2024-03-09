// this file will be where the logic of the todo list is stored. It will have scripts to create the tasks and group them into projects

const taskList = [];

function createTask(title, description, dueDate, priority, completed = false, project = "main") {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _completed = completed;
    let _project = project;

    return {
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
        }
    };
}


const testTask = createTask('Finish homework', 'Finish my science homework', '03-08-2024', 'important', false, 'school');
console.log(testTask.description);

// taskList.push(createTask('Finish homework', 'nothing', '03-08-2024', 'important', false, 'school'));
// taskList.push(createTask('Workout', 'Do 100 push ups today', '03-09-2024', 'important', false, 'health'));

// 