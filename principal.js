// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("./server/models/User"); // path apke project ke hisaab se

// // Directly MongoDB Atlas URI use karo
// const MONGODB_URI = "mongodb+srv://altafaliansari2002:altafali2003@cluster0.48pmuwf.mongodb.net/mydatabase?retryWrites=true&w=majority";

// mongoose.connect(MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// const createPrincipal = async () => {
//   try {
//     const hashedPassword = await bcrypt.hash("Principal@123", 10);

//     const existing = await User.findOne({ email: "arsalchess@gmail.com" });
//     if (existing) {
//       console.log("Principal already exists");
//       mongoose.connection.close();
//       return;
//     }

//     const principal = await User.create({
//       name: "Principal",
//       email: "arsalchess@gmail.com",
//       password: hashedPassword,
//       role: "Principal",
//       status: "active",
//     });
// // 
//     console.log("Principal created:", principal);
//     mongoose.connection.close();
//   } catch (err) {
//     console.error(err);
//     mongoose.connection.close();
//   }
// };

// createPrincipal();
