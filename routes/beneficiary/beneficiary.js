const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
  createBeneficiary,
} = require("../../controllers/beneficiary/beneficiary");


Router.post("/createBeneficiary", verifyKey, createBeneficiary);



module.exports = Router;