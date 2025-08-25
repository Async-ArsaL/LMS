const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/Admin");

//Create Admin
router.post("/", createAdmin);

//Get All Admins
router.get("/", getAllAdmins);

//Get Admin by ID
router.get("/:id", getAdminById);

//Update Admin
router.put("/:id", updateAdmin);

//Delete Admin
router.delete("/:id", deleteAdmin);

module.exports = router;
