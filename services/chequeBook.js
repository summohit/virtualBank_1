const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const bankDao = require("../dao/bankDao");
const chequeBookDao = require("../dao/chequeBookDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const { createResponseObj } = require("../utils/common");
const { generateAndSaveChequeBookQrCode } = require("../helper/saveQRcode");

module.exports.createBank = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createBank");
    const defaultBankData = await bankDao.getBankByUserIdAndStatus(
      tokenData.userId,
      {}
    );
    if (defaultBankData) {
      let updateDatedPayload = { isDefaultBank: false };
      await bankDao.updateById(defaultBankData._id, updateDatedPayload);
    }
    payload["userId"] = tokenData.userId;
    const bankData = await bankDao.insert(payload);
    let chequeBookPayload = {
      bankId: bankData._id,
      userId: tokenData.userId,
    };
    const chequeBookData = await chequeBookDao.insert(chequeBookPayload);
    console.log("chequeBookData", chequeBookData);
    await generateAndSaveChequeBookQrCode(chequeBookData);
    let responseMsg = "Bank created successfully";
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

module.exports.getChequeBookList = async ( tokenData, jwtToken) => {
  try {
    console.log("Service: inside getChequeBookList");
    console.log("tokenData", tokenData);
    const objectIdInstance = new mongoose.Types.ObjectId(tokenData.userId);
    // const bankIdInstance = new mongoose.Types.ObjectId(bankId);
    let query = [
      {
        $match: {
          userId: objectIdInstance,
        },
      },
      // {
      //   $match: {
      //     bankId: bankIdInstance,
      //   },
      // },
      {
        $lookup: {
          from: "banks",
          let: { id: "$bankId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            {
              $project: {
                bankName: 1,
              },
            },
          ],
          as: "bankInfo",
        },
      },
      { $unwind: "$bankInfo" },
      {
        $addFields: {
          bankName: {
            $ifNull: ["$bankInfo.bankName", null],
          },
        },
      },
      {
        $lookup: {
          from: "cheques",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$chequeBookId", "$$id"] } } },
            {
              $match: {
                chequeStatus: 1,
              },
            },
          ],
          as: "chequeInfo",
        },
      },
      {
        $addFields: {
          numberOfChequeFilled: {
            $ifNull: [{ $size: "$chequeInfo" }, 0],
          },
        },
      },
      {
        $unset: ["bankInfo", "chequeInfo"],
      },
    ];
    const bankData = await chequeBookDao.getAll(query);
    let result = createResponseObj(null, 200, bankData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};

//updateUserProfile

module.exports.setDefaultBank = async (bankId, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createUser");
    console.log("bankId", bankId);
    const defaultBankData = await bankDao.getBankByUserIdAndStatus(
      tokenData.userId,
      {}
    );
    let updateDatedPayload = { isDefaultBank: false };
    await bankDao.updateById(defaultBankData._id, updateDatedPayload);
    updateDatedPayload = { isDefaultBank: true };
    await bankDao.updateById(bankId, updateDatedPayload);
    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

//getCardDetails

//getUserData
module.exports.getUserData = async (tokenData, jwtToken) => {
  try {
    console.log("Service: inside getUserData");
    console.log("tokenData", tokenData);
    const isUserExist = await userDao.getById(tokenData.userId, {
      deviceData: 0,
      updatedAt: 0,
      __v: 0,
      token: 0,
      createdAt: 0,
    });
    if (!isUserExist) {
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }

    let userData = isUserExist;
    console.log("userData", userData);
    const apiUrl = `${env.baseUrl}/api/user/getAccDetail`;
    let res = await axios.get(apiUrl, {
      headers: {
        Authorization: jwtToken,
      },
    });
    console.log("res.data.body", res.data.body);
    userData["status"] = res.data.body.status;
    userData["isProfiledCompleted"] =
      res.data.body.transactionPassword.length !== 0 ? true : false;
    let result = createResponseObj(null, 201, userData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.deleteBank = async (bankId) => {
  try {
    console.log("Service: inside deleteUserData");
    console.log("bankId", bankId);
    const isBankExist = await bankDao.getById(bankId, {});
    if (!isBankExist) {
      let error = "Bank does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    await bankDao.deleteById(bankId);
    await chequeBookDao.deleteAllCheque(bankId);
    let message = "Bank deleted successfully";
    let response = createResponseObj(message, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.uploadProfileImage = async (
  profileImage,
  tokenData,
  jwtToken
) => {
  try {
    console.log("profileImage", profileImage);
    console.log("Service: inside uploadProfileImage");
    const fileContent = fs.readFileSync(
      `./fileUpload/profile/${profileImage.filename}`
    );
    // Convert the file content to base64
    const base64ImageData = fileContent.toString("base64");
    let payload = {
      profileImage: base64ImageData,
    };
    await userDao.updateById(tokenData.userId, payload);
    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error.stack);
    throw new customError(error, error.statusCode);
  }
};
