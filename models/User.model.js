var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    id: String,
    name: String,
    email: String,
    birthDate: String,
    address: String
  }
);



module.exports = mongoose.model("User", userSchema);
