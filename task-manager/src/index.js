const express = require("express");
const bcrytjs = require("bcryptjs")
require("./db/mongoose");

const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.use("/users", userRouter)
app.use("/tasks", taskRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

