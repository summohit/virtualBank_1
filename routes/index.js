const Router = require("express").Router();
const user = require("./user/user");
const beneficiary = require("./beneficiary/beneficiary");
const bank = require("./bank/bank");
 const staticBank = require("./staticBank/staticBank");
const chequeBook = require("./chequeBook/chequeBook");
const cheque = require("./cheque/cheque");
const qrcode = require("./qrcode/qrcode");
const addCard = require("./addCard/addCard");
const transaction = require("./transaction/transaction");
const uploadQR = require("./uploadQR/uploadQR.js"); 

Router.use("/user", user);

Router.use("/beneficiary", beneficiary);

Router.use("/chequeBook", chequeBook);

Router.use("/cheque", cheque);

Router.use("/bank", bank);

 Router.use("/staticBank", staticBank);

Router.use("/qrcode", qrcode);

Router.use("/card", addCard);

Router.use("/transaction", transaction);

Router.use("/qrSection", uploadQR);

Router.use("/pension", bank);


module.exports = Router;
