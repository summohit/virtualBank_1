const chequeModel = require("../models/chequeModel");

const insert = async (data) => {
  try {
    const cheque = new chequeModel(data);
    let result = await cheque.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getAll = async (query) => {
  try {
    let result = await chequeModel.aggregate(query);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getById = async (checkId) => {
  try {
    let result = await chequeModel.findOne({ _id: checkId });
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByCardNumber = async (cardNumber) => {
  try {
    let result = await addCardModel.findOne({ cardNumber: cardNumber });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByEmail = async (email) => {
  try {
    let result = await userModel.findOne({ email: email });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const updateById = async (chequeBookId, payload) => {
  try {
    let result = await chequeModel.updateOne(
      { _id: chequeBookId },
      { $set: { ...payload } }
    );
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteById = async (roleId) => {
  try {
    let result = await teamModel.deleteOne({ _id: roleId });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteAllCheque = async (bankId) => {
  try {
    let result = await chequeBookModel.deleteMany({ bankId: bankId });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = {
  insert,
  getAll,
  getById,
  updateById,
  //   deleteById,
  //   getByCardNumber,
  //   getByEmail,
  //   deleteAllCheque,
};
