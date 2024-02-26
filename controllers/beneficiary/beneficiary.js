const constants = require("../../constant/index");
const beneficiary = require("../../services/beneficiary");
const apiResponse = require("../../helper/apiResponser");

const createBeneficiary = async (req, res) => {
  try {
    console.log("Controller: inside createBeneficiary");
    let result = await beneficiary.createBeneficiary(
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

const getCardDetails = async (req, res) => {
  try {
    console.log("Controller: inside getUserData");
    let result = await user.getCardDetails(
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

const loginUser = async (req, res) => {
  try {
    console.log("Controller: inside LoginUser");
    let result = await user.loginUser(req.body);
    console.log("result", result);
    if (result.statusCode == 200 || result.statusCode == 201) {
      return res
        .status(result.statusCode)
        .send(
          apiResponse.successResponse(
            result.data,
            constants.defaultResponseMessage.LOGIN,
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

const updateProfile = async (req, res) => {
  try {
    console.log("Controller: inside updateProfile");
    let result = await user.updateUserProfile(
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
  createBeneficiary,
//   loginUser,
//   updateProfile,
//   getUserData,
//   deleteUserData,
//   uploadProfileImage,
//   getCardDetails,
};
