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
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");
console.log("serviceAccount", serviceAccount)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports.createUser = async (data, adminId) => {
  try {
    console.log("Service: inside createUser");
    console.log(data);
    let userData = {
      mobileNumber: data.mobileNumber,
      email: data.email,
      deviceData: data.deviceData,
      fcmToken: data.fcmToken
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
        let fcmToken = getUserByToken.fcmToken;
        console.log("sending fcm alert");
        console.log(fcmToken);
        const payload = {
          notification: {
            title: 'Your Notification Title',
            body: 'Your Notification Body'
          }
        };
        const options = {
          priority: 'high',
          timeToLive: 60 * 60 * 24 // 1 day
        };
        try {
          admin.messaging().sendToDevice(fcmToken, payload, options)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          }); 
        } catch (error) {
          console.log('Error sending message:', error);
        }
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
module.exports.updateDeviceId = async (data, tokenData, jwtToken) => {
  try {
    console.log("Service: inside updateDeviceId");
    console.log(data);
    let profileData = {
      deviceId: data.deviceId,
    };
    const isUserExist = await userDao.getById(tokenData.userId, {});
    if (isUserExist && isUserExist.deviceId) {
      let error = "User already logged in diffrent application";
      let response = createResponseObj(error, 400);
      return response;
    }
    await userDao.updateById(tokenData.userId, profileData);
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
    console.log("Service: inside loginUser", data);
    const { email, password, fcmToken } = data;
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
    }else{
      console.log("user exsist", userData);
    }
    console.log("userData",userData);
    console.log("data.deviceId",data.deviceId);
    console.log(userData.deviceId !== data.deviceId);
    console.log(userData['deviceId']);
    if(data && !data.isWebLoggedIn){
      if(userData.deviceId !== undefined && userData.deviceId != '') {
        console.log("deviceId key found")
        if(userData.deviceId !=  data.deviceId){
          let error = "User logged in from a different device. Please log out from that device first."
          let response = createResponseObj(error, 400);
          return response;
        }
      }
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
        "userData": userData

      };
      let tmpPayload = {
        "token": tokenData.token,
        "fcmToken":fcmToken
      }
      await userDao.updateById(userId, tmpPayload);
      let result = createResponseObj(null, 200, tokenData);
      return result;
    }
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
 
module.exports.logOut = async (tokenData) => {
  try {
     console.log("tokenData.userId", tokenData.userId);
     await userDao.logOutUser(tokenData.userId);
     let result = createResponseObj(null, 201, tokenData);
     return result;
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
