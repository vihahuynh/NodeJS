const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const multer = require('multer')

const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document!'))
    }
    cb(undefined, true)
    // if (!file.originalname.endsWith('pdf')) {
    //   return cb(new Error('File must be a PDF'))
    // }
    // cb(undefined, true)
  }
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (err, req, res, next) => {
  res.status(400).json({ err: err.message })
})

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

