const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nemo-admin:Anhduy2507@cluster0.7qy3g.mongodb.net/task-manager-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
