const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
  addQRCode,
  getQrCodeList,
  //   deleteAddedCard,
     updateQrCodeStatus,
} = require("../../controllers/uploadQR/uploadQR");

Router.post("/create", verifyKey, addQRCode);

Router.get("/getQr", verifyKey, getQrCodeList);

// Router.delete("/delete/:addedCardId", verifyKey, deleteAddedCard);

Router.put("/update/status/:id", verifyKey, updateQrCodeStatus);

//list

module.exports = Router;
