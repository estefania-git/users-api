var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addressSchema = new Schema(
  {
    id: String,
    street: String,
    state: String,
    city: String,
    country: String,
    zip: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Address", addressSchema);
