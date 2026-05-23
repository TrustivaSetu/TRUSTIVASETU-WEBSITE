const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: [
        "SUPER_ADMIN",
        "MANAGEMENT",
        "REGIONAL_MANAGER",
        "EXECUTIVE",
      ],
    },

    region: String,

    mustChangePassword: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);