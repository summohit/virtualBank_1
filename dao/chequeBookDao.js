const chequeBookModel = require("../models/chequeBookModel");

const insert = async (data) => {
  try {
    const chequeBook = new chequeBookModel(data);
    let result = await chequeBook.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getAll = async (query) => {
  try {
    console.log("query", query);
    let result = await chequeBookModel.aggregate(query);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getById = async (chequeBookId) => {
  try {
    let result = await chequeBookModel.findOne({ _id: chequeBookId });
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
    let result = await chequeBookModel.updateOne(
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
  deleteById,
  getByCardNumber,
  getByEmail,
  deleteAllCheque,
};
