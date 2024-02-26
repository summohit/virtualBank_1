const constants = require("../constant/index");

class apiResponse {
  static successResponse(data, message = null, statusCode) {
    return {
      statusCode: statusCode,
      status: "Success",
      message: message,
      body: data,
    };
  }

  static errorResponse(message = null, statusCode = 500,data=null) {
    return {
      statusCode: statusCode,
      status: "Error",
      message: message,
      body: data,
    };
  }

  static errorHandler(res, error) {
    console.log(`Error Handler: ${error.statusCode} ${error.message}`);
    res
      .status(error.statusCode || 500)
      .send(
        this.errorResponse(
          error.message || constants.defaultResponseMessage.SERVER_ERROR
        )
      );
  }
}

module.exports = apiResponse
