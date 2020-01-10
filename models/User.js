const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String },
    email: { type: String },
    birthDate: { type: Date, default: Date.now },
    address: {
      type: mongoose.Schema.Types.Number,
      ref: "Address"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", userSchema);
