const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
  createCheque,
  getChequeList,
  updateChequeStatus,
  fillCheque,
} = require("../../controllers/cheque/cheque");

Router.post("/createCheque/:bankNumber", verifyKey, createCheque);

Router.get("/list/:chequeBookId", verifyKey, getChequeList);

Router.put("/fillCheque", verifyKey, fillCheque);

Router.put("/updateChequeStatus", verifyKey, updateChequeStatus);

// Router.delete("/deleteBank/:bankId", verifyKey, deleteBank);

module.exports = Router;
