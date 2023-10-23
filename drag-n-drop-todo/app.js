//*DRAG AND DROP*//
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const todosUL = document.querySelector('#todos');

//Listens for a submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //Gets the value/text of the user input
    const userCreatedTodo = e.target.input.value;
    //Creates an object of text and isCompleted. This way we can change the individual values later using dotnotation
    addTodo({
        text: userCreatedTodo,
        isCompleted: false,
    });
});

function addTodo(todo) {
    //Using dot notation on the todo object to get the text of the todo
    const todoText = todo.text;

    //Creates a new li element
    const html = /*html*/ `

    <li>
        <i class="fa-solid fa-grip"></i>
        <span class="todo-item">${todoText}</span>
        <i class="far fa-trash-alt todo-trash"  ></i>
    </li>
    
    `;

    document.querySelector('#todos').insertAdjacentHTML('beforeend', html);
    const todoTrash = document.querySelector(
        '#todos li:last-child .todo-trash'
    );

    //******************'DRAG functionality*******************//

    document
        .querySelector('#todos li:last-child')
        .setAttribute('draggable', true);
    const liElements = document.querySelectorAll('li');
    // console.log(liElements);

    liElements.forEach((li) => {
        li.addEventListener('dragstart', () => {
            li.classList.add('dragging');
        });

        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });
    });

    todosUL.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todosUL, e.clientY);
        console.log(afterElement);
        const draggable = document.querySelector('.dragging');
        if (afterElement === null) {
            todosUL.appendChild(draggable);
        } else {
            todosUL.insertBefore(draggable, afterElement);
        }
    });

    //If isCompleted is true add the todo-completed class to the last element.
    //Remember, we are iteration over an array, so the last li element is always the current one
    if (todo.isCompleted) {
        const newTodoElement = document.querySelector('#todos li:last-child');
        newTodoElement.classList.add('todo-completed');
    }

    liElements.forEach((todo) => {
        todo.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todo.remove();
            updateLS();
        });
    });

    todoTrash.addEventListener('click', completedTodo);

    input.value = '';

    updateLS();
}

//Add click event on trash can icon - and toogle the class todo-completed
function completedTodo(e) {
    console.log('Entered: completeTodo');
    if (e.target.classList.contains('todo-trash')) {
        const todoItem = e.target.closest('li'); // Find det nærmeste overordnede li-element
        todoItem.classList.toggle('todo-completed'); // Toggle klassen på det nærmeste li-element
        updateLS();
    }
}

function updateLS() {
    const todosLiElements = document.querySelectorAll('li'); //Gets all the li elements/user inputs

    const todos = [];
    //Iterates over all the li's/user todo inputs and pushes to the todos array
    todosLiElements.forEach((todoEl) => {
        todos.push({
            /*When pushed, we change the li element to an object, containing the text of the li and if it is completed (boolean)  */
            text: todoEl.innerText,
            isCompleted: todoEl.classList.contains('todo-completed'),
        });
    });

    //After we pushed the li elements, we store the todos in local storage after stringifying it.
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Gets the todos from locale storage and change them from json to js
const todosInLocaleStorage = JSON.parse(localStorage.getItem('todos'));
console.log(todosInLocaleStorage);

//if todos are stored in localeStorage, then iterate over them and call addTodo for each todo
if (todosInLocaleStorage) {
    todosInLocaleStorage.forEach((todo) => {
        addTodo(todo);
    });
}

function getDragAfterElement(todosUL, mouseYPosition) {
    const draggableElements = [
        ...todosUL.querySelectorAll('li:not(.dragging)'),
    ];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = mouseYPosition - box.top - box.height / 2;
            console.log(offset);
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}
