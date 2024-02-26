const constants = require("../../constant/index");
const chequeService = require("../../services/cheque");
const apiResponse = require("../../helper/apiResponser");

const createCheque = async (req, res) => {
  try {
    console.log("Controller: inside createCheque");
    let bankNumber = req.params.bankNumber;
    let result = await chequeService.createCheque(
      bankNumber,
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

const getUserData = async (req, res) => {
  try {
    console.log("Controller: inside getUserData");
    let result = await user.getUserData(req.user, req.headers["authorization"]);

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

const uploadProfileImage = async (req, res) => {
  try {
    console.log("Controller: inside uploadProfileImage");
    console.log("buffer", req.file.buffer);
    let result = await user.uploadProfileImage(
      req.file,
      req.user,
      req.headers["authorization"]
    );
    if (result.statusCode == 200 || result.statusCode == 201) {
      return res
        .status(result.statusCode)
        .send(
          apiResponse.successResponse(
            result.data,
            constants.defaultResponseMessage.UPLOADED,
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
const deleteUserData = async (req, res) => {
  try {
    console.log("Controller: inside deleteUserData");
    let result = await user.deleteUserData(req.params.mobileNumber);
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
  createCheque,
  getChequeList,
  fillCheque,
  //   loginUser,
  //   updateProfile,
  //   getUserData,
  //   deleteUserData,
  //   uploadProfileImage,
  //   getCardDetails,
};
