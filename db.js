const mongoose = require("mongoose");
require('dotenv').config();
const password = process.env.DB_PASSWORD;

mongoose
  .connect("mongodb+srv://delightStudio:" + password + "@cluster0.56isx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

  const UserSchema = new mongoose.Schema({
      userId: String,
      warning: Number
  })

module.exports = mongoose.model("User", UserSchema);