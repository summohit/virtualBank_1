const Router = require("express").Router();
const upload = require("../../utils/fileUpload/profile");
const {
  createUser,
  loginUser,
  updateProfile,
  getUserData,
  deleteUserData,
  uploadProfileImage,
  getCardDetails,
} = require("../../controllers/user/user");
const { verifyKey } = require("../../helper/auth/auth");
const { registrationValidation } = require("../../middlewares/userValidation");

Router.post("/createUser",registrationValidation, createUser);

Router.put("/updateProfile",verifyKey, updateProfile);

Router.post("/uploadProfileImage", verifyKey,upload.single("profileImage"), uploadProfileImage);

Router.get("/getUserData", verifyKey, getUserData);

Router.get("/getCardDetails", verifyKey, getCardDetails);

Router.delete("/deleteUser/:mobileNumber", deleteUserData);

Router.post("/login", loginUser);

module.exports = Router;
