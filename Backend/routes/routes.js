const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const {
    signup,
    login,
    logout,
    resetPasswordToken,
    resetPassword,
    deleteAccount,
} = require("../controllers/auth.controller");

const {
    addPassword,
    editPassword,
    deletePassword,
    getAllPasswords,
} = require("../controllers/password.controller");

const { getUserData } = require("../controllers/user.controller");

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
router.delete("/delete-account", auth, deleteAccount);

router.post("/add-password", auth, addPassword);
router.put("/edit-password", auth, editPassword);
router.delete("/delete-password", auth, deletePassword);
router.get("/get-all-passwords", auth, getAllPasswords);
router.get("/get-user-data", auth, getUserData);

module.exports = router;
