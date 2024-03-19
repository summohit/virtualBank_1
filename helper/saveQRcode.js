const QRCode = require("qrcode");
const fs = require("fs");
const axios = require("axios");
const env = require("../config/config");
const chequeBookDao = require("../dao/chequeBookDao");
const chequeDao = require("../dao/chequeDao");
const userDao = require("../dao/userDao");
const uploadQRDao = require("../dao/uploadQR");

const generateAndSaveQrCode = async (jsonPayload, jwtToken) => {
  try {
    const jsonString = JSON.stringify(jsonPayload);
    var base64ImageUrl;
    QRCode.toDataURL(jsonString, async (err, url) => {
      base64ImageUrl = url.split(",")[1];
      const apiUrl = `${env.baseUrl}/api/user/updateQrCode`;
      let data = {
        base64ImageUrl: base64ImageUrl,
      };
      let res = await axios.post(apiUrl, data, {
        headers: {
          Authorization: jwtToken,
        },
      });
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};

const generateAndSaveChequeBookQrCode = async (jsonPayload) => {
  try {
    const jsonString = JSON.stringify(jsonPayload);
    var base64ImageUrl;
    QRCode.toDataURL(jsonString, async (err, url) => {
      base64ImageUrl = url.split(",")[1];
      let payload = {
        chequeBookQrCode: base64ImageUrl,
      };
      await chequeBookDao.updateById(jsonPayload._id, payload);
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};

const generateAndSaveChequeQrCode = async (jsonPayload) => {
  try {
    const jsonString = JSON.stringify(jsonPayload);
    var base64ImageUrl;
    QRCode.toDataURL(jsonString, async (err, url) => {
      base64ImageUrl = url.split(",")[1];
      let payload = {
        qrcode: base64ImageUrl,
      };
      await chequeDao.updateById(jsonPayload.chequeId, payload);
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};
// Function to generate QR code and return base64
async function generateQRCode(data) {
  try {
    data = JSON.stringify(data);
    // Generate QR code as a Buffer
    const qrCodeBuffer = await QRCode.toBuffer(data);

    // Convert Buffer to base64
    const base64Image = qrCodeBuffer.toString("base64");

    return base64Image;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}


const generateAndSaveUserQrCode= async (jsonPayload) => {
  try {
    const jsonString = JSON.stringify(jsonPayload);
    var base64ImageUrl;
    QRCode.toDataURL(jsonString, async (err, url) => {
      base64ImageUrl = url.split(",")[1];
      let payload = {
        userDetailQrCode: base64ImageUrl,
      };
      await userDao.updateById(jsonPayload._id, payload);
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};

const generateAndSaveBankDetailQR = async (jsonPayload) => {
  try {
    const jsonString = JSON.stringify(jsonPayload);
    var base64ImageUrl;
    QRCode.toDataURL(jsonString, async (err, url) => {
      base64ImageUrl = url.split(",")[1];
      let payload = {
        qrCode: base64ImageUrl,
      };
      await uploadQRDao.updateById(jsonPayload._id, payload);
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};

module.exports = {
  generateAndSaveQrCode,
  generateAndSaveChequeBookQrCode,
  generateAndSaveChequeQrCode,
  generateQRCode,
  generateAndSaveUserQrCode,
  generateAndSaveBankDetailQR,
};
