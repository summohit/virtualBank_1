const transactionHistoryModel = require("../models/transactionHistory");


const createCreditHistory = async (
  accountNumber,
  IfscCode,
  amount,
  userId,
  payeeName
) => {
  try {
    let data = {
      accountNumber: accountNumber,
      ifscCode: IfscCode,
      amount: amount,
      type: "Credit",
      userId: userId,
      payeeName: payeeName,
    };
    const newtransactionHistory = new transactionHistoryModel(data);
    let result = await newtransactionHistory.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const createDebitHistory = async (
  accountNumber,
  IfscCode,
  amount,
  userId,
  payeeName
) => {
  try {
    let data = {
      accountNumber: accountNumber,
      IfscCode: IfscCode,
      amount: amount,
      type: "Debit",
      userId: userId,
      payeeName: payeeName,
    };
    const newtransactionHistory = new transactionHistoryModel(data);
    let result = await newtransactionHistory.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getAll = async (query) => {
  try {
    console.log("query", query);
    let result = await transactionHistoryModel.aggregate(query);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = { createCreditHistory, createDebitHistory, getAll };