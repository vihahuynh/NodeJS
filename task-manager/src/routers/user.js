const userRouter = require("express").Router();
const auth = require("./../middleware/auth");
const User = require("./../models/user");
const multer = require("multer")

const upload = multer({
  dest: 'avatars'
})

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

// userRouter.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "No user found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

userRouter.patch("/me", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(404).json({ err: "Invalid updates!" });
    }
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    const updatedUser = await req.user.save();
    return res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove()
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.post("/me/avatar", upload.single('avatar'), (req, res) => {
  res.send()
})

module.exports = userRouter;
