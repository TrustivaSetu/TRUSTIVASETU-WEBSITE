const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config({
  path: ".env.local",
});

const User = require("../models/User");

mongoose.connect(process.env.MONGODB_URI);

async function run() {
  try {
    const existing = await User.findOne({
      email: "admin@trustivasetu.com",
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "Admin@123",
        10
      );

    await User.create({
      fullName: "Super Admin",
      email:
        "admin@trustivasetu.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      region: "ALL",
    });

    console.log(
      "Admin created successfully"
    );

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

run();