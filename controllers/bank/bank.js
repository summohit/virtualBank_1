const constants = require("../../constant/index");
const bankService = require("../../services/bank");
const apiResponse = require("../../helper/apiResponser");

const createBank = async (req, res) => {
  try {
    console.log("Controller: inside createBeneficiary");
    let result = await bankService.createBank(
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

const getBankList = async (req, res) => {
  try {
    console.log("Controller: inside getBankList");
    let result = await bankService.getBankList(
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

const setDefaultBank = async (req, res) => {
  try {
    console.log("Controller: inside setDefaultBank");
    const bankId = req.params.bankId
    let result = await bankService.setDefaultBank(
      bankId,
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
const deleteBank = async (req, res) => {
  try {
    console.log("Controller: inside deleteUserData");
    let result = await bankService.deleteBank(req.params.bankId);
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
  createBank,
  getBankList,
  setDefaultBank,
  deleteBank,
  //   loginUser,
  //   updateProfile,
  //   getUserData,
  //   deleteUserData,
  //   uploadProfileImage,
  //   getCardDetails,
};
