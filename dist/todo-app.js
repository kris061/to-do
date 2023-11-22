"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch("http://127.0.0.1:3000/todo/all")
            .then(response => response.json())
            .then(json => { return json; });
    });
}
function loadTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        var orderedList = document.querySelector(".todosList");
        var fetchedTodos = yield fetchTodos();
        var template = "";
        fetchedTodos.forEach(item => {
            template += `
        <li>
            <details>
             <summary>
                <input type="checkbox" ${item.completed ? "checked" : ""} onclick="updateTodos('${item._id}', ${item.completed})">
                <span>${item.header}</span>
                <button onclick="removeTodo('${item._id}')">DELETE</button>
             </summary>
             <p>ID: ${item._id}</p>
                <span>${item.description}</span>
            </details>
        </li>`;
        });
        orderedList.innerHTML = template;
    });
}
function removeTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const TodoData = { id };
        var response = fetch("http://127.0.0.1:3000/todo/removeTodo", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(TodoData)
        }).then(() => __awaiter(this, void 0, void 0, function* () { return yield loadTodos(); }));
    });
}
function updateTodos(id, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const TodoData = { id, completed };
        fetch("http://127.0.0.1:3000/todo/updateTodoStatus", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(TodoData)
        });
    });
}
const createTodoDialogBox = document.querySelector(".createTodoDialogBox");
const createTodoDialogBox2 = document.querySelector(".createTodoDialogBox");
function addTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        var todoHeader = document.querySelector("#todoHeader");
        var todoDescription = document.querySelector("#todoDescription");
        var todoStatus = document.querySelector("#todoStatus");
        const TodoData = {
            header: todoHeader.value,
            description: todoDescription.value,
            completed: todoStatus.checked
        };
        fetch("http://127.0.0.1:3000/todo/createTodo", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(TodoData)
        })
            .then(result => result.json())
            .then((data) => __awaiter(this, void 0, void 0, function* () {
            const red = 248;
            const blue = 113;
            const green = 113;
            var errorMessageCodeColor = `rgb(${red}, ${green}, ${blue})`;
            if (data.duplicate) {
                todoHeader.style.backgroundColor = errorMessageCodeColor;
            }
            else {
                todoHeader.style.backgroundColor = 'unset';
                createTodoDialogBox.close();
                createTodoDialogBox.style.display = "none";
            }
            yield loadTodos();
        }));
    });
}
const showCreateTodoDialogBoxButton = document.querySelector(".showCreateTodoDialogBoxButton");
const leaveCreateTodoDialogBoxButton = document.querySelector(".leaveCreateTodoDialogBoxButton");
showCreateTodoDialogBoxButton.addEventListener("click", function () {
    createTodoDialogBox.showModal();
    createTodoDialogBox.style.display = "flex";
});
leaveCreateTodoDialogBoxButton.addEventListener("click", function () {
    createTodoDialogBox.close();
    createTodoDialogBox.style.display = "none";
});
var insertTodoButton = document.querySelector(".insertTodoButton");
insertTodoButton.addEventListener("click", () => { addTodos(); });
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () { yield loadTodos(); }));
