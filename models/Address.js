const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    _id: { type: Number, ref: 'User' },
    street: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    zip: { type: String }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Address", addressSchema);


