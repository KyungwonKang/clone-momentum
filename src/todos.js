const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoListContainer = document.getElementById("todo-list-container");

const TODO_KEY = "todos";

let todos = [];

function loadSavedTodos() {
    const localTodos = localStorage.getItem(TODO_KEY);
    const parsedTodos = JSON.parse(localTodos);

    if (parsedTodos !== null) {
        todos = parsedTodos;
    }
}

function addTodo(todo) {
    todos.push(todo);
    saveToLocalStorage(todos);
}

function saveToLocalStorage(todos) {
    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem(TODO_KEY, jsonTodos);
}

function displayTodos(todos) {
    if (todos.length > 0) {
        const todoListContainer = document.getElementById('todo-list-container');
        todoListContainer.classList.remove(HIDDEN_CLASSNAME);
    }
    todos.forEach(displayTodo);
}


function displayTodo(todo) {
    const list = document.createElement("li");
    list.style.width = 200;

    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');
    // checkbox.addEventListener('click', onCheckboxClick);

    const span = document.createElement("span");
    span.innerText = todo.value;

    const removeButton = document.createElement("button");
    removeButton.innerText = "❎";
    removeButton.addEventListener("click", onClickRemoveButton);
    removeButton.style.position = 'absolute';
    removeButton.style.right = 0;

    list.appendChild(checkbox);
    list.appendChild(span);
    list.appendChild(removeButton);
    list.id = todo.id;

    todoList.appendChild(list);
}

function onClickRemoveButton(event) {
    const parent = event.target.parentElement;

    todos = todos.filter(todo => todo.id !== parent.id);
    saveToLocalStorage(todos);
    todoList.removeChild(parent);
}

function onTodoSubmit(event) {
    event.preventDefault();
    const todo = todoInput.value;
    if (todo.length > 0) {
        const obj = {
            value: todo,
            id: Date.now(),
        };
    
        addTodo(obj);
        displayTodo(obj);
    }
    todoInput.value = "";
    showTodoListContainerIfNeeded();
}

function showTodoInputIfPossible() { 
    const username = localStorage.getItem(USERNAME_KEY);
    console.log(username);
    if (localStorage.getItem(USERNAME_KEY) !== null) {
        todoForm.classList.remove(HIDDEN_CLASSNAME);
        todoInput.placeholder = 'What are you gonna do today?';
    }
}

function showTodoListContainerIfNeeded() {
    if(todos.length > 0) {
        if(todoListContainer.classList.contains(HIDDEN_CLASSNAME)) {
            todoListContainer.classList.remove(HIDDEN_CLASSNAME);
        }
    } else {
        if(todoListContainer.classList.contains(HIDDEN_CLASSNAME) === false) {
            todoListContainer.classList.add(HIDDEN_CLASSNAME);
        }
    }
}

todoForm.addEventListener("submit", onTodoSubmit);

function loadSavedTodosAndDisplay() {
    loadSavedTodos();
    displayTodos(todos);
}

loadSavedTodosAndDisplay()
showTodoInputIfPossible();
