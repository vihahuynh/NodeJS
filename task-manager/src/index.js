const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.post("/users", async (req, res) => {
  const { body } = req;
  const newUser = new User(body);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
      return res.status(404).json({ err: "Invalid updates!" })
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    console.log(user)
    if (!user) {
      return res.status(404).json({ messge: "User not found" })
    }
    return res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

app.post("/tasks", async (req, res) => {
  const { body } = req;
  const newTask = new Task(body);
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find();
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/tasks/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdate = ["completed", "description"]
    const isValidOperation = updates.every(update => allowedUpdate.includes(update))
    if (!isValidOperation) {
      return res.status(400).json({ err: "Invalied updates!" })
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!task) {
      return res.json(404).json({ message: "No task found" })
    }
    return res.json(task)
  } catch (err) {
    res.status(400).json(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
