const validation = require("../validation/validation");
const apiResponse = require("../helper/apiResponser");

const registrationValidation = (req, res, next) => {
  const { mobileNumber, email } = req.body;

  if (mobileNumber) {
    const validatedNumber = validation.ValidateMobileNum(mobileNumber);
    console.log("validatedNumber", validatedNumber);
    if (!validatedNumber) {
      let message = "Please enter valid mobile number";
      return res
        .status(400)
        .send(apiResponse.errorResponse(message, 400));
    }
  }
  if (email) {
    const validatedEmail = validation.ValidateEmail(email);
    if (!validatedEmail) {
      let message = "Please enter valid email";
      return res
        .status(400)
        .send(apiResponse.errorResponse(message, 400));
    }
  }

  next();
};

module.exports = {
  registrationValidation,
};
