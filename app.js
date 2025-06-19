const addBtn = document.getElementById("btn");
const todoInput = document.getElementById("input");
const todoList = document.getElementById("list");

function init() {
  const saved = JSON.parse(localStorage.getItem("todos")) || [];
  saved.forEach((task) => {
    const todoItem = createTodoItem(task);
    todoList.append(todoItem);
  });
  addBtn.addEventListener("click", handleAdd);
  todoInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") handleAdd();
  });
}

function handleAdd() {
  const task = todoInput.value.trim();
  if (!task || task.length < 5) {
    alert("Your to-do is too short");
    return;
  }

  const todoItem = createTodoItem(task);
  todoList.append(todoItem);

  saveTodo(task);
  clearInput();
}

function createTodoItem(text) {
  const li = document.createElement("li");
  li.innerText = text;

  li.addEventListener("click", () => {
    li.style.textDecoration = "line-through";
    li.style.color = "gray";
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  li.append(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    li.remove();

    deleteTodo(task);
  });
  return li;
}

function clearInput() {
  todoInput.value = "";
}

function saveTodo(task) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(task) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((t) => t !== task);
  localStorage.setItem("todos", JSON.stringify(todos));
}

init();
