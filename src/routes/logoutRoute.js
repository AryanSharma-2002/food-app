const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const User = require("../models/user");

const logoutRouter = express.Router();

// auth middleware isiliye chlaya ise as private page man rhe ki user whi hai authorize krlo
logoutRouter.get("/", auth, async (req, res) => {
  console.log("logout started");
  req.login = true;
  if (req.login) {
    // now removing that token from our database where all login devices tokens stored
    const userDoc = await User.findOne({ _id: req.userId });
    console.log("starting logout");
    console.log(userDoc);
    // this is if we want to remove logout only from one device
    // userDoc.tokens = userDoc.tokens.filter((ele, i) => {
    //     return ele.token !== req.userCurrToken;
    // });

    // if want to logout from all devices then remove all tokens from the database
    if (userDoc == null) {
      return;
    }
    userDoc.tokens = [];

    await userDoc.save();

    res.clearCookie("jwt");
    console.log("logout successfully");
    // res.writeHead(301, {
    //   Location: `http://localhost:${process.env.port}/login`,
    // })``.end();
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.redirect(301, `http://localhost:${process.env.port}/`);
  } else {
    console.log("firstly do login");
    res.redirect(301, `http://localhost:${process.env.port}/login`);
  }
});

module.exports = logoutRouter;
