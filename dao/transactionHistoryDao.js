const transactionHistoryModel = require("../models/transactionHistory");


const createCreditHistory = async (accountNumber, IfscCode,amount) => {
  try {
    let data = {
      accountNumber: accountNumber,
      ifscCode: IfscCode,
      amount:amount,
      type: "Credit",
    };
    const newtransactionHistory = new transactionHistoryModel(data);
    let result = await newtransactionHistory.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const createDebitHistory = async (accountNumber, IfscCode, amount) => {
  try {
    let data = {
      accountNumber: accountNumber,
      IfscCode: IfscCode,
      amount: amount,
      type: "Debit",
    };
    const newtransactionHistory = new transactionHistoryModel(data);
    let result = await newtransactionHistory.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = { createCreditHistory, createDebitHistory };