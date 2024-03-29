const constants = require("../../constant/index");
const chequeService = require("../../services/cheque");
const apiResponse = require("../../helper/apiResponser");

const createCheque = async (req, res) => {
  try {
    console.log("Controller: inside createCheque");
    let bankNumber = req.params.bankNumber;
    let numberOfCheque = req.body.chequeCount
    let reqData = req.body;
    let result = await chequeService.createCheque(
      numberOfCheque,
      bankNumber,
      req.user,
      reqData,
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

const getChequeList = async (req, res) => {
  try {
    console.log("Controller: inside getChequeList");
        let chequeBookId = req.params.chequeBookId;
    let result = await chequeService.getChequeList(
      chequeBookId,
      req.user,
      req.headers["authorization"]
    );

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




const fillCheque = async (req, res) => {
  try {
    console.log("Controller: inside fillCheque");
    let result = await chequeService.fillCheque(
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

const updateChequeStatus = async (req, res) => {
  try {
    console.log("Controller: inside fillCheque");
    let result = await chequeService.updateChequeStatus(
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


module.exports = {
  createCheque,
  getChequeList,
  fillCheque,
  updateChequeStatus,
  //   loginUser,
  //   updateProfile,
  //   getUserData,
  //   deleteUserData,
  //   uploadProfileImage,
  //   getCardDetails,
};
