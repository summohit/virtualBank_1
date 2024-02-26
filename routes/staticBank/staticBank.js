const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
//   createStaticBank,
    getStaticBankList,
  //   setDefaultBank,
  //   deleteBank,
} = require("../../controllers/staticBank/staticBank");

//Router.post("/createStaticBank", verifyKey, createStaticBank);

 Router.get("/staticBankList", verifyKey, getStaticBankList);

// Router.put("/setDefaultBank/:bankId", verifyKey, setDefaultBank);

// Router.delete("/deleteBank/:bankId", verifyKey, deleteBank);

module.exports = Router;
