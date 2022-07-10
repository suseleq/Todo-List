//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener('DOMContentLoaded', getCheckedTodos);
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Function
function addTodo(event) {
    //PREVENT FROM SUBMITTING
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //CHECK
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //DELETE
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR INPUT VALUE
    todoInput.value = "";
}
// DELETING/CHECKING TODO
function deleteCheck(e){
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add("fall");
        //REMOVING LOCAL TODO/CHECKED TODO
        if (todo.classList[1] === "completed"){
            removeCheckedLocalTodos(todo);
        }else{
            removeLocalTodos(todo);
        }
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }
    //CHECK TODO
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        // IF COMPLETED TODO TOGGLE TO UNCOMPLETED, REMOVE FROM CHECKED AND ADD TO TODO
        if (todo.classList[1] === "completed"){
            removeCheckedLocalTodos(todo);
            saveLocalTodos(todo.children[0].innerText);
        }else{
            checkedLocalTodos(todo);
        }
        todo.classList.toggle("completed");
    }

}
// FILTER
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}
// CHECKING LOCAL TODOS FROM LOCAL STORAGE
function checkLocalTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        return todos = [];
    }else{
        return todos = JSON.parse(localStorage.getItem('todos'));
    }
}
// CHECKING CHECKED TODOS FROM LOCAL STORAGE
function checkCheckedLocalTodos(){
    let checkedTodos;
    if(localStorage.getItem('check') === null){
        return checkedTodos = [];
    }else{
        return checkedTodos = JSON.parse(localStorage.getItem('check'));
    }
}
//SAVE TODO TO LOCAL STORAGE
function saveLocalTodos(todo){
    let todos = checkLocalTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
//GETTING TODOS FROM LOCAL STORAGE
function getTodos(){
    let todos = checkLocalTodos();
    todos.forEach(todo => {
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECK
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //DELETE
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}

//GETTING CHECKED TODOS FROM LOCAL STORAGE
function getCheckedTodos(){
    let todos = checkCheckedLocalTodos();
    todos.forEach(todo => {
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoDiv.classList.add("completed");
    //CHECK
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //DELETE
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}
// REMOVE TODO FROM LOCAL STORAGE
function removeLocalTodos(todo){
    let todos = checkLocalTodos();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// REMOVE CHECKED TODO FROM LOCAL STORAGE
function removeCheckedLocalTodos(todo){
    let todos = checkCheckedLocalTodos();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("check", JSON.stringify(todos));
}
// SAVE CHECKED TODO TO LOCAL STORAGE
function checkedLocalTodos(todo){
    let checkedTodos = checkCheckedLocalTodos();
    let todos = checkLocalTodos();
    const todoIndex = todo.children[0].innerText;
    todo = todos[todos.indexOf(todoIndex)];
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    checkedTodos.push(todo);
    localStorage.setItem('check', JSON.stringify(checkedTodos));
}

