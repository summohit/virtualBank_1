const constants = require("../../constant/index");
const chequeBookService = require("../../services/chequeBook");
const apiResponse = require("../../helper/apiResponser");


const getChequeBookList = async (req, res) => {
  try {
    console.log("Controller: inside getBankList");
    // const bankId = req.params.bankId;
    let result = await chequeBookService.getChequeBookList(
      // bankId,
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

module.exports = {
  getChequeBookList,
};