const todo = require('./todo')

const express = require('express')
const app = express()
const cors = require('cors')
const corsOPTIONS = {
    origin: ['http://127.0.0.1:5500'],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

var PORT = 3000

app.use(cors(corsOPTIONS))


app.get("/todo/all", async (req, res) => {
    try {    
    var result = await todo.find()
        if (result) {
            res.status(200)
            // res.send({status: "hello"})
            res.send(result)
        } 
        else console.log("Cannot find quizes")
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err)
    }
}) 

app.post("/todo/createTodo", express.json(), async (req, res) => {

    const { header, description, completed } = req.body

    let createTodo = new todo({ header, description, completed })

    createTodo.save().then(() => { 
        console.log("Todo added", createTodo)
        res.status(201).send(createTodo)
     })
    .catch(err => {
        res.status(500)
        res.send({ duplicate: true })
    })
})

app.delete("/todo/removeTodo", express.json(), async (req, res) => {
    const { id } = req.body

    let removeTodo = todo.findByIdAndRemove(id).exec()

    removeTodo.then(() => {
        console.log("Todo removed")
        res.status(200).send("Todo removed")
    })
})

app.post("/todo/updateTodoStatus", express.json(), async (req, res) => {

    const { id, completed } = req.body

    let updateTodoStatus = todo.findByIdAndUpdate(id, { completed: !completed }).exec()

    updateTodoStatus.then(() => {
        console.log("Todo status updated")
        res.status(200).send("Todo status updated")
    })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))