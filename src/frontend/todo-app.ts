type TODO = {
    _id: string,
    header: string,
    description: string,
    completed: boolean
}

type todoErrorMessage = {
    duplicate: boolean
}

async function fetchTodos(): Promise<TODO[]> {
    return fetch("http://127.0.0.1:3000/todo/all")
    .then(response => response.json())
    .then(json => { return json })
}

async function loadTodos(){
    var orderedList = document.querySelector(".result") as HTMLOListElement
    var fetchedTodos = await fetchTodos()
    var template = ""

    fetchedTodos.forEach(item => {
        template += `
        <li value="${item._id}">
            <div>
                <input type="checkbox" ${item.completed ? "checked" : ""} onclick="updateTodos('${item._id}', ${item.completed})">
                <b>${item.header}</b>
                <button onclick="removeTodo('${item._id}')">DELETE</button>
            </div>
            <span>${item.description}</span>
        </li>`
    })
    orderedList.innerHTML = template
}


async function removeTodo(id: string): Promise<void>{

    const TodoData = { id }

    var response = fetch("http://127.0.0.1:3000/todo/removeTodo", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(TodoData)
    }).then(async () => await loadTodos()) 
}
async function updateTodos(id: string, completed: boolean): Promise<void> {
    
    const TodoData = { id, completed }

    fetch("http://127.0.0.1:3000/todo/updateTodoStatus", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(TodoData)
    })

}

async function addTodos(): Promise<void>{

    var todoHeader = document.querySelector("#todoHeader") as HTMLInputElement
    var todoDescription = document.querySelector("#todoDescription") as HTMLInputElement
    var todoStatus = document.querySelector("#todoStatus") as HTMLInputElement

    const TodoData = {
        header: todoHeader.value,
        description: todoDescription.value,
        completed: todoStatus.checked
    }

    fetch("http://127.0.0.1:3000/todo/createTodo", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(TodoData)
    })
    .then(result => result.json())
    .then(async data => {
        const red = 248
        const blue = 113
        const green = 113

    var errorMessageCodeColor = `rgb(${red}, ${green}, ${blue})`
    todoHeader.style.backgroundColor = data.duplicate ? errorMessageCodeColor : "unset"
    
    await loadTodos()})
}

var insertTodoButton = document.querySelector(".insertTodoButton") as HTMLInputElement

insertTodoButton.addEventListener("click", () => { addTodos() })
window.addEventListener("load", async () => { await loadTodos() })