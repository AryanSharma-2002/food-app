const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://0.0.0.0:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("connection successful with mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
