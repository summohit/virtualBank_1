const customError = require("../helper/customeError");
const mongoose = require("mongoose");
const fs = require("fs");
const userDao = require("../dao/userDao");
const axios = require("axios");
const { hash, compare } = require("bcryptjs");
const env = require("../config/config");
const { createResponseObj } = require("../utils/common");
const { generateAuthKey } = require("../helper/auth/jwt");
const { uploadProfileImage } = require("../helper/saveQRcode");
const { generateAndSaveUserQrCode } = require("../helper/saveQRcode");

module.exports.createUser = async (data, adminId) => {
  try {
    console.log("Service: inside createUser");
    console.log(data);
    let userData = {
      mobileNumber: data.mobileNumber,
      email: data.email,
      deviceData: data.deviceData,
    };
    const isMobileNumExist = await userDao.getByMobileNumber(data.mobileNumber);
    if (isMobileNumExist) {
      let error = "User already registered with this mobile number";
      let response = createResponseObj(error, 400);
      console.log(response);
      return response;
    }
    const isEmailExist = await userDao.getByEmail(data.email);
    console.log("isEmailExist", isEmailExist);
    if (isEmailExist) {
      let error = "User already registered with this email";
      let response = createResponseObj(error, 400);
      return response;
    }
    let createdUserData = await userDao.insert(userData);
    await generateAndSaveUserQrCode(createdUserData);
    const apiUrl = `${env.baseUrl}/api/user/createAccount`;
    const hP = await hash(data.password, 10);
    const payload = {
      password: hP,
      userId: createdUserData._id,
    };
    let response = await axios.post(apiUrl, payload);
    const token = await generateAuthKey(createdUserData);
    let tokenData = {
      token: "JWT " + token,
    };
    await userDao.updateById(createdUserData._id, tokenData);
    let result = createResponseObj(null, 201, tokenData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

//updateUserProfile
//updateServiceStatus
module.exports.updateServiceStatus = async (data, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createUser");
    const getUserByToken = await userDao.getById(tokenData.userId, {});
    const getUserByMobileNo = await userDao.getByMobileNumber(data.mobileNumber);
    let result;
    console.log("getUserByToken", getUserByToken.mobileNumber);
    console.log("getUserByMobileNo", getUserByMobileNo.mobileNumber);
    if(getUserByToken && getUserByMobileNo){
      if(getUserByMobileNo.mobileNumber === getUserByToken.mobileNumber){
        let userServiceData = getUserByMobileNo?.isAllServiceActive ? false : true;
        let updateData = {
          isAllServiceActive:userServiceData,
        };
        await userDao.updateById(tokenData.userId, updateData);
        const message = "Status updated suceessfully";
        result = createResponseObj(message, 200, null);
        return result;
      }else{
        let error = "access Deny to unauthorized user.";
        let response = createResponseObj(error, 400);
        return response; 
      }
    }else{
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    
   
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

module.exports.updateUserProfile = async (data, tokenData, jwtToken) => {
  try {
    console.log("Service: inside createUser");
    console.log(data);
    let profileData = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      dateOfBirth: data.dateOfBirth,
    };
    const isUserExist = await userDao.getById(tokenData.userId, {});
    if (!isUserExist) {
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    await userDao.updateById(tokenData.userId, profileData);
    const apiUrl = `${env.baseUrl}/api/user/updateUserAccount`;
    console.log("apiUrl", apiUrl);
    // return
    let res = await axios.post(apiUrl, data, {
      headers: {
        Authorization: jwtToken,
      },
    });

    let response = createResponseObj(null, 200, null);
    return response;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

//getCardDetails
module.exports.getCardDetails = async (tokenData, jwtToken) => {
  try {
    console.log("Service: inside getUserData");
    console.log("tokenData", tokenData);
    const isUserExist = await userDao.getById(tokenData.userId, {
      firstName: 1,
      lastName: 1,
      mobileNumber: 1,
      email: 1,
      profileImage: 1,
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
    const { _id, userId, ...accountRelatedData } = res.data.body;
    userData = { ...userData, ...accountRelatedData };
    let result = createResponseObj(null, 201, userData);
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};

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

//getUserQrCode
module.exports.getUserQrCode = async (tokenData, jwtToken) => {
  try {
    console.log("Service: inside getUserData");
    console.log("tokenData", tokenData);
    const isUserExist = await userDao.getById(tokenData.userId, {
      userDetailQrCode: 1,
    });
    if (!isUserExist) {
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }

    let userData = isUserExist;
    let result = createResponseObj(null, 200, userData);
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

module.exports.deleteUserData = async (mobileNumber) => {
  try {
    console.log("Service: inside deleteUserData");
    console.log("mobileNumber", mobileNumber);
    const isUserExist = await userDao.getByMobileNumber(mobileNumber);
    if (!isUserExist) {
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    await userDao.deleteByMobileNumber(mobileNumber);
    let userData = isUserExist;
    console.log("userData", userData);
    const apiUrl = `${env.baseUrl}/api/user/deleteAccDetail/${userData._id}`;
    await axios.delete(apiUrl);
    let message = "User deleted successfully";
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
