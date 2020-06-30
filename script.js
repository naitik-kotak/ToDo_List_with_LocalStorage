const form = document.querySelector('#form');
const newTask = document.querySelector('#addTask');
const filterTask = document.querySelector('#filterTask');
const clearAll = document.querySelector('#clearAll');
const listItems = document.querySelector('.list-group');

form.addEventListener('submit', addNewTask);
clearAll.addEventListener('click', clearAllTasks);
listItems.addEventListener('click', removetask);
filterTask.addEventListener('keyup', filterTasks);

// Local Storage Event
document.addEventListener('DOMContentLoaded', addFromLocalStorage);

function addNewTask(e) {
  if (newTask.value === '') {
    // Show error: <small>
    newTask.nextElementSibling.classList.remove('smallMessageHide');
  }else {
    // Remove Error: <small>
    newTask.nextElementSibling.classList.add('smallMessageHide');

    // Creating a li element
    const li = document.createElement('li');
    // Creating a textNode for li element
    const listValue = document.createTextNode(newTask.value);
    // Add class to list element
    li.className = 'list-group-item';
    // Creating the remove list icon (x)
    li.innerHTML = '<a class="delete text-danger float-right font-weight-bold" href="#">x</a>';
    // Appending the textNode to li element
    li.appendChild(listValue);

    // Appending li element to ul
    listItems.appendChild(li);

    // Add class to show the filter input
    filterTask.classList.remove('showFilterField');

    // Adding data to Local Storage
    addTaskToLocalStorage(newTask.value);

    // Clear Input Field
    newTask.value = '';
  }
  e.preventDefault();
}

// Add data to Local Storage
function addTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add data to DOM from Local Storage
function addFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Creating a li element
    const li = document.createElement('li');
    // Creating a textNode for li element
    const listValue = document.createTextNode(task);
    // Add class to list element
    li.className = 'list-group-item';
    // Creating the remove list icon (x)
    li.innerHTML = '<a class="delete float-right font-weight-bold" href="#">x</a>';
    // Appending the textNode to li element
    li.appendChild(listValue);

    // Appending li element to ul
    listItems.appendChild(li);

    // Add class to show the filter input
    filterTask.classList.remove('showFilterField');
  });
}

// Filter through Tasks
function filterTasks(e) {
  const allTasks = document.querySelectorAll('.list-group-item');
  const filterTask = e.target.value.toLowerCase();

  allTasks.forEach(function (task) {
    const item = task.lastChild.textContent;
    if (item.toLowerCase().indexOf(filterTask) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Remove a Task
function removetask(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();

    // Remove a task from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.lastChild.textContent);
  }
}

// Removing a task from Local Storage
function removeTaskFromLocalStorage(item) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (task === item) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear All Tasks
function clearAllTasks() {
  while (listItems.firstChild) {
    listItems.firstChild.remove();
  }

  // Remove all Task from Local Storage
  localStorage.clear();
}
