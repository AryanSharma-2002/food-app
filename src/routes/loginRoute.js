const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("../models/user");

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login");
});
loginRouter.post("/", async (req, res) => {
  try {
    console.log("login started");
    const email = req.body.email;
    const password = req.body.password;
    const userDoc = await User.findOne({ email: email });

    console.log(userDoc);
    if (userDoc === null) {
      console.log("go to catch");
      throw "email not valid";
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (isMatch) {
      // yeh nya token generate bhi krega aur use uss user mai add bhi kr rha db mai krna chahiye nhi lekin hme all logout functionality bnani hai na isiliye yeh kam kiya hai
      const token = await userDoc.generateToken();
      // console.log(token);
      await userDoc.save();

      // now let's add this token to cookies
      res.cookie("jwt", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });

      return res.redirect(`http://localhost:${process.env.port}/user`);
    } else {
      res.render("login", {
        message: "Wrong login credentials",
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = loginRouter;
