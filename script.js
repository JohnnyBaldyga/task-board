// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
console.log(taskList)
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

    return String.fromCharCode(Math.floor(Math.random() * 77) + 34);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const $taskCard = $("<div>").addClass("task-card");

    const $taskTitle = $("<h3>").text(task.title);
    const $taskDescription = $("<p>").text(task.description);
    const $taskDeadline = $("<p>").text("Due Date: " + task.deadline);

    $taskCard.append($taskTitle, $taskDescription, $taskDeadline);

    $("#todo-cards").append($taskCard);
    return $taskCard;
}

// Loop through the task list and create a task card for each task
if (taskList) {
    renderTaskList()
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    taskList.forEach(task => {
        const $taskCard = createTaskCard(task);
        $taskCard.draggable({
            containment: "#todo-cards",
            scroll: false
        });
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const taskTitle = $("#task-title").val();
    const taskDescription = $("#task-description").val();
    const taskDeadline = $("#task-deadline").val();
    const newTask = {
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline
    };
    if (taskList) {
        taskList.push(newTask);
    } else {
        taskList = [newTask]
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
    $("formModal").attr("class", "modal fade");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = event.target.dataset.taskId;
    const taskElement = document.getElementById(taskId);
    taskElement.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $(".draggable").draggable();
    $("#add-task").on("click", handleAddTask);
});

