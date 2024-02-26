const staticBankModel = require("../models/staticBankModel");


const getAll = async (query) => {
  try {
    let result = await staticBankModel.aggregate(query);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
//getBankByUserIdAndStatus
const getBankByUserIdAndStatus = async (userId, selectedFeilds) => {
  try {
    let result = await bankModel
      .findOne({ userId: userId, isDefaultBank: true })
      .select(selectedFeilds)
      .lean();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getById = async (bankId, selectedFeilds) => {
  try {
    let result = await staticBankModel
      .findOne({ _id: bankId })
      .select(selectedFeilds)
      .lean();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
//getByBankId
const getByBankId = async (bankId, selectedFeilds) => {
  try {
    let result = await staticBankModel
      .findOne({ bankId: bankId })
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

const updateById = async (bankId, payload) => {
  try {
    let result = await bankModel.updateOne(
      { _id: bankId },
      { $set: { ...payload } }
    );
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteById = async (bankId) => {
  try {
    let result = await bankModel.deleteOne({ _id: bankId });
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
module.exports = {
  getAll,
  getById,
  getByBankId,
  updateById,
  deleteById,
  getByMobileNumber,
  deleteByMobileNumber,
  getBankByUserIdAndStatus,
};
