let createResponseObj = (message = null, statusCode, data = null) => {
  try {
    let resultantObj = {
      message: message,
      statusCode: statusCode,
      data: data,
    };
    return resultantObj;
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = { createResponseObj };
