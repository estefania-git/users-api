var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Address = mongoose.model('Address.model');

var userSchema = new Schema(
  {
    id: String,
    name: String,
    email: String,
    birthDate: Date,
    address: { type: Schema.ObjectId, ref: "Address.model" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", userSchema);