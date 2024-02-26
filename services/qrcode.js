const mongoose = require("mongoose");
const customError = require("../helper/customeError");
const qrcodeDao = require("../dao/qrcodeDao");
const userDao = require("../dao/userDao");
const axios = require("axios");
const env = require("../config/config");
const fs = require("fs");
const { createResponseObj } = require("../utils/common");
const { generateAndSaveQrCode } = require("../helper/saveQRcode");

module.exports.uploadQrcode = async (data, tokenData, jwtToken) => {
  try {
    console.log("Service: inside uploadQrcode");
    console.log(data);
    let selectedFeilds = {
      mobileNumber: 1,
      email: 1,
      city: 1,
      pincode: 1,
      state: 1,
    };
    const isUserExist = await userDao.getById(tokenData.userId, selectedFeilds);
    if (!isUserExist) {
      let error = "User does not exist";
      let response = createResponseObj(error, 400);
      return response;
    }
    console.log("isUserExist", isUserExist);
    let userData = isUserExist;
    const base64Image = await generateAndSaveQrCode(userData, jwtToken);
    console.log("base64Image-----", base64Image);
    // Convert the JSON object to a string
    // const jsonString = JSON.stringify(isUserExist);
    // let qrFile = Date.now() + "-" + "qrcode.png"; 
    // QRCode.toFile(`././qrcodes/${qrFile}`, jsonString, (err) => {
    //   if (err) throw err;
    //   console.log("QR code generated and saved successfully!");
    // });

    // const userData = isUserExist;
    // const apiUrl = `${env.baseUrl}/api/user/getAccDetail`;
    // let res = await axios.get(apiUrl, {
    //   headers: {
    //     Authorization: jwtToken,
    //   },
    // });
    // const responseBody = res.data.body;
    // let completeUserData = { ...responseBody, ...isUserExist };
    let response = createResponseObj(null, 200, base64Image);
    console.log("response", response);
    return response;
    // console.log("responseBody", responseBody);
    // return result;
  } catch (error) {
    console.log("Something went wrong: Service: blog", error);
    throw new customError(error, error.statusCode);
  }
};
