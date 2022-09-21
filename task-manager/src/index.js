const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3005

app.post("/users", (req, res) => {
    const { body } = req
    const newUser = new User(body)
    newUser.save()
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
})

app.post("/tasks", (req, res) => {
    const { body } = req
    const newTask = new Task(body)
    newTask.save().then(result => res
        .json(result))
        .catch(err => res.status(400).json(err))
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})