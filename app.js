let isEdit = false;
let editableTodo;

const input = document.querySelector('.todo-input');
const clearButton = document.querySelector('.button-clear');
const todosContainer = document.querySelector('.todos');
const noTaskInfo = document.querySelector('.no-task-info');
const filterButtons = document.querySelector('.filter');


todosContainer.addEventListener('click', removeCheckEditTodo);
input.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && input.value){
        if (isEdit) {
            let editTask = editableTodo.querySelector('p');
            removeLocalTodo(editTask.innerText);
            editTask.innerText = input.value;
            saveTodosToLocal([input.value, 'pending']);
            isEdit = false;
            editableTodo = '';
            input.value = '';
            input.placeholder = 'Add a new task';
        } else {
            saveTodosToLocal([input.value, 'pending']);
            addTask([input.value, 'pending']);
        }
    }

});
clearButton.addEventListener('click', clearAll);
filterButtons.addEventListener('click', filter);
document.addEventListener('DOMContentLoaded', addLocalTodos);

function clearAll(){
    while (todosContainer.children.length > 0) {
        todosContainer.removeChild(todosContainer.lastChild);
    }
    noTaskInfo.innerText = "You don't have any task";
    noTaskInfo.classList.remove('hidden');
    filterButtons.querySelector('.active').classList.remove('active');
    filterButtons.querySelector('.all').classList.add('active');
    localStorage.clear();
}

function addTask(task) {
    if(!noTaskInfo.classList.contains('hidden')){
        noTaskInfo.classList.add('hidden');
    }
    let todos = todosContainer.children;
    for (let todo of todos){
        if (todo.classList.contains('todo')){
            todo.style.display = 'flex'; 
        }
    }
    filterButtons.querySelector('.active').classList.remove('active');
    filterButtons.querySelector('.all').classList.add('active');
    let innerHtml = `
        <li class="todo ${task[1]}">
            <div class="todo-content">
                <i class="fa-solid fa-check check"></i>
                <p>${task[0]}</p>
            </div>
            <div class="icons">
                <i class="fa-solid fa-pen-to-square edit"></i>
                <i class="fa-solid fa-trash trash"></i>
            </div>
        </li>`
    todosContainer.insertAdjacentHTML('beforeend', innerHtml);
    input.value = '';
}

function removeCheckEditTodo(e){
    let button = e.target;
    let todo = button.parentElement.parentElement;
    let taskToChange = todo.querySelector('p').innerText;
    if(button.classList.contains('trash')){
        todo.remove();
        removeLocalTodo(taskToChange);
        if(todosContainer.children.length == 0){
            noTaskInfo.innerText = "You don't have any task";
            noTaskInfo.classList.remove('hidden');
        }
    }else if(button.classList.contains('check')){
        if (todo.classList.contains('pending')){
            todo.classList.toggle('pending');
            todo.classList.toggle('completed');
            removeLocalTodo(taskToChange);
            saveTodosToLocal([taskToChange, 'completed']);
        } else{
            todo.classList.toggle('pending');
            todo.classList.toggle('completed');
            removeLocalTodo(taskToChange);
            saveTodosToLocal([taskToChange, 'pending']);
            let todos = todosContainer.children;
            for (let todo of todos){
                if (todo.classList.contains('todo')){
                    todo.style.display = 'flex'; 
                }
            }
            filterButtons.querySelector('.active').classList.remove('active');
            filterButtons.querySelector('.all').classList.add('active');
        }
    }else if(button.classList.contains('edit')){
        isEdit = true;
        editableTodo = todo;
        input.placeholder = 'Edit task';
    }
}

function filter(e){
    filterButtons.querySelector('.active').classList.remove('active');
    let button = e.target;
    button.classList.add('active');
    let todos = todosContainer.children;
    let isTask = false;
    for (let todo of todos) {
        switch (button.innerText) {
            case 'All':
                if (todo.classList.contains('todo')){
                    todo.style.display = 'flex';
                    isTask = true; 
                }
                break;
            case 'Pending':
                if (todo.classList.contains('pending')){
                    todo.style.display = 'flex';
                    isTask = true; 
                } else{
                    todo.style.display = 'none';
                }
                break;
            case 'Completed':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                    isTask = true;
                } else{
                    todo.style.display = 'none';
                }
                break;
        }
    }
    if(!isTask){
        if (button.innerText == 'All') {
            noTaskInfo.innerText = "You don't have any task";
        } else {
            noTaskInfo.innerText = `You don't have any ${button.innerText.toLowerCase()} task`;
        }
        noTaskInfo.classList.remove('hidden');
    } else{
        noTaskInfo.classList.add('hidden');
    }
}

function checkLocalTodos(){
    let todos;
    if(!localStorage.getItem('todos')){
        return todos = [];
    } else{
        return todos = JSON.parse(localStorage.getItem('todos'));
    }
} 

function saveTodosToLocal(todo){
    let todos = checkLocalTodos();
    console.log(todos);
    console.log(todo);
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function addLocalTodos(){
    let todos = checkLocalTodos();
    if(todos){
        todos.forEach(todo => {
            addTask(todo);
        });
    }
}

function removeLocalTodo(todo){
    let todos = checkLocalTodos();
    let index = indexOfArray(todos, todo)
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function indexOfArray(todos, researchTodo){
    for(let i = 0; i < todos.length; i++){
        if(todos[i][0] == researchTodo){
            return i;
        }
    }
    return -1;
}