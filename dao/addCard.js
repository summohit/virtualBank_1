const addCardModel = require("../models/addCardModel");

const insert = async (data) => {
  try {
    const addCard = new addCardModel(data);
    let result = await addCard.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getAll = async (query) => {
  try {
    console.log("query", query);
    let result = await addCardModel.aggregate(query);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getById = async (addedCardId) => {
  try {
    let result = await addCardModel.findOne({ _id: addedCardId });
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

const updateById = async (addedCardId, payload) => {
  try {
    let result = await addCardModel.updateOne(
      { _id: addedCardId },
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

const deleteByAddedCardId = async (addedCardId) => {
  try {
    let result = await addCardModel.deleteOne({ _id: addedCardId });
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
  deleteByAddedCardId,
};
