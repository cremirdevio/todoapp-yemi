/**
 * UI Functionalities
 */

import { addItemToList, getTodoList, toggleTodoStatus, updateTodoItem } from "./todo.js"

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoItemsContainer = document.getElementById("todo-items");

updateUIWithTodoList();

// Adding necessary event listener
// todoInput.addEventListener("keyup", function (event) {})

// Submit button
todoButton.addEventListener("click", function (event) {
    // get the input value
    const inputValue = todoInput.value;

    // we'll check if its valid(empty or not, at least 5 characters)
    if (inputValue.length < 5) {
        alert("Todo Item must be more that 5 characters");
        return;
    }

    // add it to the todo list array 
    addItemToList(inputValue);

    // clear our input
    todoInput.value = "";

    // loop over it and display it to the UI
    updateUIWithTodoList();
})

// Event that happens when a checkbox is checked
function handleCheckbox(event) {
    const checkbox = event.target;
    const todoId = parseInt(checkbox.dataset.id); // convert string to int
    const todoStatus = checkbox.checked
    
    try {
        toggleTodoStatus(todoId)
        updateUIWithTodoList();
    } catch (error) {
        alert(error.message)
    }
}

// Event that triggers when delete icon is clicked
function handleDelete(event) {
    const canDelete = confirm("Are you sure you want to delete this task?");

    console.log("User said ", canDelete)
}

// Event that triggers when Edit button is clicked

// // Todo Item Builder
function buildTodoItem(todoItem) {
    // <div id="todo-item relative" class="flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4">
    //         <input data-id="2" type="checkbox" class="" />
    //         <p class="flex-grow">The item on my todo list</p>
            
    //         <div class="hidden flex gap-2 absolute">
    //           <input type="text" class="h-6" />
    //           <button class="px-2 h-6 bg-white rounded text-green-500">✓</button>
    //           <button class="px-2 h-6 bg-white rounded text-red-500">x</button>
    //         </div>

    //         <div class="flex gap-1">
    //           <button class="px-2 h-6 bg-white rounded text-red-500">x</button>
    //           <button class="px-2 h-6 bg-blue-500 rounded text-white text-sm">Edit</button>
    //         </div>
    // </div>
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", "todo-item");
    const classList = "flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4".split(" ");
    classList.forEach((className) => parentDiv.classList.add(className));
    

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.dataset.id = todoItem.id;
    checkBox.addEventListener("change", handleCheckbox);
    if (todoItem.isCompleted) {
        checkBox.checked = true;
    }

    const todoPara = document.createElement("p");
    const textNode = document.createTextNode(todoItem.title);
    todoPara.appendChild(textNode)
    // todoPara.innerText = todoItem
    if (todoItem.isCompleted) {
        todoPara.style.textDecoration = "line-through"
    }

    parentDiv.append(checkBox)
    parentDiv.append(todoPara)

    todoItemsContainer.append(parentDiv);
}

function buildTodoItemWithHTMLString(todoItem) {
    let todoHTML = `<div id="todo-item relative" class="flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4">
            <input id="checkbox-${todoItem.id}" data-id="${todoItem.id}" type="checkbox" ${todoItem.isCompleted ? 'checked' : ''} />
            <p class="flex-grow ${todoItem.isCompleted ? 'line-through' : ''}">${todoItem.title}</p>
            
            <div class="hidden flex gap-2 absolute">
              <input type="text" class="h-6" />
              <button class="px-2 h-6 bg-white rounded text-green-500">✓</button>
              <button class="px-2 h-6 bg-white rounded text-red-500">x</button>
            </div>

            <div class="flex gap-1">
              <button id="delete-todo-${todoItem.id}" data-id="${todoItem.id}" class="px-2 h-6 bg-white rounded text-red-500">x</button>
              <button id="edit-todo-${todoItem.id}" data-id="${todoItem.id}" class="px-2 h-6 bg-blue-500 rounded text-white text-sm">Edit</button>
            </div>
    </div>`
    
    todoItemsContainer.insertAdjacentHTML('beforeend', todoHTML);

    const checkBox = document.getElementById(`checkbox-${todoItem.id}`);
    checkBox.addEventListener('change', handleCheckbox)

    const deleteBtn = document.getElementById(`delete-todo-${todoItem.id}`);
    deleteBtn.addEventListener('click', handleDelete)

}

function updateUIWithTodoList() {
    const updatedTodoList = getTodoList();
    console.log(updatedTodoList);

    // clear the view
    todoItemsContainer.innerHTML = "";

    // loop over it and display it to the UI
    updatedTodoList.forEach((todoListItem) => {
        buildTodoItemWithHTMLString(todoListItem);
    })
    
    // const checkBox = document.querySelectorAll(`[type="checkbox"]`);
    // checkBox.forEach((_checkbox) => {
    //     _checkbox.addEventListener('change', handleCheckbox)
    // })
}