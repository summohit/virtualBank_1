const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const multer = require('multer');

const upload = multer();

const {
  createBank,
  getBankList,
  setDefaultBank,
  deleteBank,
  getBankBalance,
  createPensionAccount,
  getPensionAccount,
  checkPensionStatus,
  updatePensionDocument,
  approvePensionRequest,
  updatePensionDate
} = require("../../controllers/bank/bank");

Router.post("/createBank", verifyKey, createBank);

Router.get("/bankList", verifyKey, getBankList);

Router.get("/balance/:bankId", verifyKey, getBankBalance);

Router.put("/setDefaultBank/:bankId", verifyKey, setDefaultBank);

Router.delete("/deleteBank/:bankId", verifyKey, deleteBank);

Router.post("/createPensionAccount", verifyKey, createPensionAccount);

Router.get("/getPensionRequest", verifyKey, getPensionAccount);


Router.get("/checkPensionStatus", verifyKey, checkPensionStatus);

Router.post("/updatePensionDocument", verifyKey, upload.fields([{ name: 'left', maxCount: 1 }, { name: 'right', maxCount: 1 }, { name: 'center', maxCount: 1 }]), updatePensionDocument);

Router.post("/approvePensionRequest", verifyKey, approvePensionRequest);

Router.post("/updatePensionDate", verifyKey, updatePensionDate);






module.exports = Router;
