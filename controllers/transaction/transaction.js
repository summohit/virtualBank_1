const constants = require("../../constant/index");
const transactionService = require("../../services/transaction");
const apiResponse = require("../../helper/apiResponser");

const createTransaction = async (req, res) => {
  try {
    console.log("Controller: inside addCard");
    let result = await transactionService.createTransaction(
      req.body,
      req.user,
      req.headers["authorization"]
    );
    console.log("result", result);
    if (result.statusCode == 200 || result.statusCode == 201) {
      return res
        .status(result.statusCode)
        .send(
          apiResponse.successResponse(
            result.data,
            constants.defaultResponseMessage.CREATED,
            result.statusCode
          )
        );
    } else {
      return res
        .status(result.statusCode)
        .send(apiResponse.errorResponse(result.message, result.statusCode));
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    console.log("Controller: inside getTransactionHistory");
    let result = await transactionService.getTransactionHistory(
      req.user,
      req.headers["authorization"]
    );

    if (result.statusCode == 200 || result.statusCode == 201) {
      return res
        .status(result.statusCode)
        .send(
          apiResponse.successResponse(
            result.data,
            constants.defaultResponseMessage.FETCHED,
            result.statusCode
          )
        );
    } else {
      return res
        .status(result.statusCode)
        .send(apiResponse.errorResponse(result.message, result.statusCode));
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const updateAddedCardStatus = async (req, res) => {
  try {
    console.log("Controller: inside updateAddedCardStatus");
    const addedCardId = req.params.addedCardId;
    let result = await addCardService.updateAddedCardStatus(
      addedCardId,
      req.user,
      req.headers["authorization"]
    );
    console.log("result", result);
    if (result.statusCode == 200 || result.statusCode == 201) {
      return res
        .status(result.statusCode)
        .send(
          apiResponse.successResponse(
            result.data,
            constants.defaultResponseMessage.UPDATED,
            result.statusCode
          )
        );
    } else {
      return res
        .status(result.statusCode)
        .send(apiResponse.errorResponse(result.message, result.statusCode));
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteAddedCard = async (req, res) => {
  try {
    console.log("Controller: inside deleteAddedCard");
    const addedCardId = req.params.addedCardId;
    let result = await addCardService.deleteAddedCard(addedCardId);
    if (result.statusCode == 200 || result.statusCode == 201) {
      return res
        .status(result.statusCode)
        .send(
          apiResponse.successResponse(
            result.data,
            constants.defaultResponseMessage.DELETED,
            result.statusCode
          )
        );
    } else {
      return res
        .status(result.statusCode)
        .send(apiResponse.errorResponse(result.message, result.statusCode));
    }
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = {
  createTransaction,
  getTransactionHistory,
  // getAddedCardList,
  deleteAddedCard,
  updateAddedCardStatus,
};
