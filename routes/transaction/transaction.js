const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
  createTransaction,
  getTransactionHistory,
} = require("../../controllers/transaction/transaction");

Router.post("/create", verifyKey, createTransaction);

Router.get("/history", verifyKey, getTransactionHistory);

// Router.delete("/delete/:addedCardId", verifyKey, deleteAddedCard);

// Router.put("/update/:addedCardId", verifyKey, updateAddedCardStatus);

//list

module.exports = Router;
