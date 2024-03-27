const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const bankDao = require("../dao/bankDao");
const StaticBankDao = require("../dao/staticBankDao");
const uploadQRDao = require("../dao/uploadQR");
const uploadCheckQRDao = require("../dao/chequeQrDao");
const chequeBookDao = require("../dao/chequeBookDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const {
  generateAndSaveBankDetailQR,
  generateAndSaveChequeQR,
} = require("../helper/saveQRcode");
const { createResponseObj } = require("../utils/common");

module.exports.addQRCode = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside addQRCode");
    let data = {
      userId: tokenData.userId,
      type: payload.type,
      status: payload.status,
      cardType: payload.cardType,
    };
    if (payload.type === "bank") data["staticBankId"] = payload.bankId;
    else data["dynamicBankId"] = payload.bankId;
    const createdData = await uploadQRDao.insert(data);
    console.log("createdData", createdData);
    payload["_id"] = createdData._id;
    payload["userId"] = createdData.userId;
    await generateAndSaveBankDetailQR(payload);
    let responseMsg = "QR Code created successfully";
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

module.exports.createChequeQr = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createChequeQr");
    let data = {
      userId: tokenData.userId,
      bank: payload.bank,
      leaf: payload.leaf,
      alias: payload.alias,
    };
    const createdData = await uploadCheckQRDao.insert(data);
    payload["_id"] = createdData._id;
    await generateAndSaveChequeQR(payload);
    let responseMsg = "QR Code created successfully";
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

module.exports.getQrCodeList = async (qrType, tokenData, jwtToken) => {
  try {
    console.log("Service: inside getBankList");
    console.log("tokenData", tokenData);
    const objectIdInstance = new mongoose.Types.ObjectId(tokenData.userId);
    let query = [
      {
        $match: {
          userId: objectIdInstance,
        },
      },
      {
        $match: {
          type: qrType,
        },
      },
      {
        $lookup: {
          from: "staticbanks",
          let: { bankId: "$staticBankId" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$bankId"] } },
            },
            {
              $project: {
                bankName: 1,
                // img: 1,
                _id: 0,
              },
            },
          ],
          as: "staticBankDetails",
        },
      },
      {
        $unwind: {
          path: "$staticBankDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "banks",
          let: { bankId: "$dynamicBankId" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$bankId"] } },
            },
            {
              $project: {
                bankName: 1,
                _id: 0,
              },
            },
          ],
          as: "dynamicBankDetails",
        },
      },
      {
        $unwind: {
          path: "$dynamicBankDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          bankName: {
            $ifNull: [
              "$staticBankDetails.bankName",
              "$dynamicBankDetails.bankName",
            ],
          },
        },
      },
      // {
      //   $addFields: {
      //     bankName: "$bankDetails.bankName",
      //     bankImg: "$bankDetails.img",
      //   },
      // },
      {
        $unset: ["dynamicBankDetails", "staticBankDetails"],
      },
    ];
    const bankData = await uploadQRDao.getAll(query);
    let result = createResponseObj(null, 200, bankData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.getChequeQrCodeList = async (tokenData, jwtToken) => {
  try {
    console.log("Service: inside getChequeQrCodeList");
    console.log("tokenData", tokenData);
    const objectIdInstance = new mongoose.Types.ObjectId(tokenData.userId);
    let query = [
      {
        $match: {
          userId: objectIdInstance,
        },
      },
      {
        $lookup: {
          from: "banks",
          let: { bankId: "$bank" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$bankId"] } },
            },
            {
              $project: {
                bankName: 1,
                _id: 0,
              },
            },
          ],
          as: "dynamicBankDetails",
        },
      },
      {
        $unwind: {
          path: "$dynamicBankDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          bankName:  "$dynamicBankDetails.bankName",
        },
      },
      {
        $unset: ["dynamicBankDetails"],
      },
    ];
    const bankData = await uploadCheckQRDao.getAll(query);
    let result = createResponseObj(null, 200, bankData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.updateQrCodeStatus = async (qrCodeId, tokenData, jwtToken) => {
  try {
    console.log("Service: inside updateQrCodeStatus");
    const isCheckExist = await uploadQRDao.getById(qrCodeId);
    if (!isCheckExist) {
      let error = "Cheque does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    let dataToBeUpdated = {
      status: 1,
    };
    await uploadQRDao.updateById(qrCodeId, dataToBeUpdated);
    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.updateChequeQrCodeStatus = async (
  ChequeQrCodeId,
  tokenData,
  jwtToken
) => {
  try {
    console.log("Service: inside updateQrCodeStatus");
    const isCheckExist = await uploadCheckQRDao.getById(ChequeQrCodeId);
    if (!isCheckExist) {
      let error = "Cheque Qr data does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    let dataToBeUpdated = {
      status: 1,
    };
    await uploadCheckQRDao.updateById(qrCodeId, dataToBeUpdated);
    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
