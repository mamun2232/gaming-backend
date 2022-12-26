const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
// const cookieParser = require('cookie-parser')....
const fileUpload = require("express-fileupload");
// middelwar
// app.use(cookieParser())
app.use(express.json());

app.use(fileUpload());
app.use(express.static("public"));

// import all router 
const userRouter = require('./router/user')
app.use("/api/v1/user" , userRouter)


// test route
app.use("/", (req, res) => {
  res.send("hellw world");
});

// app.use(errorHandeler);

module.exports = app;
