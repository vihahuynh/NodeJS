const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

