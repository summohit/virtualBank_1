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

const getBankBalance = async (req, res) => {
  try {
    console.log("Controller: inside getBankBalance");
    let result = await bankService.getBankBalance(
      req.params.bankId,
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

const createPensionAccount = async (req, res) => {
  try {
    console.log("Controller: inside createPensionAccount");
    let result = await bankService.createPensionReq(req.user);
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

const getPensionAccount = async (req, res) => {
  try {
    console.log("Controller: inside getPensionAccount");
    let result = await bankService.getPensionAccount(req.user);
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
const checkPensionStatus = async (req, res) => {
  try {
    console.log("Controller: inside checkPensionStatus");
    let result = await bankService.checkPensionStatus(req.user);
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
const updatePensionDocument = async (req, res) => {
  try {
    console.log("Controller: inside updatePensionDocument");
    // console.log(" req.files",  req.files);
    const { left, right, center } = req.files;

    // Convert images to base64 strings
    const leftBase64 = left[0].buffer.toString('base64');
    const rightBase64 = right[0].buffer.toString('base64');
    const centerBase64 = center[0].buffer.toString('base64');
    // console.log("leftBase64", left)
    let images = {
      leftImg: `data:${left[0].mimetype};base64,${leftBase64}`,
      centerImg: `data:${center[0].mimetype};base64,${centerBase64}`,
      rightImg: `data:${right[0].mimetype};base64,${rightBase64}`,
    }
     let result = await bankService.updatePensionDocument(req.user,images);
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

module.exports = {
  createBank,
  getBankList,
  setDefaultBank,
  deleteBank,
  getBankBalance,
  createPensionAccount,
  getPensionAccount,
  checkPensionStatus,
  updatePensionDocument
  //   loginUser,
  //   updateProfile,
  //   getUserData,
  //   deleteUserData,
  //   uploadProfileImage,
  //   getCardDetails,
};
