const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const bankDao = require("../dao/bankDao");
const staticBankDao = require("../dao/staticBankDao");
const chequeDao = require("../dao/chequeDao");
const chequeBookDao = require("../dao/chequeBookDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const { createResponseObj } = require("../utils/common");
const {
  generateAndSaveChequeQrCode,
  generateAndSaveChequeBookQrCode,
} = require("../helper/saveQRcode");

module.exports.createCheque = async (bankNumber, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createCheque");
    const bankData = await staticBankDao.getByBankId(bankNumber, {});
    console.log("bankData", bankData);
    const userDataExist = await bankDao.getByUserIdAndBankId(
      tokenData.userId,
      bankData._id
    );

    if (!userDataExist) {
      let error = "User does not registered with this bank";
      let response = createResponseObj(error, 400);
      return response;
    }
    const bankRegisteredWithUser = userDataExist;
    let chequeBookPayload = {
      bankId: bankRegisteredWithUser._id,
      userId: tokenData.userId,
    };

    const chequeBookData = await chequeBookDao.insert(chequeBookPayload);
    console.log("chequeBookData", chequeBookData);
    await generateAndSaveChequeBookQrCode(chequeBookData);
    let payload = {
      chequeBookId: chequeBookData._id,
      bankId: bankRegisteredWithUser._id,
    };
    for (let i = 0; i < 25; i++) {
      let chequeData = await chequeDao.insert(payload);
      let qrCodePayload = {
        chequeStatus: chequeData.chequeStatus,
        chequeId: chequeData._id,
      };
      await generateAndSaveChequeQrCode(qrCodePayload);
    }
    let responseMsg = "Cheques created successfully";
    let response = createResponseObj(responseMsg, 201, null);
    return response;
  } catch (error) {
    if (error.response) {
      let errorMessage = error.response.data.message;
      let response = createResponseObj(errorMessage, 400);
      return response;
    } else {
      console.log("Something went wrong: Service: blog", error);
      throw new customError(error, error.statusCode);
    }
  }
};

//getChequeList

module.exports.getChequeList = async (chequeBookId, jwtToken) => {
  try {
    console.log("Service: inside getChequeBookList");
    const objectIdInstance = new mongoose.Types.ObjectId(chequeBookId);
    let query = [
      {
        $match: {
          chequeBookId: objectIdInstance,
        },
      },
      {
        $lookup: {
          from: "banks",
          let: { bankId: "$bankId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$bankId"] } } },
            { $project: { bankName: 1, _id: 0 } },
          ],
          as: "bankDetails",
        },
      },
      {
        $unwind: {
          path: "$bankDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      // {
      //   $addFields: {
      //     bankName: {
      //       $ifNull: ["$bankDetails.bankName", ""],
      //     },
      //   },
      // },
      // { $unset: "bankDetails" },
    ];
    const chequeList = await chequeDao.getAll(query);
    let result = createResponseObj(null, 200, chequeList);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};

//fillCheque
module.exports.fillCheque = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside fillCheque");
    let { chequeId, ...chequeData } = payload;
    const isCheckExist = await chequeDao.getById(chequeId);
    if (!isCheckExist) {
      let error = "Cheque does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    chequeData["chequeStatus"] = 1;
    await chequeDao.updateById(chequeId, chequeData);
    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.updateChequeStatus = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside fillCheque");
    let { chequeId, ...chequeData } = payload;
    const isCheckExist = await chequeDao.getById(chequeId);
    if (!isCheckExist) {
      let error = "Cheque does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    // chequeData["chequeStatus"] = 1;
    await chequeDao.updateById(chequeId, chequeData);
    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
