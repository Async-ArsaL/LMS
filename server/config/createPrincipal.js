const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust path if needed
require("dotenv").config();

// Use your MongoDB URL directly here:
const mongoURI = "mongodb+srv://altafaliansari2002:altafali2003@cluster0.48pmuwf.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const createPrincipal = async () => {
  try {
    const existing = await User.findOne({ role: "Principal" });
    if (existing) {
      console.log("Principal already exists:", existing.email);
      return mongoose.connection.close();
    }

    const hashedPassword = await bcrypt.hash("Principal@123", 10);

    const principal = await User.create({
      name: "Principal",
      email: "arsalchess@gmail.com",
      password: hashedPassword,
      role: "Principal",
      status: "active",
    });

    console.log("Principal created:", principal.email);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

createPrincipal();
