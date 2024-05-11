const Router = require("express").Router();
// const upload = require("../../utils/fileUpload/profile");
const {
  createUser,
  loginUser,
  updateProfile,
  getUserData,
  deleteUserData,
  getCardDetails,
  updateServiceStatus,
  getUserQrCode,
  updateDeviceId,
  logOut
} = require("../../controllers/user/user");
const { verifyKey } = require("../../helper/auth/auth");
const { registrationValidation } = require("../../middlewares/userValidation");

Router.post("/createUser",registrationValidation, createUser);

Router.put("/updateProfile",verifyKey, updateProfile);

Router.post("/updateServiceStatus", verifyKey, updateServiceStatus);

// Router.post("/uploadProfileImage", verifyKey,upload.single("profileImage"), uploadProfileImage);

Router.get("/getUserData", verifyKey, getUserData);

Router.get("/getCardDetails", verifyKey, getCardDetails);

//getUserQrCode
Router.get("/getUserQrCode", verifyKey, getUserQrCode);

Router.delete("/deleteUser/:mobileNumber", deleteUserData);

Router.post("/login", loginUser);

Router.get("/logout",verifyKey, logOut);



Router.post("/updateUserDeviceId",verifyKey, updateDeviceId);

module.exports = Router;
