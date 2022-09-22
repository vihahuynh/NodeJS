const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")
const { response } = require("express")

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

app.get("/users", (req, res) => {
    User.find({})
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

app.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) res.status(404).json({ message: "No user found" })
            res.json(user)
        })
        .catch(err => res.status(500).json(err))
})

app.post("/tasks", (req, res) => {
    const { body } = req
    const newTask = new Task(body)
    newTask.save().then(result => res
        .json(result))
        .catch(err => res.status(400).json(err))
})

app.get("/tasks", (req, res) => {
    Task.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json(err))
})

app.get("/tasks/:id", (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (!task) res.status(404).json({ message: "No task found" })
            res.json(task)
        }).catch(err => res.status(500).json(err))
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})