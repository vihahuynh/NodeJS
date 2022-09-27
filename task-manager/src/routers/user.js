const userRouter = require("express").Router()
const User = require("./../models/user");

userRouter.post("/", async (req, res) => {
    const { body } = req;
    const newUser = new User(body);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.status(400).json(err);
    }
});

userRouter.get("/:id", async (req, res) => {
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

userRouter.patch("/:id", async (req, res) => {
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

userRouter.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = userRouter