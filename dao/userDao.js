const userModel = require("../models/userModel");

const insert = async (data) => {
  try {
    const newUser = new userModel(data);
    let result = await newUser.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getAll = async (query) => {
  try {
    console.log("query", query);
    let result = await teamModel.aggregate(query);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getById = async (userId, selectedFeilds) => {
  try {
    let result = await userModel
      .findOne({ _id: userId })
      .select(selectedFeilds)
      .lean();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByMobileNumber = async (mobileNumber) => {
  try {
    let result = await userModel.findOne({ mobileNumber: mobileNumber });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByEmail = async (email) => {
  try {
    let result = await userModel.findOne({ email: email });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};


const updateById = async (userId, payload) => {
  try {
    let result = await userModel.updateOne(
      { _id: userId },
      { $set: { ...payload } }
    );
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const logOutUser = async (userId) => {
  try {
    let data = {
      "token" :"",
      "deviceId":""
    }
    let result = await userModel.updateOne(
      { _id: userId },
      { $set:data}
    );
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteById = async (roleId) => {
  try {
    let result = await teamModel.deleteOne({ _id: roleId });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteByMobileNumber = async (mobileNumber) => {
  try {
    let result = await userModel.deleteOne({ mobileNumber: mobileNumber });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
const getSuperAdminDetial = async (email) => {
  try {
    let result = await userModel.findOne({ email: email });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
module.exports = {
  insert,
  getAll,
  getById,
  updateById,
  deleteById,
  getByMobileNumber,
  getByEmail,
  deleteByMobileNumber,
  logOutUser,
  getSuperAdminDetial
};
