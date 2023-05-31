const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    console.log("starting authentication");
    const token = req.cookies.jwt;
    req.userCurrToken = token;
    if (!token) {
      console.log("first do login");
      req.login = false;
      next();
    } else {
      const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
      // console.log("verified can access the page");
      console.log(verifyUser);

      // lekin aisa ho skta ki token toh aa rha cookie se client ki lekin log out all devices kr diya jiski vajah se active logged in tokens mai vo token nhi hai toh iss case mai bhi vo login nhi hoga
      const userDoc = await User.findOne({ _id: verifyUser._id });
      const check = userDoc.tokens.find((ele, i) => {
        if (ele.token === token) {
          return true;
        }
        return false;
      });
      // means if check is undefined then that token not present in db so not logged in
      req.login = check === undefined ? false : true;
      req.userId = verifyUser._id;
      req.user = userDoc;
      next();
    }
  } catch (error) {
    req.login = false;
    console.log(error);
    next();
  }
};
module.exports = auth;
