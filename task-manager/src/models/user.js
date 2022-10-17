const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const sharp = require("sharp")
const jwt = require("jsonwebtoken");
const validator = require("validator");
const Task = require("./task")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be a positive number.");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password cannot contains 'password'");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: Buffer
  }
  // tasks: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Task'
  // }]
}, { timestamps: true });

// virtual property
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// delete user's tasks when user is remove
userSchema.pre("remove", async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.tokens
    delete returnedObject.avatar
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
