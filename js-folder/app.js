window.addEventListener('load', start);

function start() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', addTodo);
}

function addTodo(e) {
    e.preventDefault();
    const todosUL = document.querySelector('.todos');
    let todoInput = input.value;

    if (todoInput) {
        const newTodoItem = document.createElement('li');
        newTodoItem.innerHTML = /*html*/ `

            <div class="todo-item">  ${incrementTodos()}. ${todoInput}</div> 
                <i class="far fa-trash-alt todo-trash"  ></i> 
        `;
        todosUL.appendChild(newTodoItem);
        document
            .querySelector('#todos li:last-child')
            .addEventListener('click', toggleTodoCompleted);
        input.value = '';
    } else {
        console.log('Enter a todo');
    }
    toggleTodoCompleted;
    // deleteTodo();
}
let todoAmount = 0;
export function incrementTodos() {
    return ++todoAmount;
}

export function toggleTodoCompleted(e) {
    const selectedLiElement = e.target.parentElement;
    selectedLiElement.classList.toggle('todo-completed');
}
