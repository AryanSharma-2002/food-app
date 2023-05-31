const express = require("express");
const app = express();
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/", auth, (req, res) => {
  if (req.login) {
    res.render("index");
  } else {
    res.redirect(301, `http://localhost:${process.env.port}/login`);
  }
});

module.exports = userRouter;
