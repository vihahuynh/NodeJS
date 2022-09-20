const mongoose = require("mongoose");
const validator = require("validator")

mongoose.connect(
  "mongodb+srv://nemo-admin:pw@cluster0.7qy3g.mongodb.net/task-manager-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be a positive number.")
      }
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password cannot contains 'password'")
      }
    }
  }
});

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const newTask = new Task({ description: "                        clean house" })

newTask.save()
  .then(returnedTask => console.log(returnedTask))
  .catch(err => console.log(err))

// const me = new User({ name: "Nemo", age: 25, email: "huUYhvihA1703@gmail.com", password: "  123456word   " });

// me.save()
//   .then((returnedUser) => console.log(returnedUser))
//   .catch((err) => console.log(err));
