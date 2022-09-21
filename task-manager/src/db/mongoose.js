const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nemo-admin:Anhduy2507@cluster0.7qy3g.mongodb.net/task-manager-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// const newTask = new Task({ description: "                        clean house" })

// newTask.save()
//   .then(returnedTask => console.log(returnedTask))
//   .catch(err => console.log(err))

// const me = new User({ name: "Nemo", age: 25, email: "huUYhvihA1703@gmail.com", password: "  123456word   " });

// me.save()
//   .then((returnedUser) => console.log(returnedUser))
//   .catch((err) => console.log(err));
