
const validateMobileNumber = (data) => {
  // data = (data * 1);
  const regex = /^\d{10}$/;
  let flag;
  if (regex.test(data)) {
    flag = {
      isValid: true,
      data: data,
    };
  } else {
    flag = {
      isValid: false,
      data: data,
    };
  }
  return flag;
};
const validatePincode = (data) => {
  // data = (data * 1);
  const regex = /^\d{6}$/;
  let flag;
  if (regex.test(data)) {
    flag = {
      isValid: true,
      data: data,
    };
  } else {
    flag = {
      isValid: false,
      data: data,
    };
  }
  return flag;
};

const validateEmail = (data) => {
  // data = (data * 1);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let flag;
  if (regex.test(data)) {
    flag = {
      isValid: true,
      data: data,
    };
  } else {
    flag = {
      isValid: false,
      data: data,
    };
  }
  return flag;
};

const ValidateMobileNum = (mobileNumber) => {
  const validatedNumber = validateMobileNumber(mobileNumber);
  console.log(validatedNumber);
  if (validatedNumber.isValid === false) return validatedNumber.isValid;
  return validatedNumber.isValid;
};

const ValidatePincode = (pinCode) => {
  const validatedNumber = validatePincode(pinCode);
  if (validatedNumber.isValid === false) return validatedNumber.isValid;
  return validatedNumber.isValid;
};

const ValidateEmail = (email) => {
  const validatedEmail = validateEmail(email);
  if (validatedEmail.isValid === false) return validatedEmail.isValid;
  return validatedEmail.isValid;
};


module.exports = {
  ValidateMobileNum,
  ValidatePincode,
  ValidateEmail,
};