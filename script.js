let lastDeletedTask = null;

document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput").value;
    const taskDateInput = document.getElementById("taskDateInput").value;

    if (taskInput === "" || taskDateInput === "") {
        alert("Please fill in both the task and the date.");
        return;
    }

    // Create a new task item
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // Create a span to hold the task text
    const taskText = document.createElement("span");
    taskText.textContent = taskInput;

    // Create a span to hold the task date
    const taskDate = document.createElement("span");
    taskDate.classList.add("task-date");
    taskDate.textContent = `Due: ${taskDateInput}`;

    // Create an edit button for changing the task's date
    const editDateBtn = document.createElement("button");
    editDateBtn.textContent = "Edit Date";
    editDateBtn.classList.add("edit-date-btn");

    // Add an event listener to the edit button
    editDateBtn.addEventListener("click", function() {
        const newDate = prompt("Enter a new date (YYYY-MM-DD):", taskDateInput);
        if (newDate) {
            taskDate.textContent = `Due: ${newDate}`;
        }
    });

    // Create a delete button for deleting the task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Add an event listener to the delete button
    deleteBtn.addEventListener("click", function() {
        // Save the task to be restored later (Undo feature)
        lastDeletedTask = { taskItem, taskText, taskDate, editDateBtn };
        taskItem.remove();

        // Show the Undo button
        document.getElementById("undoBtn").style.display = "inline-block";
        document.getElementById("deletedTasks").style.display = "block";
        updateDeletedTasks();
    });

    // Append task elements
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(editDateBtn);
    taskItem.appendChild(deleteBtn);

    // Add task item to task list
    document.getElementById("taskList").appendChild(taskItem);

    // Clear input fields
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDateInput").value = "";
});

// Undo button functionality
document.getElementById("undoBtn").addEventListener("click", function() {
    if (lastDeletedTask) {
        const { taskItem, taskText, taskDate, editDateBtn } = lastDeletedTask;
        document.getElementById("taskList").appendChild(taskItem);

        // Hide the Undo button
        document.getElementById("undoBtn").style.display = "none";
        document.getElementById("deletedTasks").style.display = "none";

        lastDeletedTask = null;
    }
});

// Function to update deleted tasks list in the UI
function updateDeletedTasks() {
    const deletedList = document.getElementById("deletedList");
    deletedList.innerHTML = '';

    if (lastDeletedTask) {
        const task = lastDeletedTask.taskItem;
        const taskText = task.querySelector("span").textContent;
        const deletedTaskItem = document.createElement("li");
        deletedTaskItem.textContent = taskText;

        deletedList.appendChild(deletedTaskItem);
    }
}
