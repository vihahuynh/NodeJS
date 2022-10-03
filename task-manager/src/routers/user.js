const userRouter = require("express").Router();
const auth = require("./../middleware/auth");
const User = require("./../models/user");

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

userRouter.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

userRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newUser = new User(body);
    const token = await newUser.generateAuthToken();
    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.get("/me", auth, async (req, res) => {
  res.json(req.user)
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
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(404).json({ err: "Invalid updates!" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    console.log(user);
    if (!user) {
      return res.status(404).json({ messge: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = userRouter;
