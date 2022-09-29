const taskRouter = require("express").Router()
const Task = require("./../models/task");

taskRouter.post("/", async (req, res) => {
    const { body } = req;
    const newTask = new Task(body);
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json(e);
    }
});

taskRouter.get("/", async (req, res) => {
    try {
        const allTasks = await Task.find();
        res.json(allTasks)
    } catch (err) {
        res.status(400).json(err);
    }
});

taskRouter.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "No task found" });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json(err);
    }
});

taskRouter.patch("/:id", async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdate = ["completed", "description"]
        const isValidOperation = updates.every(update => allowedUpdate.includes(update))
        if (!isValidOperation) {
            return res.status(400).json({ err: "Invalied updates!" })
        }
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.json(404).json({ message: "No task found" })
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        return res.json(task)
    } catch (err) {
        res.status(400).json(err)
    }
})

taskRouter.delete("/tasks/:id", async (res, req) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = taskRouter