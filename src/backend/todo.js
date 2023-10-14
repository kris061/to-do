const mongoose = require('mongoose')

const MONGODBURL = "mongodb://localhost:27017/todo"

mongoose.connect(MONGODBURL)

const todoSchema = new mongoose.Schema({
    header: { type: String, required: [true, "please insert todo header"], unique: true },
    description: { type: String },
    completed: { type: Boolean, required: [true, "please set todo status"]}
})

const todoModel = mongoose.model("Todos", todoSchema, "todos")
module.exports = todoModel