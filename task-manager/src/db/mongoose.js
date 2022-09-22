const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nemo-admin:pw@cluster0.7qy3g.mongodb.net/task-manager-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

