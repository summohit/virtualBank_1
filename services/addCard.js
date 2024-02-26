const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const addCardDao = require("../dao/addCard");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const { createResponseObj } = require("../utils/common");

module.exports.addCard = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside addCard");
    if (payload.cardNumber !== payload.confirmCardNumber) {
      let error = "Card Number is incorrect";
      let response = createResponseObj(error, 400);
      console.log(response);
      return response;
    }
    const cardAlredyExist = await addCardDao.getByCardNumber(
      payload.cardNumber
    );
    if (cardAlredyExist) {
      let error = "Card Number already registered";
      let response = createResponseObj(error, 400);
      console.log(response);
      return response;
    }
    payload["userId"] = tokenData.userId;
    let createdAddCardData = await addCardDao.insert(payload);
    let responseMsg = "Card added successfully";
    let response = createResponseObj(responseMsg, 201, null);
    return response;
  } catch (error) {
    if (error.response) {
      let errorMessage = error.response.data.message;
      let response = createResponseObj(errorMessage, 400);
      return response;
    } else {
      console.log("Something went wrong: Service: blog", error);
      throw new customError(error, error.statusCode);
    }
  }
};

module.exports.getAddedCardList = async (tokenData, jwtToken) => {
  try {
    console.log("Service: inside getAddedCardList");
    console.log("tokenData", tokenData.userId);
    const objectIdInstance = new mongoose.Types.ObjectId(tokenData.userId);
    let query = [
      {
        $match: { userId: objectIdInstance },
      },
    ];
    const bankData = await addCardDao.getAll(query);
    let result = createResponseObj(null, 200, bankData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.updateStatus = async (
  addedCardId,
  payload,
  tokenData,
  jwtToken
) => {
  try {
    console.log("Service: inside updateAddedCard");
    console.log(data);
    const isAddedCardExist = await addCardDao.getById(addedCardId, {});
    if (!isAddedCardExist) {
      let error = "Card is not added";
      let response = createResponseObj(error, 400);
      return response;
    }
    await userDao.updateById(addedCardId, payload);
    const message = "Card updated suceessfully";
    let result = createResponseObj(message, 200, null);
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.updateAddedCardStatus = async (
  addedCardId,
  tokenData,
  jwtToken
) => {
  try {
    console.log("Service: inside updateAddedCard");
    console.log("addedCardId", addedCardId);
    const isAddedCardExist = await addCardDao.getById(addedCardId);
    if (!isAddedCardExist) {
      let error = "Card is not added";
      let response = createResponseObj(error, 400);
      return response;
    }
    let cardData = isAddedCardExist;
    let updatedCardStatus = cardData.status === 0 ? 1 : 0;
    let payload = {
      status: updatedCardStatus,
    };
    await addCardDao.updateById(addedCardId, payload);
    const message = "Card updated suceessfully";
    let result = createResponseObj(message, 200, null);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.deleteAddedCard = async (addedCardId) => {
  try {
    console.log("Service: inside deleteAddedCard");
    console.log("addedCardId", addedCardId);
    const isCardExist = await addCardDao.getById(addedCardId);
    if (!isCardExist) {
      let error = "Card does not added";
      let response = createResponseObj(error, 400);
      return response;
    }
    console.log("above delete query");
    await addCardDao.deleteByAddedCardId(addedCardId);
    const message = "Card details deleted suceessfully";
    let response = createResponseObj(message, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};