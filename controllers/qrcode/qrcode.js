const constants = require("../../constant/index");
const qrcode = require("../../services/qrcode");
const apiResponse = require("../../helper/apiResponser");



const uploadQrcode = async (req, res) => {
  try {
    console.log("Controller: inside uploadQrcode");
    let result = await qrcode.uploadQrcode(
      req.body,
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




module.exports = {
  uploadQrcode,
};