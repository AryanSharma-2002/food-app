require("dotenv").config();

const express = require("express");
const app = express();

require("./db/conn");

const registerRouter = require("./routes/registerRoute");
const loginRouter = require("./routes/loginRoute");
const userRouter = require("./routes/userRoute");
const logoutRouter = require("./routes/logoutRoute");

const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");

const publicPath = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views/");
const partialPath = path.join(__dirname, "../templates/partials/");
// var anchorTag = document.getElementById("logout");
// anchorTag.href = "javascript:void(0)";
app.set("view engine", "hbs");
app.set("views", viewPath);

app.use(cookieParser());
app.use(express.static(publicPath)); //iss time upar likh liya unn paths ke kyo ki public mai index.html hai hi nhi
hbs.registerPartials(partialPath);

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// app.get('/',(req,res)=>{
//     res.render("register");
// });

app.use("/log", logoutRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  console.log("start of app");
  res.redirect(301, `http://localhost:${process.env.port}/user`);
  // res.send('hello');
  // res.send({message:"hello connection"})
});

const port = process.env.PORT || 5000;

app.listen(port, "127.0.0.1", () => {
  console.log(`connection successfull with port no. ${port}`);
});
