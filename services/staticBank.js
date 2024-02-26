const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const staticBankDao = require("../dao/staticBankDao");
const chequeBookDao = require("../dao/chequeBookDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const { createResponseObj } = require("../utils/common");
const { generateAndSaveChequeBookQrCode } = require("../helper/saveQRcode");

module.exports.getStaticBankList = async (tokenData, jwtToken) => {
  try {
    console.log("Service: inside getStaticBankList");
    console.log("tokenData", tokenData);
    let query = [
      {
        $match: {},
      },
    ];
    const bankData = await staticBankDao.getAll(query);
    let result = createResponseObj(null, 200, bankData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};
