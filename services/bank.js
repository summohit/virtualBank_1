const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const bankDao = require("../dao/bankDao");
const StaticBankDao = require("../dao/staticBankDao");
const chequeBookDao = require("../dao/chequeBookDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const { createResponseObj } = require("../utils/common");

module.exports.createBank = async (payload, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createBank");
    let result;
    if(tokenData.userId === payload.genratedPersonId){
      const defaultBankData = await bankDao.getBankByUserIdAndStatus(
        tokenData.userId,
        {}
      );
      if (defaultBankData) {
        let updateDatedPayload = { isDefaultBank: false };
        await bankDao.updateById(defaultBankData._id, updateDatedPayload);
      }
      const staticBankData = await StaticBankDao.getById(payload.bankId, {});
      payload["userId"] = tokenData.userId;
      payload["bankName"] = staticBankData.bankName;
      const bankData = await bankDao.insert(payload);
      let responseMsg = "Bank created successfully";
      result = createResponseObj(responseMsg, 201, null);
      return result;
    }else{
      let error = "access Deny to unauthorized user.";
      let response = createResponseObj(error, 400);
      return response; 
    }
   
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

//getBankBalance
module.exports.getBankBalance = async (bankId, tokenData, jwtToken) => {
  try {
    console.log("Service: inside getBankList");
    console.log("tokenData", tokenData);
    let selectedFeilds = {
      balance: 1,
    };
    const bankData = await bankDao.getById(bankId, selectedFeilds);
    let result = createResponseObj(null, 200, bankData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: getBanks", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.getBankList = async (tokenData, jwtToken) => {
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
        $lookup: {
          from: "staticbanks",
          let: { bankId: "$bankId" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$bankId"] } },
            },
            {
              $project: {
                img: 1,
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
          bankImg: "$bankDetails.img",
        },
      },
      {
        $sort: {
          isDefaultBank: -1, // 1 for ascending order, -1 for descending order
        },
      },
      {
        $unset: ["bankDetails"],
      },
    ];
    const bankData = await bankDao.getAll(query);
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

module.exports.loginUser = async (data) => {
  try {
    console.log("Service: inside loginUser");
    const { email, password } = data;
    let userData = null;
    if (email.includes("@")) {
      userData = await userDao.getByEmail(email);
    } else {
      userData = await userDao.getByMobileNumber(email);
    }
    if (!userData) {
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    const userId = userData._id;
    const apiUrl = `${env.baseUrl}/api/user/userPassword/${userId}`;
    let res = await axios.get(apiUrl);
    console.log("res", res.data.body);
    const isMatched = await compare(password, res.data.body.password);
    if (!isMatched) {
      let error = "Invalid credentials";
      let response = createResponseObj(error, 400);
      return response;
    } else {
      const token = await generateAuthKey(userData);
      let tokenData = {
        token: "JWT " + token,
      };
      let result = createResponseObj(null, 200, tokenData);
      return result;
    }
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
module.exports.createPensionReq = async (userDetial) => {
  try {
    console.log("Service: inside createPensionReq");
     const isBankExist = await bankDao.createPensionAccount(userDetial);
    if (!isBankExist) {
      let error = "Bank does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    let message = "Your Pension Account creation request has been initialized successfully";
    let response = createResponseObj(message, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.approvePensionRequest = async (userDetial, payload) => {
  try {
    console.log("Service: inside approvePensionRequest", userDetial);
    console.log("payload", payload);
    const isBankExist = await bankDao.approvePensionRequest(userDetial ,payload);
    if (!isBankExist) {
      let error = "Bank does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    let message = "Your Pension Account creation request has been initialized successfully";
    let response = createResponseObj(message, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.updatePensionDate   = async (userDetial, payload) => {
  try {
    console.log("Service: inside updatePensionDate", userDetial);
    console.log("payload", payload);
    const isBankExist = await bankDao.updatePensionDate(userDetial ,payload);
    if (!isBankExist) {
      let error = "Bank does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    let message = "Your Pension Account creation request has been initialized successfully";
    let response = createResponseObj(message, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.updatePensionAmount =   async (userDetial, payload) => {
  try {
    console.log("Service: inside updatePensionAmount", userDetial);
    console.log("payload", payload);
    // return;
     await bankDao.addPension(userDetial ,payload);
    let message = "Your Pension Account creation request has been initialized successfully";
    let response = createResponseObj(message, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.getPensionByUser  =  async (userDetial) => {
  try {
    console.log("Service: inside getPensionByUser", userDetial);
     // return;
    let result =  await bankDao.getPension(userDetial);
    let message = "Your Pension Account creation request has been initialized successfully";
    let response = createResponseObj(message, 200, result);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.getPensionAccount = async (userDetial) => {
  try {
    console.log("Service: inside getPensionAccount");
     const result = await bankDao.getPensionAccounts(userDetial);
    
     let response = createResponseObj('', 200, result);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.checkPensionStatus  = async (userDetial) => {
  try {
    console.log("Service: inside checkPensionStatus");
     const result = await bankDao.checkPensionStatus(userDetial);
    
     let response = createResponseObj('', 200, result);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
module.exports.updatePensionDocument = async (userDetial, pensionDocument) => {
  try {
    console.log("Service: inside updatePensionDocument");
     const result = await bankDao.updatePensionDocument(userDetial, pensionDocument);
    
     let response = createResponseObj('', 200, result);
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
