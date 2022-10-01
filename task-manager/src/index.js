const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// const jwt = require("jsonwebtoken");
// const myFunction = () => {
//   const token = jwt.sign({ _id: "meowmeow" }, "secret", {
//     expiresIn: "7 days",
//   });
//   console.log("token: ", token);

//   const data = jwt.verify(token, "secret");
//   console.log(data);
// };

// myFunction();
