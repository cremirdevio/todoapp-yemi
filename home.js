/**
 * UI Functionalities
 */
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoItemsContainer = document.getElementById("todo-items");

// Adding necessary event listener
todoInput.addEventListener("keyup", function (event) {})

todoButton.addEventListener("click", function (event) {
    // get the input value
    const inputValue = todoInput.value;

    // we'll check if its valid(empty or not, at least 5 characters)
    if (inputValue.length < 5) {
        alert("Todo Item must be more that 5 characters");
        return;
    }

    // add it to the todo list array 
    addTodoItem(inputValue);

    // clear our input
    todoInput.value = "";

    updateUIWithTodoList();
})

// Todo Item Builder
function buildTodoItem(todoItem) {
    {/* <div id="todo-item" class="flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4">
            <input type="checkbox" class="" />
            <p>The item on my todo list</p>
          </div> */}
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", "todo-item");
    const classList = "flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4".split(" ");
    classList.forEach((className) => parentDiv.classList.add(className));
    

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox")

    const todoPara = document.createElement("p");
    const textNode = document.createTextNode(todoItem);
    todoPara.appendChild(textNode)
    // todoPara.innerText = todoItem

    parentDiv.append(checkBox)
    parentDiv.append(todoPara)

    todoItemsContainer.append(parentDiv);
}

function  updateUIWithTodoList() {
    const updatedTodoList = getTodoListItems();
    // clear the view
    todoItemsContainer.innerHTML = "";
    // loop over it and display it to the UI
    updatedTodoList.forEach((todoListItem) => {
        buildTodoItem(todoListItem);
    })
}


/**
 * TODO functionalities
 */

let MY_TODO_LIST = ["This item is a default added by package owner", "Delete the default Items"];

function addTodoItem(todoItem) {
    MY_TODO_LIST.push(todoItem);
}

// return the todolist array
function getTodoListItems() {
    return [...MY_TODO_LIST];
}


// After everything
updateUIWithTodoList();

