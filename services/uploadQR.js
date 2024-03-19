const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const bankDao = require("../dao/bankDao");
const StaticBankDao = require("../dao/staticBankDao");
const uploadQRDao = require("../dao/uploadQR");
const chequeBookDao = require("../dao/chequeBookDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const { generateAndSaveBankDetailQR } = require("../helper/saveQRcode");
const { createResponseObj } = require("../utils/common");

module.exports.addQRCode = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside addQRCode");
    let data = {
      userId: tokenData.userId,
      type: payload.type,
      bankId: payload.bankId,
    };
    const createdData = await uploadQRDao.insert(data);
    payload["_id"] = createdData._id;
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
          from: "banks",
          let: { bankId: "$bankId" },
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
          as: "bankDetails",
        },
      },
      {
        $unwind: {
          path: "$bankDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          bankName: "$bankDetails.bankName",
        },
      },
      {
        $unset: ["bankDetails"],
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
