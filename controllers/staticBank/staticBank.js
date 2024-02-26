const constants = require("../../constant/index");
const staticBankService = require("../../services/staticBank");
const apiResponse = require("../../helper/apiResponser");

const getStaticBankList = async (req, res) => {
  try {
    console.log("Controller: inside getBankList");
    let result = await staticBankService.getStaticBankList(
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

module.exports = { getStaticBankList };
