const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});
 const users = new mongoose.model("users",userSchema)//here we give collection name in mongodb and user schema

 module.exports = users;