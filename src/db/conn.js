const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection successful with mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
