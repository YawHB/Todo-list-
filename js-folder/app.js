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
    const todoLiElement = document.createElement('li');

    if (todo.isCompleted) {
        todoLiElement.classList.add('todo-completed');
    }

    //Sets the text in a li element to the user input from the input field
    todoLiElement.innerText = todoText;

    //checks if todo is completed using the toggle method, and changes the removes/adds the class accordingly
    todoLiElement.addEventListener('click', () => {
        todoLiElement.classList.toggle('todo-completed');
        //Updates localestorage with new changes
        updateLS();
    });

    //Removes and updates the todo when right clicking on it
    todoLiElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        todoLiElement.remove();
        updateLS();
    });

    //Adds the li element containing a todo, to the UL list
    todosUL.appendChild(todoLiElement);
    //Clears the input field
    input.value = '';

    updateLS();
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
