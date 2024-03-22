const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
  createBank,
  getBankList,
  setDefaultBank,
  deleteBank,
  getBankBalance,
} = require("../../controllers/bank/bank");

Router.post("/createBank", verifyKey, createBank);

Router.get("/bankList", verifyKey, getBankList);

Router.get("/balance/:bankId", verifyKey, getBankBalance);

Router.put("/setDefaultBank/:bankId", verifyKey, setDefaultBank);

Router.delete("/deleteBank/:bankId", verifyKey, deleteBank);

module.exports = Router;
