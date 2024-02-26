const jwt = require("jsonwebtoken");
const env = require("../../config/config");

const generateAuthKey = async (userData) => {
  try {
    let tokenData = {
      userId: userData._id,
      emailId: userData.email,
    };
    const generatedToken = jwt.sign(tokenData, env.jwtSec);
    return generatedToken;
  } catch (error) {
    console.log(error.stack);
  }
};

const decodeKey = async(key) => {
    let decodedValue = jwt.verify(key, process.env.JWT_SECRET);
    return decodedValue;
};

module.exports = {
  generateAuthKey,
  decodeKey,
};
