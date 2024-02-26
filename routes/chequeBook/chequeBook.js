const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const { getChequeBookList } = require("../../controllers/chequeBook/chequeBook");

// Router.post("/createBank", verifyKey, createBank);

Router.get("/", verifyKey, getChequeBookList);

// Router.put("/setDefaultBank/:bankId", verifyKey, setDefaultBank);

// Router.delete("/deleteBank/:bankId", verifyKey, deleteBank);

module.exports = Router;
