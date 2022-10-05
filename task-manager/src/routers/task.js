const taskRouter = require("express").Router()
const Task = require("./../models/task");
const auth = require("./../middleware/auth")

taskRouter.post("/", auth, async (req, res) => {
    const { body } = req;
    const newTask = new Task({ ...body, owner: req.user._id });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json(e);
    }
});

taskRouter.get("/", auth, async (req, res) => {
    try {
        const allTasks = await Task.find({ owner: req.user._id });
        res.json(allTasks)
    } catch (err) {
        res.status(400).json(err);
    }
});

taskRouter.get("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!task) {
            return res.status(404).json({ message: "No task found" });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json(err);
    }
});

taskRouter.patch("/:id", auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdate = ["completed", "description"]
        const isValidOperation = updates.every(update => allowedUpdate.includes(update))
        if (!isValidOperation) {
            return res.status(400).json({ err: "Invalied updates!" })
        }
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });
        if (!task) {
            return res.status(404).json({ err: "No task found" })
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        return res.json(task)
    } catch (err) {
        res.status(400).json(err)
    }
})

taskRouter.delete("/:id", auth, async (req, res) => {
    try {
        await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });
        res.status(204).send()
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = taskRouter