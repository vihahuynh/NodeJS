const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nemo-admin:Anhduy2507@cluster0.7qy3g.mongodb.net/task-manager-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({ name: "Nemo", age: 25 });

me.save()
  .then((returnedUser) => console.log(returnedUser))
  .catch((err) => console.log(err));
