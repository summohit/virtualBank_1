const Router = require("express").Router();
const { uploadQrcode } = require("../../controllers/qrcode/qrcode");
const { verifyKey } = require("../../helper/auth/auth");

Router.post("/upload",verifyKey, uploadQrcode);

module.exports = Router;
